import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as THREE from 'three';

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

  dice: THREE.Group;

  movementX = 0.01;
  movementY = 0.01;

  constructor() { }

  ngAfterViewInit(): void {
    const aspectRatio = this.canvas.nativeElement.width / this.canvas.nativeElement.height;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, aspectRatio, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
      // alpha: true
    });

    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

    this.dice = this.createDice(material, 0, 0, 0);
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

    const ground = new THREE.PlaneBufferGeometry( 10, 10 );
    const gmaterial = new THREE.MeshBasicMaterial( {color: 0x222222, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( ground, gmaterial );
    this.scene.add( plane );

    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);

    this.animate();
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) );

    if (this.camera.position.x > 10) {
      this.movementX = -0.1;
      this.camera.position.z = 10;
    } else if (this.camera.position.x < -10) {
      this.movementX = 0.1;
      this.camera.position.z = -10;
    }
    this.camera.position.x = (this.camera.position.x + this.movementX);

    if (this.camera.position.y > 10) {
      this.movementY = -0.1;
    } else if (this.camera.position.y < -10) {
      this.movementY = 0.1;
    }
    this.camera.position.y = (this.camera.position.y + this.movementY);

    this.camera.lookAt(0, 0, 0);

    this.renderer.render( this.scene, this.camera );
  }

  createDice(material: THREE.Material, x: number, y: number, z: number): THREE.Group {
    const circleMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    let circle;
    let circleMesh;
    const dice = new THREE.Group();

    const geometry = new THREE.BoxGeometry( 3, 3, 3 );
    const box = new THREE.Mesh( geometry, material );
    dice.add(box);

    // 1
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.position.set(0, 0, 1.51);
    dice.add(circleMesh);

    // 2
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = Math.PI / 2;
    circleMesh.position.set(1.51, 0.8, 0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = Math.PI / 2;
    circleMesh.position.set(1.51, -0.8, -0.8);
    dice.add(circleMesh);

    // 3
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.x = 3 * Math.PI / 2;
    circleMesh.position.set( 0.8, 1.51, 0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.x = 3 * Math.PI / 2;
    circleMesh.position.set(-0.8, 1.51, -0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.x = 3 * Math.PI / 2;
    circleMesh.position.set(0, 1.51, 0);
    dice.add(circleMesh);

    // 4
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.x = Math.PI / 2;
    circleMesh.position.set( 0.8, -1.51, 0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.x = Math.PI / 2;
    circleMesh.position.set( -0.8, -1.51, -0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.x = Math.PI / 2;
    circleMesh.position.set( 0.8, -1.51, -0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.x = Math.PI / 2;
    circleMesh.position.set( -0.8, -1.51, 0.8);
    dice.add(circleMesh);

    // 5
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = 3 * Math.PI / 2;
    circleMesh.position.set(-1.51, 0.8, 0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = 3 * Math.PI / 2;
    circleMesh.position.set(-1.51, -0.8, -0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = 3 * Math.PI / 2;
    circleMesh.position.set(-1.51, -0.8, 0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = 3 * Math.PI / 2;
    circleMesh.position.set(-1.51, 0.8, -0.8);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = 3 * Math.PI / 2;
    circleMesh.position.set(-1.51, 0, 0);
    dice.add(circleMesh);

    // 6
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = Math.PI;
    circleMesh.position.set(0.8, 0.8, -1.51);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = Math.PI;
    circleMesh.position.set(-0.8, 0.8, -1.51);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = Math.PI;
    circleMesh.position.set(0, 0.8, -1.51);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = Math.PI;
    circleMesh.position.set(0.8, -0.8, -1.51);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = Math.PI;
    circleMesh.position.set(-0.8, -0.8, -1.51);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.35, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = Math.PI;
    circleMesh.position.set(0, -0.8, -1.51);
    dice.add(circleMesh);

    return dice;
  }

}
