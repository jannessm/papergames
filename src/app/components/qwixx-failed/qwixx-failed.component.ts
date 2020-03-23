import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { QwixxCookieFailed } from 'src/app/models/qwixx/cookie-failed';
import { QwixxSettingsService } from 'src/app/services/qwixx-settings.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-qwixx-failed',
  templateUrl: './qwixx-failed.component.html',
  styleUrls: ['./qwixx-failed.component.scss']
})
export class QwixxFailedComponent implements OnInit, OnDestroy {

  @Output()
  score = new EventEmitter<number>();

  marked: boolean[] = Array(4).fill(false);

  private cookieId = 'qwixx-failed';
  private ngUnsubscribe = new Subject<void>();

  constructor(private settingsService: QwixxSettingsService) {
    if (this.settingsService.cookies[this.cookieId]) {
      const failedConfig: QwixxCookieFailed = this.settingsService.cookies[this.cookieId];
      this.marked = failedConfig.marked;
    }

    this.settingsService.newGame.pipe(takeUntil(this.ngUnsubscribe)).subscribe(layout => {
      this.marked = Array(4).fill(false);
    });
  }

  ngOnInit() {
    this.recalculateScore();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  trigger(index: number) {
    this.marked[index] = !this.marked[index];
    this.recalculateScore();

    const rowConfig: QwixxCookieFailed = {
      marked: this.marked
    };
    this.settingsService.setCookieFailed(this.cookieId, rowConfig);
  }

  recalculateScore() {
    this.score.emit(
      this.marked.map((val): number => val ? 1 : 0)
        .reduce((score, val) => val ? score * 1 + 1 : score) * 5
    );
  }

}
