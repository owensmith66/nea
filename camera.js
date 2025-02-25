import {Vector2, Vector3, PerspectiveCamera} from "three";

let keysDown = {}

let planeHeight = 0;

let rotation = new Vector2(0,0);
let mouseDelta = new Vector2(0,0);

export class Camera {
  constructor() {
    this.__cameraObject = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.__cameraObject.position.set(0, 10, 20);

    this.__movementSpeed = 1;
    this.__rotationSpeed = 1/175;
  }

  __moveCamera() {
    let camera = this.__cameraObject
    let movementSpeed = this.__movementSpeed;
    
    if (keysDown['w']) {
      camera.position.z -= movementSpeed;
    }
    if (keysDown['s']) {
      camera.position.z += movementSpeed;
    }
    if (keysDown['a']) {
      camera.position.x -= movementSpeed;
    }
    if (keysDown['d']) {
      camera.position.x += movementSpeed;
    }
  }

  __rotateCamera() {
    let camera = this.__cameraObject
    let rotationSpeed = this.__rotationSpeed;
    
      rotation.x -= mouseDelta.x * rotationSpeed;
      rotation.y -= mouseDelta.y * rotationSpeed;

      rotation.y = Math.max(-1.39, Math.min(1.4, rotation.y));

      let cameraRotation = new Vector3(rotation.y, rotation.x, 0);

      camera.rotation.setFromVector3(cameraRotation);
  }

  castRay() {
    let camera = this.__cameraObject
    let rotation = camera.rotation
    let position = camera.position

    let rayLengthY = position.y - planeHeight
    let rayDirectionX = Math.PI/2 - rotation.x
    let rayDirectionZ = Math.PI/2 - rotation.z
    
    let rayLengthX = rayLengthY*Math.sin(rayDirectionX)
    let rayLengthZ = rayLengthY*Math.sin(rayDirectionZ)

    finalPos = new Vector3(position.x + rayLengthX, planeHeight, position.z + rayLengthZ)

    return finalPos
  }
  
  updateCamera(keys, mDelt) {
    keysDown = keys;
    mouseDelta = mDelt;

    this.__moveCamera();
    this.__rotateCamera();
  }

  rayCastFromCamera() {
    
  }
}