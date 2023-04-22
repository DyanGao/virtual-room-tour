import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let scene, camera, renderer, controls;

function init() {

  // create a scene
  scene = new THREE.Scene();

  // setup camera
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerWidth, 0.1, 100);
  camera.position.set(0, 0, 0.01)
  //camera.position.z = 3;

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("app").appendChild(renderer.domElement);

  // camera controls
  controls = new OrbitControls(camera, renderer.domElement)


  const materials = [];

  // left, right, top, down, front, back
  const texture_px = new THREE.TextureLoader().load('/images/room/px.png');
  materials.push(new THREE.MeshBasicMaterial({ map: texture_px }));
  const texture_nx = new THREE.TextureLoader().load('/images/room/nx.png');
  materials.push(new THREE.MeshBasicMaterial({ map: texture_nx }));
  const texture_py = new THREE.TextureLoader().load('/images/room/py.png');
  materials.push(new THREE.MeshBasicMaterial({ map: texture_py }));
  const texture_ny = new THREE.TextureLoader().load('/images/room/ny.png');
  materials.push(new THREE.MeshBasicMaterial({ map: texture_ny }));
  const texture_pz = new THREE.TextureLoader().load('/images/room/pz.png');
  materials.push(new THREE.MeshBasicMaterial({ map: texture_pz }));
  const texture_nz = new THREE.TextureLoader().load('/images/room/nz.png');
  materials.push(new THREE.MeshBasicMaterial({ map: texture_nz }));
  
  
  const cube = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1 ), materials);
  cube.geometry.scale(1, 1, -1);
  scene.add(cube);

  window.addEventListener('resize', onWindowResize)

}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera)
}

init();
animate();