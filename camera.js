import {Vector2, Vector3} from "three";

let movementSpeed = 1;
let rotationSpeed = 1/175;

let keysDown = {}

let rotation = new Vector2(0,0);
let mouseDelta = new Vector2(0,0);

function moveCamera() {
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

function rotateCamera() {
    rotation.x -= mouseDelta.x * rotationSpeed;
    rotation.y -= mouseDelta.y * rotationSpeed;

    rotation.y = Math.max(-1.39, Math.min(1.4, rotation.y));

    let cameraRotation = new Vector3(rotation.y, rotation.x, 0);

    camera.rotation.setFromVector3(cameraRotation);
}

export function updateCamera(keys, mDelt) {
    keysDown = keys;
    mouseDelta = mDelt;

    moveCamera();
    rotateCamera();

}