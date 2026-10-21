import * as THREE from './vendor/three.module.js';

// Dimensions are in metres; placement is calibrated against the supplied floor plan.
export const catalog = {
  tunnel: {name:'Túnel',quantity:1,width:5,height:2.4,depth:5,note:'Huella de 5 × 5 m según planta general. Se mantienen 2,40 m del detalle: la presentación indica 2,60 m y la altura definitiva sigue pendiente. Los 100 módulos conservan sus relieves; el LED por contorno es una propuesta.',source:'Planta general 19-10-26; plano tunel (1) y (3); WhatsApp de Sonny, 21-10-26'},
  innovation: {name:'Innovation Partner',quantity:12,width:4,height:2.5,depth:2,note:'12 stands de 4 × 2 m. Arcos concéntricos R 1,825 / 1,725 m, centro a 0,675 m del piso. Credenza 1,20 × 0,50 × 0,80 m. Se incluye LED en laterales, como señala el plano.',source:'Stand Innovation.pdf; presentación, diap. 7'},
  presenting: {name:'Presenting Partner',quantity:5,width:6,height:3.1,depth:3,note:'5 stands confirmados: Presenting 1–4 y Credicorp de 6 × 3 m como quinto módulo. Portal frontal a 2,70 m y espina a 3,10 m. Credenza rectangular 1,20 × 0,50 × 0,80 m propuesta, sin cotas.',source:'Plano Presenting Credicorp (1)–(4); planta general; confirmación de Sonny, 21-10-26'},
  food: {name:'Alimentos',quantity:8,width:3.1,height:2.2,depth:2,note:'8 toldos de 3,10 m de ancho × 2,20 m de alto. Fondo de 2 m y geometría del arco y la máscara MDF propuestos; faltan cotas de fabricación.',source:'Informacion Lightman Credicorp 19Nov.pptx, diap. 2'},
  analytic: {name:'MR Analityc',quantity:1,width:1.8,height:2.2,depth:1.8,note:'Tarima circular Ø 1,80 m confirmada. Se proponen 11 barras a distintas alturas, tarima de 0,20 m y altura máxima de 2,20 m; estos datos no están acotados.',source:'Informacion Lightman Credicorp 19Nov.pptx, diap. 3'},
  totem: {name:'Tótem',quantity:5,width:.4,height:1.5,depth:.4,note:'5 tótems de 40 × 40 cm con LED solo en la parte alta. Altura de 1,50 m propuesta. Pantalla inclinada representada de forma esquemática.',source:'Informacion Lightman Credicorp 19Nov.pptx, diap. 9'},
  stageA: {name:'Escenario 16 m',quantity:1,width:16,height:.5,depth:4.8,note:'16 × 4,80 m según planta general, priorizada por Sonny sobre el PPT (16,50 × 4,88). Modelo rectangular: el frente curvo no tiene radio acotado. Altura de 0,50 m propuesta.',source:'Planta general 19-10-26; instrucción técnica de Sonny, 21-10-26'},
  stageB: {name:'Escenario 12 m',quantity:1,width:12,height:.5,depth:4.8,note:'12 × 4,80 m según planta general, priorizada por Sonny sobre el PPT (12,20 × 4,88). Modelo rectangular: el frente curvo no tiene radio acotado. Altura de 0,50 m propuesta.',source:'Planta general 19-10-26; instrucción técnica de Sonny, 21-10-26'}
};

export const tunnelDepths = {
  A:[[5,10,20,15,20,5,20,15,5,20],[20,15,5,15,15,10,5,10,5,10],[10,5,20,5,15,5,15,15,20,5],[5,15,15,10,5,20,15,5,5,15],[15,20,15,5,20,5,20,15,15,10]],
  B:[[20,10,15,10,20,10,20,5,10,20],[15,5,20,15,5,15,5,20,15,5],[5,20,5,10,15,20,10,15,10,15],[15,10,15,20,5,15,5,15,20,5],[10,20,5,15,10,10,20,5,15,10]]
};
const CYAN='#32d6ff', PURPLE='#c783ff';
const finite=(value,fallback)=>Number.isFinite(Number(value))?Number(value):fallback;
const bounded=(value,fallback,min,max)=>Math.max(min,Math.min(max,finite(value,fallback)));
const rect=(x0,x1,y0,y1,z)=>[[x0,y0,z],[x1,y0,z],[x1,y1,z],[x0,y1,z],[x0,y0,z]];

