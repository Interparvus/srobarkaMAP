import './style.css';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
const button = document.createElement('button')
let loadData = "./Prizemie.gltf"
button.innerText = 'Floor'
button.addEventListener('click', () => {
scene.remove(Floor);	
if (loadData === "./PrvePoschodie.gltf"){
	loadData = "./Prizemie.gltf"
}else{

	 loadData = "./PrvePoschodie.gltf"}
  loadGLTF();
  
})
document.body.appendChild(button)
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
const scene = new THREE.Scene();
let Loader = new THREE.GLTFLoader();
let Floor;
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
//const interaction = new Interaction(renderer, scene, camera);

function init() {
    scene.background = new THREE.Color('#57ada3');
    camera.position.set(0.5, 13, 20);
    renderer.setSize(window.innerWidth, window.innerHeight);
	const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0,12,12);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();
    
    document.body.appendChild(renderer.domElement);
}

function setLight() {
    const spotLight = new THREE.SpotLight( "gray");
    spotLight.position.set( 0,20,12);
    scene.add( spotLight );
    

}

function loadGLTF() {
    

    Loader.load(loadData, (gltf) => {
        Floor = gltf.scene;
        Floor.scale.set(1,1,1);
        
        
        scene.add(Floor);
        Floor.position.x = 0;
        Floor.position.y = 12;
        Floor.position.z = 15;
        Floor.rotation.x = 0;
		Floor.rotation.y = 3.15;
    });
}

function animate() {
    requestAnimationFrame(animate);
	
    
    renderer.render(scene, camera);
}

init();
setLight();
loadGLTF();
animate();
