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

  constructor() { }

  ngAfterViewInit(): void {
    const aspectRatio = this.canvas.nativeElement.width / this.canvas.nativeElement.height;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, aspectRatio, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
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

    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);

    this.animate();
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) );

    this.dice.rotation.x += 0.01;
    this.dice.rotation.y += 0.01;

    this.renderer.render( this.scene, this.camera );
  }

  degToRad(deg: number): number {
    return deg / (2 * Math.PI);
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
    circle = new THREE.CircleGeometry( 0.4, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.position.set(0, 0, 1.6);
    dice.add(circleMesh);

    // 2
    circle = new THREE.CircleGeometry( 0.4, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = this.degToRad(90);
    circleMesh.position.set(1.6, 0.6, 0.6);
    dice.add(circleMesh);
    circle = new THREE.CircleGeometry( 0.4, 32 );
    circleMesh = new THREE.Mesh( circle, circleMaterial );
    circleMesh.rotation.y = this.degToRad(90);
    circleMesh.position.set(1.6, -0.6, -0.6);
    dice.add(circleMesh);

    return dice;
  }

}
