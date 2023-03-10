//Import Three!
import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

//First set up a scene, imagine this like a movie set. you have your cameras, lights, background, and actors

//Scene
const scene = new THREE.Scene();

//Create our sphere

const geometry = new THREE.SphereGeometry(3, 64, 64); //3 is the radius (size) 64 and 64 are the segments width and height segments

//material is how it looks, MeshStandardMaterial is how it sounds, standard mat. However, add an obj inside the argument and add you augmentations. MeshStandardMaterial( {...} )
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5, //shiny bowling ball look
});

//Mesh is the combination of geometry and material, so shape and the way it looks
const mesh = new THREE.Mesh(geometry, material); // 'mesh' it together
//Now add to the scene and pass in the mesh
scene.add(mesh);

//Sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// now lets add some lights and camera so we can see!

//Light

//point light is an easy go to, first arg is a color
const light = new THREE.PointLight(0xffffff, 1, 100);
// position, basically x y z position - and + for x and y (left and right) z is in and outwards
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);

//Camera
//there are many types of camera, perspective camera is popular and a good start
//Camera params: first arg is field of view, not recommended going above 50 or you get distortion like fish eye.
//Second & third are aspect ratio 800 600 are safe but you will update this
// 4th and 5th, this sets a clipping point, closest you can see to farthest you can see
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
//add camera position so scene and camera are not in the same place
//updating the position will zoom in and out until clips or goes away - params set in camera arg
camera.position.z = 20;

//add your camera to the scene
scene.add(camera);

// now - add a canvas to you html <canvas class="webgl"></canvas>

//Renderer
const canvas = document.querySelector(".webgl"); //canvas class
const renderer = new THREE.WebGL1Renderer({ canvas });

// now define how big your canvas will be and how it will render out
renderer.setSize(sizes.width, sizes.height); // this is your aspect ratio
//now lets render the scene and camera
renderer.setPixelRatio(2); //makes the px nicer
renderer.render(scene, camera);
// note: at this point, there is only a black scene the camera and scene are on top of each other. Add camera position under camera

// lets make it fit the whole screen, jump up to 'sizes' ** you can now change you aspect ratio previously 800 / 600 with this variable of width and height *window

const controls = new OrbitControls(camera, canvas);
//add some damping - better movement when dragging responsive to how fast or slow / physics
controls.enableDamping = true;
//this is a website so lets disable zoom and such
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
//Resize
window.addEventListener("resize", () => {
  //update sizes for responsive behavior
  //this code will run every time you adjust the screen size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //Update Camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height); // these are the two we always need to update and make sure they are in sync
});
//we need this camera constantly re-rendering when we resize to avoid smashing our object, lets make a render loop
const loop = () => {
  // mesh.position.x += 0.2; you could add an animation here if you'd like .position .rotation light etc *going to use gsap
  controls.update(); //keeps moving when you let go
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

//now lets add some orbital controls *import from THREE, see Controls above

//Timeline Magic Gsap, here we can sync multiple animations

const tl = gsap.timeline({ defaults: { duration: 1 } }); //default 1 second
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 }); //fade in animation, make sure everything scales at the same time
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

//Mouse Animation Color

let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true)),
  window.addEventListener("mouseup", () => (mouseDown = false)),
  window.addEventListener("mousemove", (e) => {
    if (mouseDown) {
      rgb = [
        Math.round((e.pageX / sizes.width) * 255),
        Math.round((e.pageY / sizes.height) * 255),
        150,
      ]; //this give you a value between 0 and 255 when you move your mouse along the x axis
      //animate it
      console.log(rgb);

      let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
      gsap.to(mesh.material.color, {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
      });
    }
  });
