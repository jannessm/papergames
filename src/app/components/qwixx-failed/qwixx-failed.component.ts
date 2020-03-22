import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qwixx-failed',
  templateUrl: './qwixx-failed.component.html',
  styleUrls: ['./qwixx-failed.component.scss']
})
export class QwixxFailedComponent {

  @Output()
  score = new EventEmitter<number>();

  marked = Array(4).fill(false);

  constructor() { }

  trigger(index: number) {
    this.marked[index] = !this.marked[index];
    this.score.emit(
      this.marked.reduce((score, val) => val ? score * 1 + 1 : score) * 5
    );
  }

}