export function createLegacyProject(){
  const pieces=[],counts={};
  const add=(type,x,z,rotation=0)=>{
    const c=catalog[type],n=counts[type]=(counts[type]||0)+1;
    pieces.push({id:type+'-'+String(n).padStart(2,'0'),type,name:c.name+(c.quantity>1?' '+String(n).padStart(2,'0'):''),x,y:0,z,rotation,width:c.width,height:c.height,depth:c.depth,visible:true,leds:{}});
  };
  add('stageA',-9,-15);add('stageB',9,-15);
  for(const x of [-18,18])for(const z of [-9,-4,1,6,11,16])add('innovation',x,z,x<0?90:-90);
  for(const x of [-9,0,9])add('presenting',x,-5);
  for(const x of [-6,6])add('presenting',x,1);
  for(const z of [12,17])for(const x of [-11,-6,6,11])add('food',x,z,180);
  add('analytic',0,7);
  for(const [x,z] of [[-9,7],[-4,7],[4,7],[9,7],[0,10]])add('totem',x,z);
  add('tunnel',0,16);
  return {version:1,title:'Credicorp · IA, Data & Ciberseguridad Summit 2026',eventDate:'2026-11-19',location:'Centro de Convenciones de Lima · piso 8 · salas Naciones 1, 2 y 3',layoutNote:'Distribución propuesta de 42 × 40 m. No representa un plano aprobado del LCC ni sus dimensiones reales.',floor:{width:42,depth:40},schedule:{assembly:['2026-11-16','2026-11-17','2026-11-18'],assemblyHours:'08:00–23:00',event:'2026-11-19',eventHours:'08:00–18:00',strike:'2026-11-20',strikeHours:'08:00–23:00'},source:{title:'Requerimiento 19Nov Credicorp IA',sender:'Sonny Sotomayor',date:'2026-10-20'},pieces};
}

