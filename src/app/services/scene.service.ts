import { Injectable, ElementRef } from '@angular/core';

import * as THREE from 'three';
import * as CANNON from 'cannon';
import { SceneFactory } from '../models/dices/scene-factory';
import { Dice } from '../models/dices/dice';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  world: CANNON.World;

  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;

  objects: Dice[] = [];

  paused = false;

  private lastTime: number;
  private time: number;
  private fixedTimeStep = 1.0 / 60.0;
  private maxSubSteps = 3;

  constructor() { }

  setupScene(canvas: ElementRef) {
    this.scene = SceneFactory.createScene(true);
    this.world = SceneFactory.createWorld();

    const aspectRatio = canvas.nativeElement.width / canvas.nativeElement.height;

    this.camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 1000 );
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas.nativeElement,
      antialias: true,
      // alpha: true
    });

    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.camera.position.set(0, -1, 15);
    this.camera.lookAt(0, 0, 2);
  }

  addDice(id: string, color: number) {
    const dice = new Dice(id, color);
    dice.setPosition( Math.random() * 4 - 2,  Math.random() * 4 - 2, Math.random() * 5 + 5);
    // dice.setPosition(0, 0, 2);
    this.objects.push(dice);
    this.scene.add(dice.mesh);

    this.world.addBody(dice.body);
  }

  animate() {

    if (this.paused) {
      return;
    }

    this.time += 0.05;

    if (this.lastTime !== undefined) {
      this.world.step(this.fixedTimeStep, this.time, this.maxSubSteps);
      this.updateObjects();
    }

    this.lastTime = this.time;

    requestAnimationFrame( this.animate.bind(this) );
    this.renderer.render( this.scene, this.camera );
  }

  updateObjects() {
    this.objects.forEach(dice => {
      dice.updateMesh();
    });

    if (this.objects.reduce((finished, dice) => finished && dice.animationFinished, true)) {
      this.objects.forEach(dice => {
        // dice.setPosition(0, 0, Math.random() * 5 + 5);
      });
    }
  }
}
