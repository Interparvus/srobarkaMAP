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
  tram2,
  car1,
  car2,
  car3,
  car4;


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
function search(event) {
  console.log("clicked")
  var content = document.querySelector("#search").value;
  content = content.toLowerCase();
  const newMaterial = room_id[0].material.clone();
  newMaterial.color.set("yellow")

  index = room.findIndex((x) => (x.specific).toLowerCase().includes(content) === true);

  room_id.forEach((cube) => {
    cube.material.color.set("#ff3399");
  });

  if (!content) return;

  for (var i = 0; i < room.length; i++) {
    if (room[i].specific.toLowerCase().includes(content) || room[i].class.toLowerCase().includes(content)) {
      room_id[i].material = newMaterial;
    }
  }

  if ((event.which == 13 || event.keyCode == 13) && index != -1) {
    let element = document.getElementById("InfoTabulka");
    if (element) {
      element.innerText =
        "Miestnosť: " +
        room[index].class +
        "\n" +
        "Učebňa: " +
        room[index].specific;
    }
  }
}

function onTouch(event) {
  mouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 + -1;

  mouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
}

var grid = new THREE.GridHelper(100, 100);

function select(event) {
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
  {
    class: "17",
    specific: "Psychologička",
    x_pos: -0.51,
    y_pos: 2.4,
  },
  {
    class: "18",
    specific: "Knižnica",
    x_pos: -1.75,
    y_pos: 2.1,
  },
  {
    class: "20",
    specific: "IB_1",
    x_pos: -3,
    y_pos: 2,
  },
  {
    class: "21",
    specific: "INF_3",
    x_pos: -4,
    y_pos: 2,
  },
  {
    class: "22",
    specific: "Kabinet_ANJ",
    x_pos: -4.8,
    y_pos: 2,
  },
  {
    class: "23",
    specific: "MMU_Multimediálna_učebňa",
    x_pos: -6,
    y_pos: 2,
  },
  {
    class: "24",
    specific: "Kabinet_ANJ_2",
    x_pos: -7.2,
    y_pos: 2,
  },
  {
    class: "26",
    specific: "Ateliér",
    x_pos: -7.9,
    y_pos: 2,
  },
  {
    class: "28",
    specific: "Študovňa",
    x_pos: -8.6,
    y_pos: 1.6,
  },
  {
    class: "29",
    specific: "INF_1_Caffe",
    x_pos: -8.9,
    y_pos: 0.8,
  },
  {
    class: "32",
    specific: "4.B",
    x_pos: -8.9,
    y_pos: -0.2,
  },
  {
    class: "33",
    specific: "Kabinet_INF",
    x_pos: -8.90001,
    y_pos: -1.25,
  },
  {
    class: "33.A",
    specific: "Kabinet_INF_A",
    x_pos: -8.90011,
    y_pos: -1.75,
  },
  {
    class: "34",
    specific: "INF_2",
    x_pos: -8.90111,
    y_pos: -2.5,
  },
  {
    class: "35",
    specific: "4.A",
    x_pos: -8.90101,
    y_pos: -3.52,
  },
  {
    class: "36",
    specific: "4.E",
    x_pos: -8.901101,
    y_pos: -5,
  },
  {
    class: "37",
    specific: "Rezerva",
    x_pos: -8.901111,
    y_pos: -6.45,
  },
  {
    class: "39",
    specific: "WC_Muži",
    x_pos: -7.5,
    y_pos: -5.37,
  },
  {
    class: "42",
    specific: "WC_Ženy",
    x_pos: -7.51,
    y_pos: -4.42,
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
  const Cargeometry = new THREE.BoxGeometry(0.5,0.5,1);
  const Carmaterial = new THREE.MeshBasicMaterial({color: "blue"});
  tram = new THREE.Mesh(geometry,material);
  tram2 = new THREE.Mesh(geometry,material);
  car1 = new THREE.Mesh(Cargeometry,Carmaterial);
  car2 = new THREE.Mesh(Cargeometry,Carmaterial);
  car3 = new THREE.Mesh(Cargeometry,Carmaterial);
  car4 = new THREE.Mesh(Cargeometry,Carmaterial);
  tram.position.x =12;
  tram.position.y = 0.25;
  tram.position.z = -50;
  tram2.position.x = 13;
  tram2.position.y=0.25;
  tram2.position.z = 50;
  car1.position.x = -17;
  car1.position.y = 0.25;
  car1.position.z = 47;
  car2.position.x = -18;
  car2.position.y = 0.25;
  car2.position.z = 50;
  car3.position.x = -19;
  car3.position.y = 0.25;
  car3.position.z = -50;
  car4.position.x = -20;
  car4.position.y = 0.25;
  car4.position.z = -48;
  scene.add(tram);
  scene.add(tram2);
  scene.add(car1);
  scene.add(car2);
  scene.add(car3);
  scene.add(car4);
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
  Loader.load("./infrastructure.gltf",(gltf) =>{
    var Structure = gltf.scene;
    Structure.scale.set(12,12,12);
    scene.add(Structure);
  })
  document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener("click", onClick);


  document.querySelector("#button1").addEventListener("click", btn1);
  document.querySelector("#button2").addEventListener("click", btn2);
  document.querySelector("#search").addEventListener("input", search)
  document.querySelector("#search").addEventListener("keypress", search)
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
  if (car4.position.z > 50){
    scene.remove(car4);
    scene.remove(car2);
    car4.position.z = -48;
    car2.position.z = 50;
    scene.add(car4);
    scene.add(car2);

  }
  if (car3.position.z < 50)
  {tram.position.z += 0.1;
  tram2.position.z += -0.1;
  car1.position.z += -0.1
  car2.position.z += -0.2
  car3.position.z += 0.1
  car4.position.z += 0.2
  } 
  else{
    scene.remove(tram2);
    scene.remove(tram);
    scene.remove(car1);
    scene.remove(car2);
    scene.remove(car3);
    scene.remove(car4);
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