export const PLAN = {width:96.69,depth:64.28,revision:'planta-2026-10-21',image:'./planta-referencia.png'};
export function createProject(){
  const base=createLegacyProject(),counts={},pieces=[];
  // Coordinates were read from the rasterized plan, calibrated by its 16 m stage.
  // The resulting venue extents are reference extents, not surveyed dimensions.
  const point=(x,y)=>({x:+((x-747)/14.5).toFixed(3),z:+((y-754)/14.5).toFixed(3)});
  const add=(type,px,py,rotation,name,extra={})=>{
    const c=catalog[type],n=counts[type]=(counts[type]||0)+1;
    pieces.push({id:type+'-'+String(n).padStart(2,'0'),type,name,...point(px,py),y:0,rotation,width:c.width,height:c.height,depth:c.depth,visible:true,leds:{},floor:'8',placement:'plan',...extra});
  };
  add('stageA',277,346,0,'Escenario 1 · 16 × 4,80 m');
  add('stageB',748,346,0,'Escenario 2 · 12 × 4,80 m');
  for(const [px,rotation,start] of [[1008,90,1],[1420,-90,7]])for(let i=0;i<6;i++)add('innovation',px,409+i*79.4,rotation,'Stand '+(start+i)+' · Innovation');
  for(const [px,py,rotation,n] of [[1117,605,90,1],[1117,756,90,2],[1312,605,-90,3],[1312,756,-90,4]])add('presenting',px,py,rotation,'Presenting '+n);
  add('presenting',1211,454,0,'Credicorp · 5.º Presenting',{note:'Sonny confirmó que Credicorp 6 × 3 m es el quinto Presenting. Ubicación norte de la exposición.'});
  for(let i=1;i<=3;i++)add('food',747,754,180,'Al. '+i+' · piso 7 · por ubicar',{x:54+(i-1)*4,z:8,floor:'7',placement:'pending',note:'Piso 7 confirmado por Sonny. Posición exacta pendiente; este módulo se muestra en una bandeja aparte, fuera de la planta de piso 8.'});
  for(const [n,px,py] of [[4,930,1191],[5,508,1191],[6,1143,960],[7,1236,960],[8,1330,960]])add('food',px,py,180,'Al. '+n+' · piso 8',{note:'Ubicación de Al. '+n+' en planta general. La huella en planta es 3 × 2 m; se conserva el toldo de 3,10 m del detalle, pendiente de conciliar.'});
  add('analytic',721,1188,0,'MR Analityc · foyer');
  for(let i=1;i<=5;i++)add('totem',747,754,0,'Tótem '+i+' · por ubicar',{x:54+(i-1)*2,z:-20,placement:'pending',note:'No se han identificado los cinco tótems en la planta. Posiciones en bandeja de pendientes; no representan ubicaciones aprobadas.'});
  add('tunnel',1033,947,0,'Túnel · 5 × 5 m');
  return {...base,layoutRevision:PLAN.revision,layoutNote:'Distribución trazada sobre la planta general 19-10-26, calibrada con la cota de 16 m. Ubicaciones aproximadas de referencia; no es un levantamiento. Los tótems y Al.1–3 están en bandejas separadas, por ubicar.',floor:{width:PLAN.width,depth:PLAN.depth},source:{...base.source,plan:'EVENTO DCREDICORP IA-PISO 8 V1--.19-10-26.pdf',confirmedAt:'2026-10-21',emailUpdate:'No se encontró un correo nuevo al revisar el 21-10-2026; se usa el correo del 20-10 y las confirmaciones de WhatsApp.'},pending:['Identificación de cuadrados grises de 50 × 50 cm','Identificación del bloque central de 2,50 × 2,50 m','Ubicación de cinco tótems','Altura del túnel: 2,40 / 2,60 m','Ubicación de Al.1–3 en piso 7'],pieces};
}

function roundedRect(width,height,radius,cy,z){
  const p=[];
  for(const [cx,yy,a] of [[width/2-radius,cy+height/2-radius,0],[-width/2+radius,cy+height/2-radius,90],[-width/2+radius,cy-height/2+radius,180],[width/2-radius,cy-height/2+radius,270]]){
    for(let i=0;i<=12;i++){const t=(a+i*90/12)*Math.PI/180;p.push([cx+radius*Math.cos(t),yy+radius*Math.sin(t),z]);}
  }
  p.push(p[0].slice());return p;
}

function pathCurve(points){
  const path=new THREE.CurvePath();
  for(let i=1;i<points.length;i++)if(points[i].distanceToSquared(points[i-1])>1e-12)path.add(new THREE.LineCurve3(points[i-1],points[i]));
  return path;
}

// Exact polyline extrusion retains corners, unlike a uniformly sampled CurvePath.
// Flat segment joins are covered by their adjacent tube end rings.
function polylineTube(points,radius,sides=6){
  const positions=[],normals=[],indices=[];
  for(let i=1;i<points.length;i++){
    const a=points[i-1],b=points[i],direction=b.clone().sub(a);
    if(direction.lengthSq()<1e-12)continue;
    direction.normalize();
    const axis=Math.abs(direction.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0);
    const normal=new THREE.Vector3().crossVectors(direction,axis).normalize();
    const binormal=new THREE.Vector3().crossVectors(direction,normal).normalize();
    const start=positions.length/3;
    for(const endpoint of [a,b])for(let j=0;j<sides;j++){
      const angle=j/sides*Math.PI*2,n=normal.clone().multiplyScalar(Math.cos(angle)).addScaledVector(binormal,Math.sin(angle));
      positions.push(endpoint.x+n.x*radius,endpoint.y+n.y*radius,endpoint.z+n.z*radius);normals.push(n.x,n.y,n.z);
    }
    for(let j=0;j<sides;j++){const k=(j+1)%sides;indices.push(start+j,start+k,start+sides+k,start+j,start+sides+k,start+sides+j);}
    // End caps keep standalone bars closed in exported GLB models.
    for(let j=1;j<sides-1;j++){indices.push(start,start+j+1,start+j);indices.push(start+sides,start+sides+j,start+sides+j+1);}
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));geometry.setIndex(indices);geometry.computeBoundingSphere();return geometry;
}

