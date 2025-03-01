import * as THREE from 'three';
import { Camera } from './camera.js'; 
import { output } from './errors.js';


let scene, camera, raycaster, renderer, mouse;
let plane, objects = [];
let keysDown = {}
let mouseDelta = new THREE.Vector2(0,0);

init();
animate();

function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new Camera();
    
    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    scene.add(light);

    // Ground Plane
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x777777, side: THREE.DoubleSide });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Raycaster & Mouse
    raycaster = new THREE.Raycaster(camera.position);
    mouse = new THREE.Vector2();
    
    //Listen to click
    window.addEventListener('click', onMouseClick, false)

    window.addEventListener('mousemove', (event) => {
      if (event.buttons === 2) {
        mouseDelta.x = event.movementX;
        mouseDelta.y = event.movementY;
      }
      
    });
      

    //Listen for keys being pressed/released
    window.addEventListener('keydown', (event) => {
        keysDown[event.key] = true;
      });

      window.addEventListener('keyup', (event) => {
        keysDown[event.key] = false;
      });


    // Resize event
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  let camera = camera.getCameraObject();
  camera.aspect = window.innerWidth / window.innerHeight; 
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Handle mouse click to place a cube
function onMouseClick(event) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycasting
  //  raycaster.setFromCamera(mouse, camera);
  //  const intersects = raycaster.intersectObject(plane);

 //   if (intersects.length > 0) {
  //      const point = intersects[0].point;
 //       addCube(point.x, point.y, point.z);
//    }

    addCube(camera.castRay());
    
}

// Function to add a cube
function addCube(finalPosition) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    

    output(`Cube Position: ${Math.round(finalPosition.x / 2) * 2}, 1, ${Math.round(finalPosition.z / 2) * 2}`);
    cube.position.set(Math.round(finalPosition.x / 2) * 2, 1, Math.round(finalPosition.z / 2) * 2);
    scene.add(cube);
    objects.push(cube);
}

// Animation loop
function animate() {

    requestAnimationFrame(animate);

    camera.updateCamera(keysDown, mouseDelta);
    mouseDelta = new THREE.Vector2(0,0)

    renderer.render(scene, camera.getCameraObject());
}

