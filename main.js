import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
const scene = new THREE.Scene();
let Loader = new THREE.GLTFLoader();
let Floor;
var mouse,
  raycaster,
  selected = null,
  index,
  
 element2; 
let loadData = "./Prizemie.gltf";
function btn1(){  
  console.log("pressed!")
  scene.remove(Floor);
  room_id.forEach(cube => {scene.remove(cube)});
  
  if (loadData === "./PrvePoschodie.gltf") {
    loadData = "./Prizemie.gltf";
    ;
  }
loadGLTF();
rooms();}
function btn2(){
  scene.remove(Floor);
   room_id.forEach(cube => {scene.remove(cube)});
  if (loadData ==="./Prizemie.gltf")
    {loadData = "./PrvePoschodie.gltf";}
    loadGLTF();
    rooms();
}

  
  

function onTouch(event){
    mouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;

    mouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
}
function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) {
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(room_id, false);
  //raycaster.intersectObjects(element, false);
  if (intersects.length > 0) {
    room_id.forEach(cube => {cube.material.color.set("#ff3399")});
    intersects[0].object.material.color.set("yellow")
    selected = intersects[0].object;
    index = room.findIndex((x) => x.x_pos === selected.position.x);
    let element = document.getElementById("InfoTabulka");
    if (element) {
      element.innerText =
        "Miestnosť: " +
        room[index].class +
        "\n" +
        "Učebňa: " +
        room[index].specific;
      

      console.log(room[index].specific);
    }
  }
}

let room = [
  {
    class: "7",
    specific: "1.D",
    x_pos: 4.5,
    y_pos: 1.9,
  },
  {
    class: "8",
    specific: "Kabinet_2.CJ_OBN",
    x_pos: 3.7,
    y_pos: 1.9,
  },
  {
    class: "9",
    specific: "3.C",
    x_pos: 2.9,
    y_pos: 1.9,
  },
  {
    class: "10",
    specific: "3.B",
    x_pos: 1.95,
    y_pos: 1.9,
  },
  {
    class: "11",
    specific: "Kabinet_MAT_INF",
    x_pos: 1.35,
    y_pos: 1.9,
  },
  {
    class: "12",
    specific: "Žiacka rada",
    x_pos: 0.9,
    y_pos: 1.9,
  },
  {
    class: "Gym",
    specific: "Telocvičňa",
    x_pos: 0.1,
    y_pos: -1.75,
  },
];
var room_id = [];
for (var x = 0; x < room.length; x++) {
  room_id[x] = new Object();
}
function rooms() {
  const geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
  const material = new THREE.MeshBasicMaterial({ color: "#ff3399" });


  for (var i = 0; i < room.length; i++) {
    room_id[i] = new THREE.Mesh(geometry, material);

    room_id[i].position.x = room[i].x_pos;
    room_id[i].position.z = room[i].y_pos;
    room_id[i].position.y = 0.5;
    scene.add(room_id[i]);
  }
}

function init() {
  scene.background = new THREE.Color("#57ada3");
  camera.position.set(0.5, 13, 20);
  renderer.setSize(window.innerWidth, window.innerHeight);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 5;
  controls.maxDistance = 50;
  controls.maxPolarAngle = Math.PI / 2;
  controls.update();
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  document.body.appendChild(renderer.domElement);
  document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener("touchstart", onTouch,false);
  document.addEventListener("click", onClick);
  document.addEventListener("touchstart",onClick);
  document.querySelector("#button1").addEventListener("click",btn1);
  document.querySelector("#button2").addEventListener("click",btn2);
}

function setLight() {
  const spotLight = new THREE.SpotLight("white");
  spotLight.position.set(0, 20, 12);
  scene.add(spotLight);
}

function loadGLTF() {
  Loader.load(loadData, (gltf) => {
    Floor = gltf.scene;
    Floor.scale.set(12, 12, 12);

    scene.add(Floor);
    Floor.position.x = 0;
    Floor.position.y = 0;
    Floor.position.z = 0;
    Floor.rotation.x = 0;
    Floor.rotation.y = 0;
  });
}

function animate() {
  requestAnimationFrame(animate);

  for (var i = 0; i < room.length; i++) {
    room_id[i].rotation.y += 0.02;
  }
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(room_id, false);
  for (let j = 0; j < room_id.length; j++) {
    if (room_id[j].material) {
      room_id[j].material.opacity = 1;
    }
  }
  if (intersects.length > 0) {
    const newMaterial = intersects[0].object.material.clone();
    newMaterial.transparent = true;
    newMaterial.opacity = 0.5;
    intersects[0].object.material = newMaterial;

    
  }
  renderer.render(scene, camera);
}

init();
setLight();
loadGLTF();
rooms();
animate();
