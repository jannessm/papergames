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
    this.mesh.name = id;
    this.faces = diceAndFaces.faces;
    this.body = new CANNON.Body({
      mass: 100,
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
    });
    this.body.angularDamping = 0.5;
  }

  reset() {
    this.body.position.set(Math.random() * 8 - 4,  Math.random() * 8 - 4, 5);

    // random start position
    const initScore = Math.ceil(Math.random() * 6);
    // 1 do nothing
    if (initScore === 2) {
      this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
      this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 2), Math.PI / 2);
    } else if (initScore === 3) {
      this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
      this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI / 2);
    } else if (initScore === 4) {
      this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(3, 0, 0), Math.PI / 2);
    } else if (initScore === 5) {
      this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
    } else if (initScore === 6) {
      this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 2, 0), Math.PI / 2);
    }

    // random angular speed
    const randX = Math.random() > 0.5 ? Math.random() * 5 + 5 : Math.random() * (-5) - 5;
    const randY = Math.random() > 0.5 ? Math.random() * 5 + 5 : Math.random() * (-5) - 5;
    const randZ = Math.random() > 0.5 ? Math.random() * 5 + 5 : Math.random() * (-5) - 5;
    this.body.angularVelocity.set(randX, randY, randZ);

    this.updateMesh();
    this.animationFinished = false;
  }

  updateMesh() {
    if (this.animationFinished) {
      return;
    }

    if (this.lastPosition && this.lastPosition.vsub(this.body.position).norm() < 0.0001) {
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

    return highestFace + 1;
  }
}
