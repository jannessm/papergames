import * as THREE from 'three';

export enum POS {
  TOP = 0.8,
  CENTER = 0,
  BOTTOM = -0.8,
}

export const DICE_FACE = {
  FRONT: new THREE.Vector3(1, 0, 0),
  TOP: new THREE.Vector3(0, 1, 0),
  LEFT: new THREE.Vector3(0, 0, 1),
  BACK: new THREE.Vector3(-1, 0, 0),
  BOTTOM: new THREE.Vector3(0, -1, 0),
  RIGHT: new THREE.Vector3(0, 0, -1),
};

export interface FACE {
  posVecX: THREE.Vector3;
  posVecY: THREE.Vector3;
  generalVec: THREE.Vector3;
}
