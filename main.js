//Import Three!
import * as THREE from "three";
//First set up a scene, imagine this like a movie set. you have your cameras, lights, background, and actors

//Scene
const Scene = new THREE.Scene();

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

//Now add a camera so we can see!

//Camera
//there are many types of camera, perspective camera is popular and a good start
//Camera params: first arg is field of view, not recommended going above 50 or you get distortion like fish eye.
//Second & third are aspect ratio 800 600 are safe but you will update this
const camera = new THREE.PerspectiveCamera(45, 800, 600);
//add your camera to the scene
scene.add(camera);

// now - add a canvas to you html <canvas class=""></canvas>
