import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
var isMobile = false; 
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}   
console.log(isMobile);
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
function search(event){
  if (event.which == 13 || event.keyCode == 13)
{var content = document.querySelector("#search").value;
content = content.toLowerCase();
index = room.findIndex((x) => (x.specific).toLowerCase().includes(content) === true);
console.log(room[index].specific);
room_id.forEach((cube) => {
  cube.material.color.set("#ff3399");
});
const newMaterial = room_id[index].material.clone();
    newMaterial.color.set("yellow");
    room_id[index].material = newMaterial;
}

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
    room_id.forEach((cube) => {
      cube.material.color.set("#ff3399");
    });
    intersects[0].object.material.color.set("yellow");
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
var grid = new THREE.GridHelper(100, 100);
var grid5 = new THREE.GridHelper(100, 1000);

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
  if (isMobile === false)
{ document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener("click", onClick);}
  document.addEventListener("touchstart", onClick);
  //document.addEventListener("touchstart", onTouch, false);
  document.querySelector("#button1").addEventListener("click", btn1);
  document.querySelector("#button2").addEventListener("click", btn2);
  //document.querySelector("#search").setAttribute("onkeyup",search);
  document.querySelector("#search").addEventListener("keypress",search)
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
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(room_id, false);
  if (isMobile===false)
{  for (let j = 0; j < room_id.length; j++) {
    if (room_id[j].material) {
      room_id[j].material.opacity = 1;
    }
  }
  if (intersects.length > 0) {
    const newMaterial = intersects[0].object.material.clone();
    newMaterial.transparent = true;
    newMaterial.opacity = 0.5;
    intersects[0].object.material = newMaterial;
  }}
  renderer.render(scene, camera);
}

init();
setLight();
loadGLTF();
rooms();
traffic();
animate();