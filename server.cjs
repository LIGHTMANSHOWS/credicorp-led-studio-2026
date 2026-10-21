'use strict';
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = portIndex < 0 ? 8765 : Number(args[portIndex + 1]);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Puerto no valido. Usa --port seguido de un numero entre 1 y 65535.');
  process.exit(1);
}
const root = path.resolve(__dirname, 'dist');
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.csv': 'text/csv; charset=utf-8',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.bin': 'application/octet-stream',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.wasm': 'application/wasm'
};
function inside(base, target) {
  const relative = path.relative(base, target);
  return relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
}
function reply(res, status, text) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(text);
}

(async () => {
  let realRoot;
  try { realRoot = await fs.realpath(root); }
  catch { console.error('No se encontro la carpeta dist junto a server.cjs.'); process.exit(1); }
  const server = http.createServer(async (req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return reply(res, 405, 'Metodo no permitido.');
    try {
      const raw = new URL(req.url, 'http://127.0.0.1').pathname;
      if (raw === '/__credicorp_health') {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        return res.end(JSON.stringify({ app: 'credicorp-led-preview', root: realRoot }));
      }
      const decoded = decodeURIComponent(raw).replaceAll('\\', '/');
      if (decoded.includes('\0')) return reply(res, 400, 'Ruta no valida.');
      let filename = path.resolve(realRoot, '.' + decoded);
      if (!inside(realRoot, filename)) return reply(res, 403, 'Ruta fuera del proyecto.');
      let stat = await fs.stat(filename);
      if (stat.isDirectory()) {
        filename = path.join(filename, 'index.html');
        stat = await fs.stat(filename);
      }
      const realFile = await fs.realpath(filename);
      if (!inside(realRoot, realFile) || !stat.isFile()) return reply(res, 403, 'Archivo no permitido.');
      const data = await fs.readFile(realFile);
      res.writeHead(200, {
        'Content-Type': mime[path.extname(realFile).toLowerCase()] || 'application/octet-stream',
        'Content-Length': data.length, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'
      });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch (error) {
      if (error instanceof URIError) return reply(res, 400, 'Ruta no valida.');
      reply(res, error.code === 'ENOENT' ? 404 : 500, error.code === 'ENOENT' ? 'Archivo no encontrado.' : 'No se pudo leer el archivo.');
    }
  });
  server.on('error', error => {
    console.error(error.code === 'EADDRINUSE' ? `El puerto ${port} esta ocupado. Cierra la otra vista o usa otro puerto con --port.` : error.message);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => console.log(`Credicorp LED: http://127.0.0.1:${port}`));
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
})();
