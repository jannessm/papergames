import { DiceFactory } from './dice-factory';

import * as THREE from 'three';
import * as CANNON from 'cannon';

export class Dice {

  id: string;

  mesh: THREE.Group;
  body: CANNON.Body;

  lastPosition = new CANNON.Vec3(0, 0, 0);
  animationFinished = false;

  constructor(id: string, color: number) {
    this.id = id;

    this.mesh = DiceFactory.createDice(color);
    this.body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    });
    this.body.angularDamping = 0.3;
  }

  setPosition(x: number, y: number, z: number) {
    this.body.position.set(x, y, z);
    this.body.angularVelocity.set(Math.random() * 5 + 5, Math.random() * 5 + 5, Math.random() * 5 + 5);
    // this.mesh.rotation.x = 1.570913373489384;
    // this.mesh.rotation.y = 0.8540523740586278;
    // this.mesh.rotation.z = 3.141505945343613;
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

  private eq(segment: number, rotation: number): boolean {
    if (segment === 0) {
      return (rotation <= 1.0 * Math.PI / 4.0 || rotation > 7.0 * Math.PI / 4.0);
    } else {
      return rotation >= (segment * 2.0 - 1.0) * Math.PI / 4.0 && rotation < (segment * 2.0 + 1.0) * Math.PI / 4.0;
    }
  }

  getNumber(): number {
    const rotX = Math.abs((this.mesh.rotation.x + Math.PI * 2) % (Math.PI * 2.));
    const rotY = Math.abs((this.mesh.rotation.y + Math.PI * 2) % (Math.PI * 2.));
    const rotZ = Math.abs((this.mesh.rotation.z + Math.PI * 2) % (Math.PI * 2.));

    let score = 0;

    if (
      (this.eq(0, rotX) && this.eq(0, rotY)) ||
      (this.eq(2, rotX) && this.eq(2, rotY))
    ) {
      score = 1;
    } else if (
      (this.eq(1, rotX) && this.eq(1, rotZ)) || // around 1, ?, 1
      (this.eq(3, rotX) && this.eq(3, rotZ)) || // around 3, ?, 3
      (this.eq(0, rotX) && this.eq(1, rotZ) && this.eq(2, rotZ)) || // around 0, 1, 2
      (this.eq(2, rotX) && this.eq(1, rotZ) && this.eq(0, rotZ)) || // around 2, 1, 0
      (this.eq(0, rotX) && this.eq(3, rotZ) && this.eq(0, rotZ)) || // around 0, 3, 0
      (this.eq(2, rotX) && this.eq(3, rotZ) && this.eq(2, rotZ)) // around 2, 3, 2
    ) {
      score = 2;
    } else if (
      (this.eq(1, rotX) && this.eq(0, rotZ)) || // around 1, ?, 0
      (this.eq(3, rotX) && this.eq(2, rotZ)) || // around 3, ?, 2
      (this.eq(0, rotX) && this.eq(1, rotZ) && this.eq(1, rotZ)) || // around 0, 1, 1
      (this.eq(0, rotX) && this.eq(3, rotZ) && this.eq(3, rotZ)) || // around 0, 3, 3
      (this.eq(2, rotX) && this.eq(1, rotZ) && this.eq(3, rotZ)) || // around 2, 1, 3
      (this.eq(2, rotX) && this.eq(3, rotZ) && this.eq(1, rotZ)) // around 2, 3, 1
    ) {
      score = 3;
    } else if (
      (this.eq(1, rotX) && this.eq(2, rotZ)) || // around 1, ?, 2
      (this.eq(3, rotX) && this.eq(0, rotZ)) || // around 3, ?, 0
      (this.eq(0, rotX) && this.eq(1, rotZ) && this.eq(3, rotZ)) || // around 0, 1, 3
      (this.eq(0, rotX) && this.eq(3, rotZ) && this.eq(1, rotZ)) || // around 0, 3, 1
      (this.eq(2, rotX) && this.eq(1, rotZ) && this.eq(1, rotZ)) || // around 2, 1, 1
      (this.eq(2, rotX) && this.eq(3, rotZ) && this.eq(3, rotZ)) // around 2, 3, 3
    ) {
      score = 4;
    } else if (
      (this.eq(1, rotX) && this.eq(3, rotZ)) || // around 1, ?, 3
      (this.eq(3, rotX) && this.eq(1, rotZ)) || // around 3, ?, 1
      (this.eq(0, rotX) && this.eq(1, rotZ) && this.eq(0, rotZ)) || // around 0, 1, 0
      (this.eq(0, rotX) && this.eq(3, rotZ) && this.eq(2, rotZ)) || // around 0, 3, 2
      (this.eq(2, rotX) && this.eq(1, rotZ) && this.eq(2, rotZ)) || // around 2, 1, 2
      (this.eq(2, rotX) && this.eq(3, rotZ) && this.eq(0, rotZ)) // around 2, 3, 0
    ) {
      score = 5;
    } else if (
      (this.eq(0, rotX) && this.eq(2, rotY)) ||
      (this.eq(2, rotX) && this.eq(0, rotY))
    ) {
      score = 6;
    }

    console.log(this.id, score);
    return score;
  }
}
