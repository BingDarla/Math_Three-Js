//Renderer - Visual display of data
//Scene -Data(what shapes, what color, etc)
//Lights
//Cameras
//Mesh( Geometry + Material ===Shapes)


let sphere = null;
let controls = null;
let gui = null;
let point = null;
let step = 0;

const renderer  = new THREE.WebGLRenderer({
  antialias: true
});
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio || 1);

// console.log(renderer);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = -30;   //left=> right
camera.position.y = 40;     //top=>bottom
camera.position.z = 30;   //behind ->infront

camera.lookAt(scene.position);
//When we add new before the creation of a function
//It does two things for us in regards to the keyword 'this':
//1.It sets 'this' to a new empty object
//2.Automatically returns the keyword 'this' (this empty object)
//prettier-ignore
const controller = new function(){
  this.division= 1;
  // this.rotationSpeedY = 0.02;
  // this.rotationSpeedZ = 0.02;
}

const animate = ()=>{
  // step += controller.bouncingSpeed;
 removeSphere();
 console.log('something happened');

 addSphere();
  // cube.rotation.y+=controller.rotationSpeed;
  // cube.rotation.z+=controller.rotationSpeed;

  // const currentX = cube.position.x;
  // cube.position.x = step;
  // cube.position.y = step;
  // cube.position.z = step;
  //change the position of meshes
  //Change the rotation of meshes
  //Rerender the renderer (using the scene and the camera)
  renderer.render(scene, camera);
  //Showing the user the updated scene
  requestAnimationFrame(animate);

}

const addAxes = ()=>{
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);
};
const addPointLight = ()=>{
  const pointLight = new THREE.PointLight(0xffff0f);
  pointLight.position.set(-40,60,20);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;

  scene.add(pointLight);
};

// SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
// radius — sphere radius. Default is 1.
// widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
// heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
// phiStart — specify horizontal starting angle. Default is 0.
// phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
// thetaStart — specify vertical starting angle. Default is 0.
// thetaLength — specify vertical sweep angle size. Default is Math.PI.
const addSphere = ()=>{
  let sphereGeometry = new THREE.SphereGeometry (15,40,40,0,2*Math.PI/controller.division);
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color:0x039be5,
    // wireframe:true
  });
  sphereMaterial.side = THREE.DoubleSide;
  sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
  sphere.name = "test";
  sphere.position.x = 0;  //Left to right
  sphere.position.y = 0;    //top to bottom
  sphere.position.z = 0;   //Near or far
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add(sphere);
  console.log(`The current devide is ${controller.division}`);
  console.log('sphere is added');
}
const removeSphere =()=>{
  let selectedSphere = scene.getObjectByName('test');
  scene.remove(selectedSphere);
  console.log('sphere is removed');
}



const init = ()=> {
  //Interact with the renderer (change size, background)
  renderer.setClearColor(0xeceff1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //Create some basic meshes
  //Add them into the Scene
  //Put the renderer on the page
  addAxes();
  addSphere();
  addPointLight();
  removeSphere();

  //Make sure call the function before render
  //Re-render the renderer Use the renderer, pass in a scene and a camera

  gui = new dat.GUI();
  gui.add(controller, "division",1,10);
  // gui.add(controller, "bouncingSpeed",0,5);


  controls = new THREE.OrbitControls(camera, renderer.domElement);


  renderer.render(scene,camera);
  document.querySelector('#output').appendChild(renderer.domElement);
  animate(); //Re-render the scene and update the shapes as soon as they can
};

window.onload = init();
const onResize = ()=>{
  //Change the aspect ratio of the Camera
  camera.aspect = window.innerWidth / window.innerHeight;
  //Update the shapes and their positions
  camera.updateProjectionMatrix();
  //Update the size of the renderer itself
  renderer.setSize(window.innerWidth,window.innerHeight);
};
window.addEventListener("resize", onResize);
