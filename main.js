//Import Three!
import * as THREE from "three";
import "./style.css";
//First set up a scene, imagine this like a movie set. you have your cameras, lights, background, and actors

//Scene
const scene = new THREE.Scene();

//Create our sphere

const geometry = new THREE.SphereGeometry(3, 64, 64); //3 is the radius (size) 64 and 64 are the segments width and height segments

//material is how it looks, MeshStandardMaterial is how it sounds, standard mat. However, add an obj inside the argument and add you augmentations. MeshStandardMaterial( {...} )
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
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
renderer.render(scene, camera);
// note: at this point, there is only a black scene the camera and scene are on top of each other. Add camera position under camera

// lets make it fit the whole screen, jump up to 'sizes' ** you can now change you aspect ratio previously 800 / 600 with this variable of width and height *window

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
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
