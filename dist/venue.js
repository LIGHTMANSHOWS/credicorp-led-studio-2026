import * as THREE from './vendor/three.module.js';
import {PLAN} from './models.js';

// Reference geometry is deliberately separate from editable LED pieces.
export function createVenue(onLoad){
  const root=new THREE.Group();root.name='Referencia de distribución';
  const material=new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.72,depthWrite:false});
  const plan=new THREE.Mesh(new THREE.PlaneGeometry(PLAN.width,PLAN.depth),material);
  plan.rotation.x=-Math.PI/2;plan.position.y=-.065;plan.name='Planta de referencia · piso 8';root.add(plan);
  new THREE.TextureLoader().load(PLAN.image,texture=>{texture.colorSpace=THREE.SRGBColorSpace;material.map=texture;material.needsUpdate=true;onLoad();},undefined,()=>{plan.visible=false;onLoad();});
  const label=(text,x,z,width=16)=>{
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=100;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#14242e';ctx.fillRect(0,0,1024,100);ctx.font='500 30px Segoe UI,Arial';ctx.fillStyle='#c9f56b';ctx.textAlign='center';ctx.fillText(text,512,60);
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,width/10.24),new THREE.MeshBasicMaterial({map:texture}));mesh.rotation.x=-Math.PI/2;mesh.position.set(x,.015,z);root.add(mesh);
  };
  const tray=(z,depth,title)=>{
    const board=new THREE.Mesh(new THREE.BoxGeometry(16,.1,depth),new THREE.MeshStandardMaterial({color:'#263744',roughness:1}));board.position.set(58,-.11,z);root.add(board);
    label(title,58,z-depth/2+1,15);
  };
  tray(-20,8,'PISO 8 · 5 TÓTEMS POR UBICAR');
  tray(8,11,'PISO 7 · AL. 1–3 POR UBICAR');
  label('PISO 8 · DISTRIBUCIÓN SEGÚN PLANO',2,34.3,33);
  return root;
}
