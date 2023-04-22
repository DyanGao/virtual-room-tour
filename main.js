import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


let scene, camera, renderer, controls;

function init() {

  // create a scene
  scene = new THREE.Scene();

  // setup camera
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerWidth, 0.1, 100);
  camera.position.set(0, 0, 0.1)
  //camera.position.z = 3;

  // renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("app").appendChild(renderer.domElement);

  // camera controls
  controls = new OrbitControls(camera, renderer.domElement)

  /**
   * Option 1: CubeMap view
   */
  // const materials = [];

  // // left, right, top, down, front, back
  // const texture_px = new THREE.TextureLoader().load('/images/room/px.png');
  // materials.push(new THREE.MeshBasicMaterial({ map: texture_px }));
  // const texture_nx = new THREE.TextureLoader().load('/images/room/nx.png');
  // materials.push(new THREE.MeshBasicMaterial({ map: texture_nx }));
  // const texture_py = new THREE.TextureLoader().load('/images/room/py.png');
  // materials.push(new THREE.MeshBasicMaterial({ map: texture_py }));
  // const texture_ny = new THREE.TextureLoader().load('/images/room/ny.png');
  // materials.push(new THREE.MeshBasicMaterial({ map: texture_ny }));
  // const texture_pz = new THREE.TextureLoader().load('/images/room/pz.png');
  // materials.push(new THREE.MeshBasicMaterial({ map: texture_pz }));
  // const texture_nz = new THREE.TextureLoader().load('/images/room/nz.png');
  // materials.push(new THREE.MeshBasicMaterial({ map: texture_nz }));


  // const cube = new THREE.Mesh(new THREE.BoxGeometry( 10, 10, 10 ), materials);
  // cube.geometry.scale(1, 1, -1);
  // scene.add(cube);

  /**
   * Option 2: 3D View - SphereMapping
   */
  const sphereGeometry = new THREE.SphereGeometry(5, 30, 30);
 
  const loader = new RGBELoader();
  loader.load('/images/room/studio.hdr', (texture) => {
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
  })
  
  sphereGeometry.scale(1, 1, -1);
  

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