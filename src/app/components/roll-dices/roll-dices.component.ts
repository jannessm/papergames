import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

import { SceneService } from 'src/app/services/scene.service';

@Component({
  selector: 'app-roll-dices',
  templateUrl: './roll-dices.component.html',
  styleUrls: ['./roll-dices.component.scss']
})
export class RollDicesComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  doNotShow = true;

  @HostListener('window:resize', [])
  @HostListener('window:orientationchange', [])
  onResize() {
    this.sceneService.resetRendererSize();
  }


  constructor(private sceneService: SceneService) { }

  ngAfterViewInit(): void {
    this.sceneService.setupScene(this.canvas);
  }

  rollDices(diceIds: string[], colors: number[]) {
    this.sceneService.addDice(diceIds[0], colors[0]);

    let i = 1;
    const interval = setInterval(() => {
      this.sceneService.addDice(diceIds[i], colors[i]);
      i++;
      if (i === diceIds.length) {
        clearInterval(interval);
      }
    }, 100);

    this.sceneService.animate();
  }

}
