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
  ): THREE.Mesh {
    const circleMaterial = new THREE.MeshPhongMaterial( { color } );
    const circle = new THREE.CircleGeometry( 0.1, 12 );
    const circleMesh = new THREE.Mesh( circle, circleMaterial );

    circleMesh.rotation[rotationAxis] = rotation;
    circleMesh.position.set(posX, posY, posZ);
    circleMesh.castShadow = true;
    circleMesh.receiveShadow = true;

    dice.add(circleMesh);
    return circleMesh;
  }

  public static createDice(color: number): {dice: THREE.Group; faces: THREE.Mesh[]} {
    const dice = new THREE.Group();
    const circleDispl = 0.25;
    const faceDist = 0.51;

    const faces: THREE.Mesh[] = [];

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshPhongMaterial( {
      color
    } );
    const box = new THREE.Mesh( geometry, material );
    box.castShadow = true;
    box.receiveShadow = true;
    dice.add(box);

    let circleColor = 0xffffff;
    if (color === 0xffffff || color === 0xe0e044) {
      circleColor = 0x000000;
    }

    // 1
    faces.push(this.addCircle(0, 0, faceDist, 0, 'x', dice, circleColor));

    // 2
    faces.push(
      this.addCircle(faceDist, 0, 0, Math.PI / 2, 'y', dice, color)
    );
    this.addCircle(faceDist, circleDispl, circleDispl, Math.PI / 2, 'y', dice, circleColor);
    this.addCircle(faceDist, -circleDispl, -circleDispl, Math.PI / 2, 'y', dice, circleColor);

    // 3
    faces.push(
      this.addCircle( 0, faceDist, 0, 3 * Math.PI / 2, 'x', dice, circleColor)
    );
    this.addCircle( circleDispl, faceDist, circleDispl, 3 * Math.PI / 2, 'x', dice, circleColor);
    this.addCircle( -circleDispl, faceDist, -circleDispl, 3 * Math.PI / 2, 'x', dice, circleColor);

    // 4
    faces.push(
      this.addCircle( 0, -faceDist, 0, Math.PI / 2, 'x', dice, color)
    );
    this.addCircle( circleDispl, -faceDist, circleDispl, Math.PI / 2, 'x', dice, circleColor);
    this.addCircle( -circleDispl, -faceDist, circleDispl, Math.PI / 2, 'x', dice, circleColor);
    this.addCircle( circleDispl, -faceDist, -circleDispl, Math.PI / 2, 'x', dice, circleColor);
    this.addCircle( -circleDispl, -faceDist, -circleDispl, Math.PI / 2, 'x', dice, circleColor);

    // 5
    faces.push(
      this.addCircle(-faceDist, 0, 0, 3 * Math.PI / 2, 'y', dice, circleColor)
    );
    this.addCircle(-faceDist, -circleDispl, circleDispl, 3 * Math.PI / 2, 'y', dice, circleColor);
    this.addCircle(-faceDist, circleDispl, -circleDispl, 3 * Math.PI / 2, 'y', dice, circleColor);
    this.addCircle(-faceDist, circleDispl, circleDispl, 3 * Math.PI / 2, 'y', dice, circleColor);
    this.addCircle(-faceDist, -circleDispl, -circleDispl, 3 * Math.PI / 2, 'y', dice, circleColor);

    // 6
    faces.push(
      this.addCircle(0, 0, -faceDist, Math.PI, 'y', dice, color)
    );
    this.addCircle(circleDispl, circleDispl, -faceDist, Math.PI, 'y', dice, circleColor);
    this.addCircle(0, circleDispl, -faceDist, Math.PI, 'y', dice, circleColor);
    this.addCircle(-circleDispl, circleDispl, -faceDist, Math.PI, 'y', dice, circleColor);
    this.addCircle(circleDispl, -circleDispl, -faceDist, Math.PI, 'y', dice, circleColor);
    this.addCircle(0, -circleDispl, -faceDist, Math.PI, 'y', dice, circleColor);
    this.addCircle(-circleDispl, -circleDispl, -faceDist, Math.PI, 'y', dice, circleColor);

    return {
      dice,
      faces
    };
  }
}
