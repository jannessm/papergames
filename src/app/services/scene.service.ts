import { Injectable, ElementRef, HostListener, EventEmitter } from '@angular/core';

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

  results = new EventEmitter<{ [key: string]: number; }>();

  private lastTime: number;
  private time: number;
  private fixedTimeStep = 1.0 / 60.0;
  private maxSubSteps = 5;

  private counts = [0, 0, 0, 0, 0, 0];
  private totalCounts = 0;

  constructor() { }

  setupScene(canvas: ElementRef) {
    this.scene = SceneFactory.createScene();
    this.world = SceneFactory.createWorld();

    this.camera = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas.nativeElement,
      antialias: true,
      alpha: true
    });

    this.resetRendererSize();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;

    this.camera.position.set(0, 0, 15);
    this.camera.lookAt(0, 0, 2);
  }

  addDice(id: string, color: number) {
    const dice = new Dice(id, color);
    dice.reset();
    this.objects.push(dice);
    this.scene.add(dice.mesh);

    this.world.addBody(dice.body);
  }

  removeDice(id: string) {
    this.scene.remove(this.scene.getObjectByName(id));
    this.objects = this.objects.filter(dice => dice.id !== id);
    this.updateObjects();
    this.renderer.render( this.scene, this.camera );
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

  private updateObjects() {
    this.objects.forEach(dice => {
      dice.updateMesh();
    });

    const diceFinished = this.objects.reduce((finished, dice) => finished && dice.animationFinished, true);

    if (diceFinished) {
      this.paused = true;
      this.results.emit(
        this.objects.reduce((res, dice) => {
          res[dice.id] = dice.getNumber();
          return res;
        }, {})
      );
    }

    // for probability experiment uncomment this.
    // if (this.objects.reduce((finished, dice) => finished && dice.animationFinished, true) && this.totalCounts < 1000) {
    //   this.totalCounts++;
    //   if (this.totalCounts % 10 === 0) {
    //     console.log(this.totalCounts, this.counts);
    //   }
    //   this.objects.forEach(dice => {
    //     this.counts[dice.getNumber() - 1]++;
    //     dice.reset();
    //   });
    // } else if (this.totalCounts > 999) {
    //   console.log(this.counts);
    // }
  }

  resetRendererSize() {

    if (window.innerHeight > window.innerWidth) {
      this.camera.aspect = window.innerHeight / window.innerWidth;
      this.renderer.setSize( window.innerHeight, window.innerWidth );
    } else {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
    this.camera.updateProjectionMatrix();
  }
}