function makeUnit(type,structure){
  const c=catalog[type],traces=[];
  const body=new THREE.MeshStandardMaterial({color:'#34424f',roughness:.72,metalness:.12});
  const panel=new THREE.MeshStandardMaterial({color:'#27323e',roughness:.8,metalness:.05});
  const edge=new THREE.MeshStandardMaterial({color:'#657580',roughness:.5,metalness:.3});
  const deck=new THREE.MeshStandardMaterial({color:'#202934',roughness:.86,metalness:.02});
  const screen=new THREE.MeshStandardMaterial({color:'#101c2a',roughness:.28,metalness:.2});
  const put=(geo,material,position)=>{const m=new THREE.Mesh(geo,material);m.position.set(...position);m.castShadow=true;m.receiveShadow=true;structure.add(m);return m;};
  const box=(x,y,z,w,h,d,material=body)=>put(new THREE.BoxGeometry(w,h,d),material,[x,y,z]);
  const frame=(points,radius=.05,material=body)=>put(polylineTube(points.map(p=>new THREE.Vector3(p[0],p[1],p[2]-radius-.015)),radius,8),material,[0,0,0]);
  const trace=(id,name,points,color=CYAN)=>traces.push({id,name,points,color});
  if(type==='tunnel'){
    box(0,-.045,0,c.width+.15,.09,5.08,deck);
    for(const [side,sign] of [['A',-1],['B',1]]){
      box(sign*c.width/2,1.2,0,.025,2.4,5,panel);
      for(let row=0;row<5;row++)for(let col=0;col<10;col++){
        const dep=tunnelDepths[side][row][col]/100,z=-2.5+(col+.5)*.5,y=.05+(4-row+.5)*.47;
        box(sign*(c.width/2-dep/2),y,z,dep,.465,.495,panel);
        const x=sign*(c.width/2-dep-.012);
        trace(side+'-'+row+'-'+col,side+' · fila '+(row+1)+' · módulo '+(col+1),[[x,y-.224,z-.239],[x,y+.224,z-.239],[x,y+.224,z+.239],[x,y-.224,z+.239],[x,y-.224,z-.239]],col%3===0?PURPLE:CYAN);
      }
    }
  }else if(type==='innovation'){
    box(0,.035,0,4,.07,2,deck);box(0,1,-.97,3.65,2,.06,panel);box(-1.95,1,-.25,.1,2,1.5);box(1.95,1,-.25,.1,2,1.5);
    for(let j=0;j<2;j++){
      const radius=j?1.725:1.825,cy=.675,angle=Math.asin(-cy/radius),p=[];
      for(let i=0;i<=100;i++){const t=angle+i*(Math.PI-2*angle)/100;p.push([radius*Math.cos(t),cy+radius*Math.sin(t),-.90+j*.012]);}
      frame(p,.035);trace('ring'+j,j?'Arco interior':'Arco exterior',p,j?CYAN:PURPLE);
    }
    box(0,.4,.6,1.2,.8,.5);trace('credenza','Credenza · contorno',roundedRect(1.18,.78,.25,.4,.858),PURPLE);
    for(const s of [-1,1])trace('side'+s,'Lateral '+(s<0?'izquierdo':'derecho'),[[s*1.90,.02,.5],[s*1.90,1.65,.5],[s*1.90,1.90,.4],[s*1.90,2,-.05],[s*1.90,2,-.9]]);
  }else if(type==='presenting'){
    box(0,.035,0,6,.07,3,deck);box(0,1.5,-1.35,1.1,3,.25,panel);
    for(const s of [-1,1]){const p=[[s*2.85,0,1.3],[s*2.20,2.08,1.3],[s*1.30,2.50,1.3]];frame(p,.15);trace('leg'+s,'Pata '+(s<0?'izquierda':'derecha'),p,PURPLE);}
    box(0,2.5,1.3,2.6,.4,.35);box(0,2.9,-.3,1.1,.4,2.7);box(0,.4,.85,1.2,.8,.5);trace('credenza','Credenza · contorno',rect(-.58,.58,.02,.78,1.11));
  }else if(type==='food'){
    for(const x of [-1.5,1.5])for(const z of [-.95,.95])box(x,1.1,z,.05,2.2,.05,edge);
    box(0,2.17,0,3.1,.06,2,panel);box(0,.48,.4,2.6,.96,.5);
    const p=[[-1.52,0,1.02],[-1.52,2.18,1.02],[1.52,2.18,1.02],[1.52,0,1.02]];frame(p,.07);trace('mask','Máscara MDF · exterior',p,PURPLE);
    const arc=[[-1.18,0,1.03],[-1.18,.95,1.03]];
    for(let i=0;i<=48;i++){const a=Math.PI-i*Math.PI/48;arc.push([1.18*Math.cos(a),.95+1.18*Math.sin(a),1.03]);}
    arc.push([1.18,0,1.03]);frame(arc,.075);trace('arch','Máscara MDF · arco',arc,PURPLE);
  }else if(type==='analytic'){
    put(new THREE.CylinderGeometry(.9,.9,.2,48),body,[0,.1,0]);
    const heights=[.8,1.2,1.6,1.9,2.1,2.2,1.9,1.7,1.4,1.1,.8];
    for(let i=0;i<11;i++){const x=-.85+i*.17;box(x,.035,-.8,.09,.07,.2);trace('bar'+i,'Barra '+(i+1),[[x,.05,-.8],[x,heights[i],-.8]],i%2?PURPLE:CYAN);}
  }else if(type==='totem'){
    box(0,.74,0,.4,1.48,.4,panel);
    const top=box(0,1.48,0,.36,.012,.28,screen);top.rotation.x=-.10;
    trace('top','Borde superior',[[.2,1.505,.2],[-.2,1.505,.2],[-.2,1.505,-.2],[.2,1.505,-.2],[.2,1.505,.2]],PURPLE);
  }else{
    box(0,c.height/2,0,c.width,c.height,c.depth,panel);
    // Panel joins help distinguish this from an LED screen.
    for(let x=-c.width/2+1.22;x<c.width/2;x+=1.22)box(x,c.height+.001,0,.012,.006,c.depth,deck);
    const p=[[-c.width/2,c.height+.012,c.depth/2],[c.width/2,c.height+.012,c.depth/2],[c.width/2,c.height+.012,-c.depth/2],[-c.width/2,c.height+.012,-c.depth/2],[-c.width/2,c.height+.012,c.depth/2]];
    for(let i=0;i<4;i++)trace('edge'+i,['Frente','Lateral derecho','Fondo','Lateral izquierdo'][i],[p[i],p[i+1]]);
  }
  return traces;
}

