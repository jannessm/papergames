import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

import { SceneService } from 'src/app/services/scene.service';

@Component({
  selector: 'app-roll-dices',
  templateUrl: './roll-dices.component.html',
  styleUrls: ['./roll-dices.component.scss']
})
export class RollDicesComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  @HostListener('window:resize', [])
  onResize() {
    this.sceneService.resetRendererSize();
  }

  constructor(private sceneService: SceneService) {
    this.sceneService.results.subscribe(results => {
      const ids = ['red', 'blue', 'yellow', 'green', 'white1', 'white2'];
      let i = 0;
      const interval = setInterval(() => {
        // console.log(i);
        this.sceneService.removeDice(ids[i]);
        i += 1;
      }, 300);
      setTimeout(() => {
        clearInterval(interval);
        (this.canvas.nativeElement as HTMLElement).style.display = 'none';
      }, 2100);
    });
  }

  ngAfterViewInit(): void {
    const ids = ['red', 'blue', 'yellow', 'green', 'white1', 'white2'];
    const colors = [0xff4444, 0x8888ff, 0xe0e044, 0x00e044, 0xffffff, 0xffffff];
    this.sceneService.setupScene(this.canvas);
    this.sceneService.addDice(ids[0], colors[0]);
    let i = 1;
    const interval = setInterval(() => {
      this.sceneService.addDice(ids[i], colors[i]);
      i++;
    }, 300);
    setTimeout(() => clearInterval(interval), 1500);
    this.sceneService.animate();

  }

}
