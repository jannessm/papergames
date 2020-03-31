import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { SceneService } from 'src/app/services/scene.service';

@Component({
  selector: 'app-roll-dices',
  templateUrl: './roll-dices.component.html',
  styleUrls: ['./roll-dices.component.scss']
})
export class RollDicesComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  constructor(private sceneService: SceneService) { }

  ngAfterViewInit(): void {
    this.sceneService.setupScene(this.canvas);
    this.sceneService.addDice('red', 0xff4444);
    setTimeout(() => {
      this.sceneService.addDice('blue', 0x8888ff);
    }, 500);
    setTimeout(() => {
      this.sceneService.addDice('yellow', 0xe0e044);
    }, 1000);
    setTimeout(() => {
      this.sceneService.addDice('green', 0x00e044);
    }, 1500);
    setTimeout(() => {
      this.sceneService.addDice('white1', 0xffffff);
    }, 2000);
    setTimeout(() => {
      this.sceneService.addDice('white2', 0xffffff);
    }, 2500);
    this.sceneService.animate();
  }

}
