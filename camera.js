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
    let camera = this.__cameraObject;
    let cameraRotation = camera.rotation;
    let cameraPosition = camera.position;

    let movementSpeed = this.__movementSpeed;
    let relativeDirection = new Vector3(0,0,0);


    if (keysDown['w']) {
      relativeDirection.z -= movementSpeed;
    }
    if (keysDown['s']) {
      relativeDirection.z += movementSpeed;
    }
    if (keysDown['a']) {
      relativeDirection.x -= movementSpeed;
    }
    if (keysDown['d']) {
      relativeDirection.x += movementSpeed;
    }
    if (keysDown['e']) {
      relativeDirection.y += movementSpeed;
    }
    if (keysDown['q']) {
      relativeDirection.y -= movementSpeed;
    }

    camera.position.add(relativeDirection.applyEuler(cameraRotation));
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

    let finalPos = new Vector3(position.x + rayLengthX, planeHeight, position.z + rayLengthZ)

    return finalPos
  }
  
 

  updateCamera(keys, mDelt) {
    keysDown = keys;
    mouseDelta = mDelt;

    this.__moveCamera();
    this.__rotateCamera();
  }

  getCameraObject() {
    return this.__cameraObject;
  }



  rayCastFromCamera() {
    
  }
}