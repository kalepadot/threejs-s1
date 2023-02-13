import * as THREE from "three";

//Scene
const Scene = new THREE.Scene();

//Create our sphere

const geometry = new THREE.SphereGeometry(3, 64, 64); //3 is the radius (size) 64 and 64 are the segments width and height segments

//material is how it looks, MeshStandardMaterial is how it sounds, standard mat. However, add an obj inside the argument and add you augmentations. MeshStandardMaterial( {...} )
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
