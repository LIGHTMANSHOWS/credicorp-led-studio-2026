param([ValidateRange(1, 65535)][int]$Port = 8765)
$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$distRoot = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'dist'))
$previewUrl = "http://127.0.0.1:$Port"

function Get-PreviewHealth {
    try { return Invoke-RestMethod -Uri "$previewUrl/__credicorp_health" -TimeoutSec 1 }
    catch { return $null }
}

$existing = Get-PreviewHealth
if ($existing -and $existing.app -eq 'credicorp-led-preview' -and $existing.root -eq $distRoot) {
    Start-Process $previewUrl
    Write-Host "El proyecto ya esta abierto en $previewUrl"
    exit 0
}

$nodeExe = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
if (-not (Test-Path -LiteralPath $nodeExe -PathType Leaf)) {
    $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
    if (-not $nodeCommand) { throw 'No se encontro Node.js. Abre este proyecto en Codex o agrega Node.js al PATH.' }
    $nodeExe = $nodeCommand.Source
}

$logDirectory = Join-Path $projectRoot '.preview'
New-Item -ItemType Directory -Force -Path $logDirectory | Out-Null
$stdoutFile = Join-Path $logDirectory 'stdout.log'
$stderrFile = Join-Path $logDirectory 'stderr.log'
$serverFile = Join-Path $projectRoot 'server.cjs'
$serverProcess = $null
try {
    $serverProcess = Start-Process -FilePath $nodeExe -ArgumentList @(('"' + $serverFile + '"'), '--port', [string]$Port) -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput $stdoutFile -RedirectStandardError $stderrFile -PassThru
    $ready = $false
    for ($attempt = 0; $attempt -lt 40; $attempt++) {
        $serverProcess.Refresh()
        if ($serverProcess.HasExited) {
            $serverError = Get-Content -LiteralPath $stderrFile -Raw -ErrorAction SilentlyContinue
            throw "No se pudo iniciar el visor. $serverError"
        }
        $health = Get-PreviewHealth
        if ($health -and $health.app -eq 'credicorp-led-preview' -and $health.root -eq $distRoot) { $ready = $true; break }
        Start-Sleep -Milliseconds 100
    }
    if (-not $ready) { throw 'El servidor no respondio a tiempo. Revisa .preview/stderr.log.' }
    Start-Process $previewUrl
    Write-Host "Credicorp LED abierto en $previewUrl"
    Write-Host 'Deja esta ventana abierta. Pulsa Ctrl+C para detener el servidor.'
    Wait-Process -Id $serverProcess.Id
}
finally {
    if ($serverProcess) {
        $serverProcess.Refresh()
        if (-not $serverProcess.HasExited) { Stop-Process -Id $serverProcess.Id -ErrorAction SilentlyContinue }
    }
}
