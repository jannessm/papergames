import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { QWIXX_COLOR } from 'src/app/models/qwixx/colors';

const CLOSED = 99;

@Component({
  selector: 'app-qwixx-bar',
  templateUrl: './qwixx-bar.component.html',
  styleUrls: ['./qwixx-bar.component.scss']
})
export class QwixxBarComponent implements OnInit {

  @Input()
  labels: string[];
  @Input()
  colors: QWIXX_COLOR[];

  @Output()
  score = new EventEmitter<number>();

  marked: boolean[] = Array(12).fill(false);
  lastMarked = -1;

  private checked = 0;

  constructor() { }

  ngOnInit() {
    this.score.emit(0);
  }

  trigger(index: number) {
    if (!this.marked[index] && this.lastMarked !== CLOSED) {
      this.mark(index);
    } else {
      this.unmark(index);
    }

    // recalculate score
    let numberMark = 1;
    this.checked = this.marked.map((val: boolean): number => val ? 1 : 0)
      .reduce((score, val, i) => {
        if (val === 1) {
          numberMark++;
        }
        return score + val * numberMark;
      });
    this.score.emit(this.checked);
  }

  private unmark(index: number) {
    let penultimate = -1;
    this.marked.forEach((val, i) => {
      if (val && i < this.lastMarked && i < 10) {
        penultimate = i;
      }
    });

    // normal number
    if (index === this.lastMarked && index < 10) {
      this.lastMarked = penultimate;
      this.marked[index] = false;

    // closed row without checked 12
    } else if (this.lastMarked === CLOSED && !this.marked[11]) {
      this.lastMarked = penultimate;

    // closed row with checked 12
    } else if (this.lastMarked === CLOSED) {
      this.lastMarked = penultimate;
      this.marked[10] = false;
      this.marked[11] = false;
    }
  }

  private mark(index: number) {
    if (index <= this.lastMarked) {
      return;
    }
    // normal numbers
    if (index !== 11 && index !== 10) {
      this.lastMarked = index;
      this.marked[index] = true;
    }

    // 12
    if (index === 10 && this.checked >= 5) {
      this.lastMarked = CLOSED;
      this.marked[index] = true;
      this.marked[index + 1] = true;
    }

    // X
    if (index === 11 && this.checked >= 5) {
      this.lastMarked = CLOSED;
      this.marked[index] = true;
      this.marked[index - 1] = true;
    } else if (index === 11) {
      this.lastMarked = CLOSED;
    }
  }
}
