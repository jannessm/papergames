import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qwixx-dice',
  templateUrl: './qwixx-dice.component.html',
  styleUrls: ['./qwixx-dice.component.scss']
})
export class QwixxDiceComponent implements OnInit {

  @Input() set points(num: string) {
    const n = parseInt(num, 10);
    this.iter = new Array(n);

    switch (n) {
      case 1:
        this.diceClass = 'one';
        break;
      case 2:
        this.diceClass = 'two';
        break;
      case 3:
        this.diceClass = 'three';
        break;
      case 4:
        this.diceClass = 'four';
        break;
      case 5:
        this.diceClass = 'five';
        break;
      case 6:
        this.diceClass = 'six';
        break;
      default:
        this.diceClass = 'none';
    }
  }

  @Input() color: string;

  diceClass: string;
  iter: void[] = [];

  constructor() { }

  ngOnInit(): void { }

}
