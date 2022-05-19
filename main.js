import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const ambientLight = new THREE.AmbientLight(0xF04040);
const directionalLight = new THREE.DirectionalLight(0xF04040);
directionalLight.position.set(1, 2, 0);
scene.add(ambientLight);
scene.add(directionalLight);
camera.position.z = 2.5;
console.log(camera.position)
camera.updateProjectionMatrix();

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const gltfUrl = new URL('./gltf/82.glb', import.meta.url).href;

loader.load(gltfUrl,
  function(gltf) {
    scene.add(gltf.scene);
    animate();
  },
  undefined,
  function(error) {
    console.error(error)
  }
)