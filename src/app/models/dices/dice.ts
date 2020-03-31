import { DiceFactory } from './dice-factory';

import * as THREE from 'three';
import * as CANNON from 'cannon';

export class Dice {

  id: string;

  mesh: THREE.Group;
  body: CANNON.Body;
  faces: THREE.Mesh[];

  lastPosition = new CANNON.Vec3(0, 0, 0);
  animationFinished = false;

  constructor(id: string, color: number) {
    this.id = id;

    const diceAndFaces = DiceFactory.createDice(color);
    this.mesh = diceAndFaces.dice;
    this.faces = diceAndFaces.faces;
    this.body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    });
    this.body.angularDamping = 0.3;
  }

  setPosition(x: number, y: number, z: number) {
    this.body.position.set(x, y, z);
    this.body.angularVelocity.set(Math.random() * 5 + 3, Math.random() * 5 + 3, Math.random() * 5 + 3);
    this.updateMesh();
    this.animationFinished = false;
  }

  updateMesh() {
    if (this.animationFinished) {
      return;
    }

    if (this.lastPosition && this.lastPosition.vsub(this.body.position).norm() < 0.0001) {
      this.getNumber();
      this.animationFinished = true;
    }

    this.mesh.position.set(
      this.body.position.x,
      this.body.position.y,
      this.body.position.z,
    );
    this.mesh.quaternion.set(
      this.body.quaternion.x,
      this.body.quaternion.y,
      this.body.quaternion.z,
      this.body.quaternion.w,
    );

    this.lastPosition.copy(this.body.position);
  }

  getNumber(): number {
    let highestZ = -1;
    const highestFace = this.faces.reduce((id, face, i) => {
      // get world position
      const worldPos = new THREE.Vector3();
      face.getWorldPosition(worldPos);

      // compare z positions
      if (worldPos.z > highestZ) {
        highestZ = worldPos.z;
        return i;
      }
      return id;
    }, -1);

    console.log(this.id, highestFace + 1);
    return highestFace + 1;
  }
}
