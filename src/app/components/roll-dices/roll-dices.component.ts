import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import {DICE_FACE, POS} from 'src/app/models/dices/orientations';
import * as THREE from 'three';
import {Ammo} from 'ammo.js';

@Component({
  selector: 'app-roll-dices',
  templateUrl: './roll-dices.component.html',
  styleUrls: ['./roll-dices.component.scss']
})
export class RollDicesComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  physics: Ammo;

  dice: THREE.Group;

  movementX = 0.01;
  movementY = 0.01;

  constructor() { }

  ngAfterViewInit(): void {
    const aspectRatio = this.canvas.nativeElement.width / this.canvas.nativeElement.height;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x666666 );

    // this.physics = new CannonPhysics();

    const hemLight = new THREE.HemisphereLight();
    hemLight.intensity = 0.35;
    this.scene.add( hemLight );

    const dirLight = new THREE.DirectionalLight();
    dirLight.position.set( 0, 5, 5 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.zoom = 2;
    this.scene.add( dirLight );

    this.camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 1000 );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
      // alpha: true
    });

    this.renderer.setSize( window.innerWidth, window.innerHeight );

    const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );

    this.dice = this.createDice(material);
    this.scene.add( this.dice );

    // add coordinate system
    const materialx = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    const materialy = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
    const materialz = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    let points = [];
    points.push( new THREE.Vector3( -100, 0, 0 ) );
    points.push( new THREE.Vector3( 100, 0, 0 ) );
    const linexbuf = new THREE.BufferGeometry().setFromPoints( points );
    const linex = new THREE.Line( linexbuf, materialx );

    points = [];
    points.push( new THREE.Vector3( 0, -100, 0 ) );
    points.push( new THREE.Vector3( 0, 100, 0 ) );
    const lineybuf = new THREE.BufferGeometry().setFromPoints( points );
    const liney = new THREE.Line( lineybuf, materialy );

    points = [];
    points.push( new THREE.Vector3( 0, 0, -100 ) );
    points.push( new THREE.Vector3( 0, 0, 100 ) );
    const linezbuf = new THREE.BufferGeometry().setFromPoints( points );
    const linez = new THREE.Line( linezbuf, materialz );

    this.scene.add(linex, liney, linez);

    const plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( 5, 5 ),
      new THREE.ShadowMaterial( { color: 0x111111 } )
    );
    plane.rotation.x = - Math.PI / 2;
    plane.receiveShadow = true;
    this.scene.add( plane );
    // this.physics.addMesh( plane );

    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);

    this.animate();
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) );

    // if (this.camera.position.x > 10) {
    //   this.movementX = -0.1;
    //   this.camera.position.z = 10;
    // } else if (this.camera.position.x < -10) {
    //   this.movementX = 0.1;
    //   this.camera.position.z = -10;
    // }
    // this.camera.position.x = (this.camera.position.x + this.movementX);

    // if (this.camera.position.y > 10) {
    //   this.movementY = -0.1;
    // } else if (this.camera.position.y < -10) {
    //   this.movementY = 0.1;
    // }
    // this.camera.position.y = (this.camera.position.y + this.movementY);

    // this.camera.lookAt(0, 0, 0);

    this.dice.rotation.x += 0.01;
    this.dice.rotation.y += 0.01;

    this.renderer.render( this.scene, this.camera );
  }

  addCircle(posX: number, posY: number, posZ: number, rotation: number, rotationAxis: string, dice: THREE.Group) {
    const circleMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    const circle = new THREE.CircleGeometry( 0.1, 12 );
    const circleMesh = new THREE.Mesh( circle, circleMaterial );

    circleMesh.rotation[rotationAxis] = rotation;
    circleMesh.position.set(posX, posY, posZ);
    circleMesh.castShadow = true;
    circleMesh.receiveShadow = true;
    dice.add(circleMesh);
  }

  createDice(material: THREE.Material): THREE.Group {
    const dice = new THREE.Group();
    const circleDispl = 0.25;
    const faceDist = 0.51;

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const box = new THREE.Mesh( geometry, material );
    box.castShadow = true;
    box.receiveShadow = true;
    dice.add(box);

    // 1
    this.addCircle(0, 0, faceDist, 0, 'x', dice);

    // 2
    this.addCircle(faceDist, circleDispl, circleDispl, Math.PI / 2, 'y', dice);
    this.addCircle(faceDist, -circleDispl, -circleDispl, Math.PI / 2, 'y', dice);

    // 3
    this.addCircle( circleDispl, faceDist, circleDispl, 3 * Math.PI / 2, 'x', dice);
    this.addCircle( -circleDispl, faceDist, -circleDispl, 3 * Math.PI / 2, 'x', dice);
    this.addCircle( 0, faceDist, 0, 3 * Math.PI / 2, 'x', dice);

    // 4
    this.addCircle( circleDispl, -faceDist, circleDispl, Math.PI / 2, 'x', dice);
    this.addCircle( -circleDispl, -faceDist, circleDispl, Math.PI / 2, 'x', dice);
    this.addCircle( circleDispl, -faceDist, -circleDispl, Math.PI / 2, 'x', dice);
    this.addCircle( -circleDispl, -faceDist, -circleDispl, Math.PI / 2, 'x', dice);

    // 5
    this.addCircle(-faceDist, circleDispl, circleDispl, 3 * Math.PI / 2, 'y', dice);
    this.addCircle(-faceDist, -circleDispl, circleDispl, 3 * Math.PI / 2, 'y', dice);
    this.addCircle(-faceDist, circleDispl, -circleDispl, 3 * Math.PI / 2, 'y', dice);
    this.addCircle(-faceDist, -circleDispl, -circleDispl, 3 * Math.PI / 2, 'y', dice);
    this.addCircle(-faceDist, 0, 0, 3 * Math.PI / 2, 'y', dice);

    // 6
    this.addCircle(circleDispl, circleDispl, -faceDist, Math.PI, 'y', dice);
    this.addCircle(0, circleDispl, -faceDist, Math.PI, 'y', dice);
    this.addCircle(-circleDispl, circleDispl, -faceDist, Math.PI, 'y', dice);
    this.addCircle(circleDispl, -circleDispl, -faceDist, Math.PI, 'y', dice);
    this.addCircle(0, -circleDispl, -faceDist, Math.PI, 'y', dice);
    this.addCircle(-circleDispl, -circleDispl, -faceDist, Math.PI, 'y', dice);

    return dice;
  }

}