function ledConfig(trace,override={}){
  return {color:/^#[0-9a-f]{6}$/i.test(override.color||'')?override.color:trace.color,brightness:bounded(override.brightness,100,0,100),on:override.on!==false,offsetX:bounded(override.offsetX,0,-50,50),offsetY:bounded(override.offsetY,0,-50,50),offsetZ:bounded(override.offsetZ,0,-50,50),scale:bounded(override.scale,1,.05,10),thickness:bounded(override.thickness,20,2,100)};
}

export function buildPiece(piece){
  const c=catalog[piece.type];if(!c)throw new Error('Tipo de pieza desconocido: '+piece.type);
  const root=new THREE.Group();root.name=piece.id;root.userData.pieceId=piece.id;root.userData.type=piece.type;root.userData.floor=piece.floor||'8';root.userData.placement=piece.placement||'custom';root.userData.note=piece.note||c.note;
  root.position.set(finite(piece.x,0),finite(piece.y,0),finite(piece.z,0));root.rotation.y=THREE.MathUtils.degToRad(finite(piece.rotation,0));root.visible=piece.visible!==false;
  const structure=new THREE.Group();structure.name='structure';const lights=new THREE.Group();lights.name='leds';root.add(structure,lights);
  const traces=makeUnit(piece.type,structure),sx=bounded(piece.width,c.width,.1,100)/c.width,sy=bounded(piece.height,c.height,.05,30)/c.height,sz=bounded(piece.depth,c.depth,.1,100)/c.depth;
  structure.scale.set(sx,sy,sz);structure.traverse(o=>{if(o.isMesh)o.userData={pieceId:piece.id,isStructure:true};});
  root.userData.leds=[];
  for(const trace of traces){
    const cfg=ledConfig(trace,piece.leds?.[trace.id]),points=trace.points.map(p=>new THREE.Vector3(p[0]*sx,p[1]*sy,p[2]*sz));
    const center=new THREE.Box3().setFromPoints(points).getCenter(new THREE.Vector3()),offset=new THREE.Vector3(cfg.offsetX,cfg.offsetY,cfg.offsetZ);
    for(const p of points)p.sub(center).multiplyScalar(cfg.scale).add(center).add(offset);
    const length=pathCurve(points).getLength(),b=cfg.on?cfg.brightness/100:0,col=new THREE.Color(cfg.color);
    const core=new THREE.Mesh(polylineTube(points,cfg.thickness/2000),new THREE.MeshBasicMaterial({color:b?col.clone().multiplyScalar(.14+.86*b):'#4c5a66',transparent:!b,opacity:b?1:.34}));
    core.name=piece.id+' / '+trace.name;core.userData={pieceId:piece.id,ledId:trace.id,isLED:true,length};lights.add(core);
    if(b>0){const halo=new THREE.Mesh(polylineTube(points,cfg.thickness/650),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.095*b,depthWrite:false}));halo.name=piece.id+' / '+trace.name+' / halo';halo.userData={pieceId:piece.id,ledId:trace.id,isLED:true,isHalo:true};lights.add(halo);}
    root.userData.leds.push({id:trace.id,name:trace.name,length,...cfg});
  }
  root.userData.ledLength=root.userData.leds.reduce((n,l)=>n+l.length,0);
  root.userData.activeLEDLength=root.userData.leds.reduce((n,l)=>n+(l.on&&l.brightness>0?l.length:0),0);
  return root;
}

export function disposePiece(root){
  const geometries=new Set(),materials=new Set();
  root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m);});
  for(const g of geometries)g.dispose();for(const m of materials)m.dispose();root.removeFromParent();root.clear();
}

export function getLEDDefaults(type){
  if(!catalog[type])return [];
  const c=catalog[type],group=buildPiece({id:'defaults',type,width:c.width,height:c.height,depth:c.depth,leds:{}}),items=group.userData.leds.map(l=>({...l}));disposePiece(group);return items;
}

export function getProjectSummary(project){
  const byType={};let length=0,activeLength=0,ledCount=0,visible=0;
  for(const p of project.pieces){
    const g=buildPiece(p),leds=g.userData.leds;
    byType[p.type]??={name:catalog[p.type].name,count:0,length:0,ledCount:0};byType[p.type].count++;byType[p.type].length+=g.userData.ledLength;byType[p.type].ledCount+=leds.length;
    length+=g.userData.ledLength;ledCount+=leds.length;
    if(p.visible!==false){visible++;activeLength+=g.userData.activeLEDLength;}
    disposePiece(g);
  }
  return {pieces:project.pieces.length,visible,ledCount,length,activeLength,byType};
}
