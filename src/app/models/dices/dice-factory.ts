import * as THREE from 'three';

export class DiceFactory {

  private static addCircle(
    posX: number,
    posY: number,
    posZ: number,
    rotation: number,
    rotationAxis: string,
    dice: THREE.Group,
    color: number
  ) {
    const circleMaterial = new THREE.MeshPhongMaterial( { color } );
    const circle = new THREE.CircleGeometry( 0.1, 12 );
    const circleMesh = new THREE.Mesh( circle, circleMaterial );

    circleMesh.rotation[rotationAxis] = rotation;
    circleMesh.position.set(posX, posY, posZ);
    circleMesh.castShadow = true;
    circleMesh.receiveShadow = true;
    dice.add(circleMesh);
  }

  public static createDice(color: number): THREE.Group {
    const dice = new THREE.Group();
    const circleDispl = 0.25;
    const faceDist = 0.51;

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshPhongMaterial( { color } );
    const box = new THREE.Mesh( geometry, material );
    box.castShadow = true;
    box.receiveShadow = true;
    dice.add(box);

    let diceColor = 0xffffff;
    if (color === 0xffffff) {
      diceColor = 0x000000;
    }

    // 1
    this.addCircle(0, 0, faceDist, 0, 'x', dice, diceColor);

    // 2
    this.addCircle(faceDist, circleDispl, circleDispl, Math.PI / 2, 'y', dice, diceColor);
    this.addCircle(faceDist, -circleDispl, -circleDispl, Math.PI / 2, 'y', dice, diceColor);

    // 3
    this.addCircle( circleDispl, faceDist, circleDispl, 3 * Math.PI / 2, 'x', dice, diceColor);
    this.addCircle( -circleDispl, faceDist, -circleDispl, 3 * Math.PI / 2, 'x', dice, diceColor);
    this.addCircle( 0, faceDist, 0, 3 * Math.PI / 2, 'x', dice, diceColor);

    // 4
    this.addCircle( circleDispl, -faceDist, circleDispl, Math.PI / 2, 'x', dice, diceColor);
    this.addCircle( -circleDispl, -faceDist, circleDispl, Math.PI / 2, 'x', dice, diceColor);
    this.addCircle( circleDispl, -faceDist, -circleDispl, Math.PI / 2, 'x', dice, diceColor);
    this.addCircle( -circleDispl, -faceDist, -circleDispl, Math.PI / 2, 'x', dice, diceColor);

    // 5
    this.addCircle(-faceDist, circleDispl, circleDispl, 3 * Math.PI / 2, 'y', dice, diceColor);
    this.addCircle(-faceDist, -circleDispl, circleDispl, 3 * Math.PI / 2, 'y', dice, diceColor);
    this.addCircle(-faceDist, circleDispl, -circleDispl, 3 * Math.PI / 2, 'y', dice, diceColor);
    this.addCircle(-faceDist, -circleDispl, -circleDispl, 3 * Math.PI / 2, 'y', dice, diceColor);
    this.addCircle(-faceDist, 0, 0, 3 * Math.PI / 2, 'y', dice, diceColor);

    // 6
    this.addCircle(circleDispl, circleDispl, -faceDist, Math.PI, 'y', dice, diceColor);
    this.addCircle(0, circleDispl, -faceDist, Math.PI, 'y', dice, diceColor);
    this.addCircle(-circleDispl, circleDispl, -faceDist, Math.PI, 'y', dice, diceColor);
    this.addCircle(circleDispl, -circleDispl, -faceDist, Math.PI, 'y', dice, diceColor);
    this.addCircle(0, -circleDispl, -faceDist, Math.PI, 'y', dice, diceColor);
    this.addCircle(-circleDispl, -circleDispl, -faceDist, Math.PI, 'y', dice, diceColor);

    return dice;
  }
}
