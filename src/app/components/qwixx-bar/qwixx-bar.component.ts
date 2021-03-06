import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { QWIXX_COLOR } from 'src/app/models/qwixx/colors';
import { QwixxCookieRow } from 'src/app/models/qwixx/cookie-row';
import { QwixxSettingsService } from 'src/app/services/qwixx-settings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const CLOSED = 99;

@Component({
  selector: 'app-qwixx-bar',
  templateUrl: './qwixx-bar.component.html',
  styleUrls: ['./qwixx-bar.component.scss']
})
export class QwixxBarComponent implements OnInit, OnDestroy {

  @Input()
  cookieId: string;
  @Input()
  labels: string[];
  @Input()
  colors: QWIXX_COLOR[];

  @Output()
  score = new EventEmitter<number>();

  marked: boolean[] = Array(12).fill(false);
  lastMarked = -1;

  public closed = false;
  public unicolor = true;

  private checked = 0;
  private ngUnsubscribe = new Subject<void>();

  constructor(private settingsService: QwixxSettingsService) {
    this.settingsService.newGame.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.marked = Array(12).fill(false);
      this.lastMarked = -1;
      this.closed = false;
      this.unicolor = !!this.colors.reduce((lastColor, color) => {
        return lastColor !== color ? undefined : color;
      }, this.colors[0]);
      this.recalculateScore();
    });
  }

  ngOnInit() {
    this.processCookie();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  trigger(index: number) {
    if (!this.marked[index] && this.lastMarked !== CLOSED) {
      this.mark(index);
    } else {
      this.unmark(index);
    }

    const rowConfig: QwixxCookieRow = {
      marked: this.marked,
      lastMarked: this.lastMarked,
      rowConfig: {
        labels: this.labels,
        colors: this.colors
      }
    };
    this.settingsService.setCookieRow(this.cookieId, rowConfig);
    this.recalculateScore();
  }

  private processCookie() {
    const cookie: QwixxCookieRow = this.settingsService.cookies[this.cookieId];
    if (cookie) {
      this.marked = cookie.marked;
      this.lastMarked = cookie.lastMarked;
      this.colors = cookie.rowConfig.colors;
      this.labels = cookie.rowConfig.labels;
    }

    // set values unicolor and closed according to cookie
    this.unicolor = !!this.colors.reduce((lastColor, color) => {
      return lastColor !== color ? undefined : color;
    }, this.colors[0]);
    if (this.lastMarked === CLOSED) {
      this.closed = true;
    }
    this.recalculateScore();
  }

  private recalculateScore() {
    this.checked = this.marked.map((val: boolean): number => val ? 1 : 0)
      .reduce((checked, val) => val + checked);

    let score = 0;
    for (let i = this.checked; i > 0; i--) {
      score += i;
    }
    this.score.emit(score);
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
    } else if (index === 11 && this.lastMarked === CLOSED && !this.marked[11]) {
      this.closed = false;
      this.lastMarked = penultimate;

    // closed row with checked 12
    } else if (index >= 10 && this.lastMarked === CLOSED) {
      this.closed = false;
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
      this.closed = true;
      this.marked[index] = true;
      this.marked[index + 1] = true;
    }

    // X
    if (index === 11) {
      this.lastMarked = CLOSED;
      this.closed = true;
    }
  }
}
