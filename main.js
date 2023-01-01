import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
let mobile = false;
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  mobile = true;
}
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
let Floor2;
let Floor3;
var picked_floor = 0;
var mouse,
  raycaster,
  selected = null,
  found = false,
  index;
var room_id = [];
var mixer;

Loader.load("./infrastructure.gltf", (gltf) => {
  var Structure = gltf.scene;
  Structure.scale.set(12, 12, 12);
  scene.add(Structure);
  mixer = new THREE.AnimationMixer(Structure);
  const clips = gltf.animations;
  clips.forEach(function(clip){
    const action = mixer.clipAction(clip);
    action.play();
  
  });
 
  
});

function btn1() {
  room_id.forEach((cube) => {
    scene.remove(cube);
  });
  Floor2.visible = false;
  Floor3.visible = false;
  Floor.visible = true;
  picked_floor = 1;
  rooms();
}
function btn2() {
  room_id.forEach((cube) => {
    scene.remove(cube);
  });
  Floor2.visible = true;
  Floor3.visible = false;
  Floor.visible = false;
  picked_floor = 2;
  rooms();
}
function btn3() {
  room_id.forEach((cube) => {
    scene.remove(cube);
  });
  Floor2.visible = false;
  Floor3.visible = true;
  Floor.visible = false;
  picked_floor = 3;
  rooms();
}
function search(event) {
  found = false;
  Floor.visible = true;
  Floor2.visible = true;
  Floor3.visible = true;
  room_id.forEach((cube) => {
    scene.remove(cube);
  });
  var content = document.querySelector("#search").value;
  let searchFilter = document.getElementById("searchFilter")
  content = content.toLowerCase();
  picked_floor =0;
  rooms();
  const newMaterial = room_id[0].material.clone();
  newMaterial.color.set("yellow");

  index = room.findIndex(
    (x) => x.specific.toLowerCase().includes(content) === true || x.class=== content
  );

  room_id.forEach((cube) => {
    cube.material.color.set("#ff1654");
  });
  if (content !== ""){
    searchFilter.style.display = "block";
  }
  if (!content) return;

  searchFilter.innerText ="";
  for (var i = 0; i < room.length; i++) {
    if (
      room[i].specific.toLowerCase().includes(content) ||
      room[i].class.toLowerCase().includes(content)
    ) {
      room_id[i].material = newMaterial;
      var id = room[i].specific;
      searchFilter.innerHTML += "<p id ="+id+">"+room[i].specific+"</p>";
      const div = document.getElementById('searchFilter');
      const children = div.querySelectorAll('*');
      let act = "touchstart"
      if (mobile === false){
         act = "click"
      }

      children.forEach(child => {
        
        child.addEventListener(act, event => {
          const clickedChildId = event.target.id;
          index = room.findIndex(item => item.specific === clickedChildId);
          let level = "Prízemie"
          if (room[index].z_pos === 1){
      
            level = "Prvé poschodie"
          }
          if (room[index].z_pos === 0.5){
      
            level = "Prízemie"
          }
          if (room[index].z_pos === 1.7){
      
            level = "Druhé poschodie"
          }
          let element = document.getElementById("InfoTabulka");
          if (element) {
            element.innerText =
              "Miestnosť: " +
              room[index].class +
              "\n" +
              "Učebňa: " +
              room[index].specific +
              "\n" +
              level
              
          }
          found = true;
          
          if(room[index].z_pos === 0.5){
            room_id.forEach((cube) => {
              scene.remove(cube);
            });
      
            btn1()
            index = room.findIndex(
              (x) => x.specific.includes(clickedChildId) === true || x.class===clickedChildId
            );
          };
          if(room[index].z_pos === 1){
            room_id.forEach((cube) => {
              scene.remove(cube);
            });
      
            btn2()
            index = room.findIndex(
              (x) => x.specific.includes(clickedChildId) === true || x.class===clickedChildId
            );
          };
          if(room[index].z_pos === 1.7){
            room_id.forEach((cube) => {
              scene.remove(cube);
            });
      
            btn3()
            index = room.findIndex(
              (x) => x.specific.includes(clickedChildId) === true || x.class===clickedChildId
            );
          };
          
          room_id[index].material = newMaterial; 
          document.querySelector("#search").value = "";
        });
      });
    }
  }

  
  if ((event.which == 13 || event.keyCode == 13) && index != -1) {
    let level = "Prízemie"
    if (room[index].z_pos === 1){

      level = "Prvé poschodie"
    }
    if (room[index].z_pos === 0.5){

      level = "Prízemie"
    }
    if (room[index].z_pos === 1.7){

      level = "Druhé poschodie"
    }
    let element = document.getElementById("InfoTabulka");
    if (element) {
      element.innerText =
        "Miestnosť: " +
        room[index].class +
        "\n" +
        "Učebňa: " +
        room[index].specific +
        "\n" +
        level
        
    }
    found = true;
    if(room[index].z_pos === 0.5){
      room_id.forEach((cube) => {
        scene.remove(cube);
      });

      btn1()
      
    };
    if(room[index].z_pos === 1){
      room_id.forEach((cube) => {
        scene.remove(cube);
      });

      btn2()
      
    };
    if(room[index].z_pos === 1.7){
      room_id.forEach((cube) => {
        scene.remove(cube);
      });

      btn3()
      
    };
    index = room.findIndex(
      (x) => x.specific.toLowerCase().includes(content) === true || x.class===content
    );
    room_id[index].material = newMaterial; 
  }
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
      cube.material.color.set("#ff1654");
    });
    intersects[0].object.material.color.set("yellow");
    selected = intersects[0].object;
    index = room.findIndex((x) => x.x_pos === selected.position.x);
    let level = "Prízemie"
    if (room[index].z_pos === 1){
      level = "Prvé poschodie"
    }
    if (room[index].z_pos === 1.7){
      level = "Druhé poschodie"
    }
    let element = document.getElementById("InfoTabulka");
    if (element) {
      element.innerText =
        "Miestnosť: " +
        room[index].class +
        "\n" +
        "Učebňa: " +
        room[index].specific +
        "\n" +
        level
        
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
        room_id[j].material.color.set("#ff1654");
      }
    }
    const newMaterial = intersects[0].object.material.clone();
    newMaterial.color.set("yellow");
    intersects[0].object.material = newMaterial;

    selected = intersects[0].object;
    index = room.findIndex((x) => x.x_pos === selected.position.x);

    let level = "Prízemie"
    if (room[index].z_pos === 1){
      level = "Prvé poschodie"
    }
    if (room[index].z_pos === 1.7){
      level = "Druhé poschodie"
    }
    let element = document.getElementById("InfoTabulka");
    if (element) {
      element.innerText =
        "Miestnosť: " +
        room[index].class +
        "\n" +
        "Učebňa: " +
        room[index].specific +
        "\n" +
        level
        
    }
  }
}

