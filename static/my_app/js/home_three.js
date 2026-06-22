import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {RGBELoader} from "three/addons/loaders/RGBELoader.js";
import {GUI} from 'lil-gui'
import * as gsap from './home_animation.js'
import {section3Animate} from "./home_animation.js";

console.log(THREE)
// define elements
const canvas = document.getElementById('canvas');
let size = {
    width: window.innerWidth,
    height: window.innerHeight
}
let cameraTarget = new THREE.Vector3(0, 0, 0)
let car


// define scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#f5f5f5')

//define helper
// const axisHelper = new THREE.AxesHelper();
// scene.add(axisHelper);

//define camera
export const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 1, 1000);
scene.add(camera);
camera.lookAt(cameraTarget);
camera.position.set(5, 12, 16)
camera.rotation.set(-0.254, -0.11, 0)
let cameraHelper = new OrbitControls(camera, canvas);
cameraHelper.enabled = false
//define env
const envLoader = new RGBELoader();
envLoader.load(environPath, envMap => {
    envMap.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = envMap;
})

// define meshes
const plan = new THREE.Mesh(
    new THREE.PlaneGeometry(35, 15),
    new THREE.MeshBasicMaterial({color: '#d9d9d9'}),
);
plan.rotation.x = -Math.PI / 2;
scene.add(plan);
// GLTF model
const gltfLoader = new GLTFLoader();

gltfLoader.load(modelPath, gltf => {
    car = gltf.scene
    scene.add(car);
    car.scale.set(0.05, 0.05, 0.05);
    car.position.set(0, 2, 3);
    car.rotation.set(-0.02, 2, -0.03);
    // carPosition.add(car.position, 'x').name('x')
    // carPosition.add(car.position, 'y').name('y')
    // carPosition.add(car.position, 'z').name('z')
    // carRotate.add(car.rotation, 'x', -2, 2, 0.01).name('x')
    // carRotate.add(car.rotation, 'y', -2, 2, 0.01).name('y')
    // carRotate.add(car.rotation, 'z', -2, 2, 0.01).name('z')
    gsap.stopPreloadAnimate()
    gsap.startPreloadCameraAnimate(camera, cameraTarget)
    gsap.section2Animate(camera, cameraTarget, car)
    gsap.section3Animate(camera, car, cameraTarget)
})
// define gui
const gui = new GUI()
gui.hide()
const position = gui.addFolder('camera position');
const rotation = gui.addFolder('camera rotation');
const carPosition = gui.addFolder('car position');
const carRotate = gui.addFolder('car rotate');
// define renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

// define animation frame
function animate() {
    requestAnimationFrame(animate);
    // camera.lookAt(cameraTarget);
    cameraHelper.update()
    renderer.render(scene, camera);
}

animate();

// define events
window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    renderer.setSize(size.width, size.height);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});
// window.addEventListener('load', () => {
//     window.scrollTo(0, 0);
// });
// gui
let cameraOpt = {
    look: false
}

const positionFolder = gui.addFolder('camera position');

function myOnChange() {
    camera.lookAt(car.position);
}

positionFolder.add(camera.position, 'x', -20, 20, 0.01)
positionFolder.add(camera.position, 'y', -20, 20, 0.01)
positionFolder.add(camera.position, 'z', -20, 20, 0.01)
