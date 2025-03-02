import { Vector3 } from 'three';

//Returns a normalised vector (which is a vector with a magnitude of 1)

export function normaliseVector(vector) {
    let magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    return new Vector3(vector.x / magnitude, vector.y / magnitude, vector.z / magnitude);
}