let room_3 =[
  {
    class: "400",
    specific: "Laboratórium_BIO",
    x_pos: -1.000012,
    y_pos: 2.1,
    z_pos: 1.7,
  },
  {
    class: "401",
    specific: "Laboratórium_FYZ",
    x_pos: 0.5511115,
    y_pos: 2.1,
    z_pos: 1.7,
  },
  {
    class: "402",
    specific: "Kabinet_BIO",
    x_pos: -1.784,
    y_pos: 1.25,
    z_pos: 1.7,
  },
  {
    class: "402",
    specific: "Kabinet_FYZ",
    x_pos: 1.5,
    y_pos: 1.25,
    z_pos: 1.7,
  }
]
let room_2 = [
  {
    class: "87",
    specific: "AULA",
    x_pos: -8.6001,
    y_pos: 1.6,
    z_pos: 1,
  },
  {
    class: "88",
    specific: "2.C",
    x_pos: -8.9001,
    y_pos: -0.2,
    z_pos: 1,
  },
  {
    class: "89",
    specific: "Kabinet_NEJ",
    x_pos: -8.9000101,
    y_pos: -1.25,
    z_pos: 1,
  },
  {
    class: "90",
    specific: "2.E",
    x_pos: -8.90011001,
    y_pos: -2.1,
    z_pos: 1,
  },
  {
    class: "91",
    specific: "Sklad_CHE",
    x_pos: -8.90101001,
    y_pos: -3.52,
    z_pos: 1,
  },
  {
    class: "94",
    specific: "Kabinet_CHE",
    x_pos: -8.901101001,
    y_pos: -5,
    z_pos: 1,
  },
  {
    class: "95",
    specific: "1.C",
    x_pos: -8.901111001,
    y_pos: -6.45,
    z_pos: 1,
  },
  {
    class: "39",
    specific: "WC_Muži",
    x_pos: -7.501,
    y_pos: -5.37,
    z_pos: 1,
  },
  {
    class: "42",
    specific: "WC_Ženy",
    x_pos: -7.5101,
    y_pos: -4.42,
    z_pos: 1,
  },
  {
    class: "72",
    specific: "2.D",
    x_pos: 6.7,
    y_pos: 1.9,
    z_pos: 1,
  },
  {
    class: "73",
    specific: "3.D",
    x_pos: 5.6,
    y_pos: 1.9,
    z_pos: 1,
  },
  {
    class: "74",
    specific: "2.B",
    x_pos: 4.35,
    y_pos: 1.9,
    z_pos: 1,
  },
  {
    class: "75",
    specific: "2.A",
    x_pos: 2.9,
    y_pos: 1.9,
    z_pos: 1,
  },
  {
    class: "76",
    specific: "1.A",
    x_pos: 1.75,
    y_pos: 2,
    z_pos: 1,
  },
  {
    class: "77",
    specific: "3.E",
    x_pos: 0.75,
    y_pos: 2.1,
    z_pos: 1,
  },
  {
    class: "78",
    specific: "3.A",
    x_pos: -0.500001,
    y_pos: 2.1,
    z_pos: 1,
  },
  {
    class: "79",
    specific: "4.C",
    x_pos: -1.75,
    y_pos: 2.1,
    z_pos: 1,
  },
  {
    class: "81",
    specific: "JU_1",
    x_pos: -2.6,
    y_pos: 2,
    z_pos: 1,
  },
  {
    class: "82",
    specific: "1.B",
    x_pos: -3.6,
    y_pos: 2,
    z_pos: 1,
  },
  {
    class: "83",
    specific: "4.D",
    x_pos: -4.8,
    y_pos: 2,
    z_pos: 1,
  },
  {
    class: "84",
    specific: "Kabinet_DEJ_GEG",
    x_pos: -5.8,
    y_pos: 2,
    z_pos: 1,
  },
  {
    class: "85",
    specific: "1.E",
    x_pos: -6.75,
    y_pos: 2,
    z_pos: 1,
  },
];
let room = [
  {
    class: "7",
    specific: "1.D",
    x_pos: 6.701,
    y_pos: 1.9,
    z_pos: 0.5,
  },
  {
    class: "8",
    specific: "Kabinet_CJ_OBN",
    x_pos: 5.75,
    y_pos: 1.9,
    z_pos: 0.5,
  },
  {
    class: "9",
    specific: "3.C",
    x_pos: 4.8,
    y_pos: 1.9,
    z_pos: 0.5,
  },
  {
    class: "10",
    specific: "3.B",
    x_pos: 3.4,
    y_pos: 1.9,
    z_pos: 0.5,
  },
  {
    class: "11",
    specific: "Kabinet_MAT_INF",
    x_pos: 2.45,
    y_pos: 1.9,
    z_pos: 0.5,
  },
  {
    class: "12",
    specific: "Žiacka_rada",
    x_pos: 1.75001,
    y_pos: 2,
    z_pos: 0.5,
  },
  {
    class: "54",
    specific: "Telocvičňa",
    x_pos: 0,
    y_pos: -3,
    z_pos: 0.5,
  },
  {
    class: "14",
    specific: "Kabinet_SJL",
    x_pos: 1.05,
    y_pos: 1.65,
    z_pos: 0.5,
  },
  {
    class: "5",
    specific: "Jedáleň",
    x_pos: 8.5,
    y_pos: 1.4,
    z_pos: 0.5,
  },
  {
    class: "53",
    specific: "Šatňa_1",
    x_pos: -0.5,
    y_pos: -1.75,
    z_pos: 0.5,
  },
  {
    class: "55",
    specific: "Šatňa_2",
    x_pos: 0.5,
    y_pos: -1.75,
    z_pos: 0.5,
  },
  {
    class: "56",
    specific: "Kabinet_TEV",
    x_pos: 0.49,
    y_pos: -0.9,
    z_pos: 0.5,
  },
  {
    class: "59",
    specific: "WC_Muži",
    x_pos: 0.55,
    y_pos: 0.25,
    z_pos: 0.5,
  },
  {
    class: "17",
    specific: "Psychologička",
    x_pos: -0.51,
    y_pos: 2.4,
    z_pos: 0.5,
  },
  {
    class: "18",
    specific: "Knižnica",
    x_pos: -1.7501,
    y_pos: 2.1,
    z_pos: 0.5,
  },
  {
    class: "20",
    specific: "IB_1",
    x_pos: -3,
    y_pos: 2,
    z_pos: 0.5,
  },
  {
    class: "21",
    specific: "INF_3",
    x_pos: -4,
    y_pos: 2,
    z_pos: 0.5,
  },
  {
    class: "22",
    specific: "Kabinet_ANJ",
    x_pos: -4.801,
    y_pos: 2,
    z_pos: 0.5,
  },
  {
    class: "23",
    specific: "MMU_Multimediálna_učebňa",
    x_pos: -6,
    y_pos: 2,
    z_pos: 0.5,
  },
  {
    class: "24",
    specific: "Kabinet_ANJ_2",
    x_pos: -7.2,
    y_pos: 2,
    z_pos: 0.5,
  },
  {
    class: "26",
    specific: "Ateliér",
    x_pos: -7.9,
    y_pos: 2,
    z_pos: 0.5,
  },
  {
    class: "28",
    specific: "Študovňa",
    x_pos: -8.6,
    y_pos: 1.6,
    z_pos: 0.5,
  },
  {
    class: "29",
    specific: "INF_1_Caffe",
    x_pos: -8.9,
    y_pos: 0.8,
    z_pos: 0.5,
  },
  {
    class: "32",
    specific: "4.B",
    x_pos: -8.9,
    y_pos: -0.2,
    z_pos: 0.5,
  },
  {
    class: "33",
    specific: "Kabinet_INF",
    x_pos: -8.90001,
    y_pos: -1.25,
    z_pos: 0.5,
  },
  {
    class: "33.A",
    specific: "Kabinet_INF_A",
    x_pos: -8.90011,
    y_pos: -1.75,
    z_pos: 0.5,
  },
  {
    class: "34",
    specific: "INF_2",
    x_pos: -8.90111,
    y_pos: -2.5,
    z_pos: 0.5,
  },
  {
    class: "35",
    specific: "4.A",
    x_pos: -8.90101,
    y_pos: -3.52,
    z_pos: 0.5,
  },
  {
    class: "36",
    specific: "4.E",
    x_pos: -8.901101,
    y_pos: -5,
    z_pos: 0.5,
  },
  {
    class: "37",
    specific: "Rezerva",
    x_pos: -8.901111,
    y_pos: -6.45,
    z_pos: 0.5,
  },
  {
    class: "39",
    specific: "WC_Muži",
    x_pos: -7.5,
    y_pos: -5.37,
    z_pos: 0.5,
  },
  {
    class: "42",
    specific: "WC_Ženy",
    x_pos: -7.51,
    y_pos: -4.42,
    z_pos: 0.5,
  },
];
let room_1 = room;
function rooms() {
  if (picked_floor === 1) {
    room = room_1;
  }
  if (picked_floor === 2) {
    room = room_2;
  }
  if (picked_floor === 3) {
    room = room_3;
  }
  if ((document.querySelector("#search") && document.querySelector("#search").value && found === false)||picked_floor===0 ){
    room = room_1.concat(room_2).concat(room_3);
    
  }
  console.log(room);
  for (var x = 0; x < room.length; x++) {
    room_id[x] = new Object();
  }
  const geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
  const material = new THREE.MeshBasicMaterial({ color: "#ff1654" });
  material.alphaTest = 0.5;
  for (var i = 0; i < room.length; i++) {
    room_id[i] = new THREE.Mesh(geometry, material);

    room_id[i].position.x = room[i].x_pos;
    room_id[i].position.z = room[i].y_pos;
    room_id[i].position.y = room[i].z_pos;
    scene.add(room_id[i]);
  }
}

