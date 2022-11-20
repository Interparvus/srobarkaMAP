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
  tram,
  tram2;
let loadData = "./Prizemie.gltf";
function btn1() {
  console.log("pressed!");
  scene.remove(Floor);
  room_id.forEach((cube) => {
    scene.remove(cube);
  });

  if (loadData === "./PrvePoschodie.gltf") {
    loadData = "./Prizemie.gltf";
  }
  loadGLTF();
  rooms();
}
function btn2() {
  scene.remove(Floor);
  room_id.forEach((cube) => {
    scene.remove(cube);
  });
  if (loadData === "./Prizemie.gltf") {
    loadData = "./PrvePoschodie.gltf";
  }
  loadGLTF();
  rooms();
}

function onTouch(event) {
  event.preventDefault();
  mouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 + -1;

  mouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
}

var grid = new THREE.GridHelper(100, 100);

function select(event) {
  event.preventDefault();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(room_id, false);
  
  
  
  if (intersects.length > 0) {
    for (let j = 0; j < room_id.length; j++) {
      if (room_id[j].material) {
        room_id[j].material.color.set("#ff3399");
      }
    }
    const newMaterial = intersects[0].object.material.clone();
    newMaterial.color.set("yellow");
    intersects[0].object.material = newMaterial;
  
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
      console.log(index);
    console.log(room[index].specific);
    
  }
}}
scene.add(grid);
//scene.add(grid5);
let room = [
  {
    class: "7",
    specific: "1.D",
    x_pos: 6.7,
    y_pos: 1.9,
  },
  {
    class: "8",
    specific: "Kabinet_2.CJ_OBN",
    x_pos: 5.75,
    y_pos: 1.9,
  },
  {
    class: "9",
    specific: "3.C",
    x_pos: 4.8,
    y_pos: 1.9,
  },
  {
    class: "10",
    specific: "3.B",
    x_pos: 3.4,
    y_pos: 1.9,
  },
  {
    class: "11",
    specific: "Kabinet_MAT_INF",
    x_pos: 2.45,
    y_pos: 1.9,
  },
  {
    class: "12",
    specific: "Žiacka rada",
    x_pos: 1.75,
    y_pos: 2,
  },
  {
    class: "54",
    specific: "Telocvičňa",
    x_pos: 0,
    y_pos: -3,
  },
  {
    class: "14",
    specific: "vrátnica ???",
    x_pos: 1.05,
    y_pos: 1.65,
  },
  {
    class: "5",
    specific: "Jedáleň",
    x_pos: 8.5,
    y_pos: 1.4,
  },
  {
    class: "53",
    specific: "Šatňa_1",
    x_pos: -0.5,
    y_pos: -1.75,
  },
  {
    class: "55",
    specific: "Šatňa_2",
    x_pos: 0.5,
    y_pos: -1.75,
  },
  {
    class: "56",
    specific: "Kabinet_TEV",
    x_pos: 0.49,
    y_pos: -1.15,
  },
  {
    class: "59",
    specific: "WC_Muži",
    x_pos: 0.55,
    y_pos: 0.25,
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

function traffic(){
  const geometry = new THREE.BoxGeometry(0.5,0.5,2);
  const material = new THREE.MeshBasicMaterial({color: "red"});
  tram = new THREE.Mesh(geometry,material);
  tram2 = new THREE.Mesh(geometry,material);
  tram.position.x =12;
  tram.position.y = 0.25;
  tram.position.z = -50;
  tram2.position.x = 13;
  tram2.position.y=0.25;
  tram2.position.z = 50;
  scene.add(tram);
  scene.add(tram2);
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
  document.addEventListener("touchstart", onTouch, {passive:false});
  document.addEventListener("touchstart",select, {passive:false});
  document.querySelector("#button1").addEventListener("click", btn1);
  document.querySelector("#button2").addEventListener("click", btn2);
  
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
  if (tram.position.z <50)
  {tram.position.z += 0.1;
  tram2.position.z += -0.1} 
  else{
    scene.remove(tram2);
    scene.remove(tram);
    traffic();
  }

  for (var i = 0; i < room.length; i++) {
    room_id[i].rotation.y += 0.02;
  }
  
  
  //room_id.forEach((cube) => {
  //  cube.material.color.set("#ff3399");
  //});

  renderer.render(scene, camera);
}

init();
setLight();
loadGLTF();
rooms();
traffic();
animate();