function init() {
  scene.background = new THREE.Color("#58668b");
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
  
  if (mobile === false) {
    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("click", onClick);
    document.querySelector("#button1").addEventListener("click", btn1);
    document.querySelector("#button2").addEventListener("click", btn2);
    document.querySelector("#button3").addEventListener("click", btn3);
    document.querySelector("#search").addEventListener("input", search);
    document.querySelector("#search").addEventListener("click", search);
    document.querySelector("#search").addEventListener("keypress", search);
    
  }
  if (mobile === true) {
    document.addEventListener("touchstart", onTouch, { passive: false });
    document.addEventListener("touchstart", select, { passive: false });
    document.querySelector("#button1").addEventListener("touchstart", btn1);
    document.querySelector("#button2").addEventListener("touchstart", btn2);
    document.querySelector("#button3").addEventListener("touchstart", btn3);
    document.querySelector("#search").addEventListener("keyup", search);
    document.querySelector("#search").addEventListener("touchstart", search);
  }
}

function setLight() {
  const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene.add( light );

}

function loadGLTF() {

  Loader.load("./Prizemie.gltf", (gltf) => {
    Floor = gltf.scene;
    Floor.scale.set(12, 15, 12);

    scene.add(Floor);
  });
  Loader.load("./PrvePoschodie.gltf", (gltf) => {
    Floor2 = gltf.scene;
    Floor2.scale.set(12, 15, 12);

    scene.add(Floor2);
  });
  Loader.load("./DruhePoschodie.gltf", (gltf) => {
    Floor3 = gltf.scene;
    Floor3.scale.set(12, 15, 12);

    scene.add(Floor3);
  });
}
const clock = new THREE.Clock();

function animate() {
  if(mixer)
  {mixer.update(clock.getDelta())};
  
  requestAnimationFrame(animate);
  var content = document.querySelector("#search").value;
  let searchFilter = document.getElementById("searchFilter")
  content = content.toLowerCase();
  if (content == "") {
    searchFilter.style.display = "none";
    searchFilter.innerText ="";
  }
      
if(room_id.length>0)
  {for (var i = 0; i < room.length; i++) {
    room_id[i].rotation.y += 0.02;
  }
  if (mobile === false) {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(room_id, false);

    for (let j = 0; j < room_id.length; j++) {
      if (room_id[j].material) {
        room_id[j].material.opacity = 1;
        room_id[j].material.transparent = false;
      }
    }
    if (intersects.length > 0) {
      const newMaterial = intersects[0].object.material.clone();
      newMaterial.transparent = true;
      newMaterial.opacity = 0.5;
      newMaterial.alphaTest = 0.5;
      intersects[0].object.material = newMaterial;
    }
  }}
  
  renderer.render(scene, camera);
}

init();
setLight();
loadGLTF();
rooms();
animate();
