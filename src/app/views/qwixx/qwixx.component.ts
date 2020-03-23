import { Component, OnDestroy } from '@angular/core';
import { QwixxRowConfig } from 'src/app/models/qwixx/row-config';
import { QWIXX_VERS_1 } from 'src/app/models/qwixx/configs';
import { QwixxSettingsService } from 'src/app/services/qwixx-settings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-qwixx',
  templateUrl: './qwixx.component.html',
  styleUrls: ['./qwixx.component.scss']
})
export class QwixxComponent implements OnDestroy {

  rows: QwixxRowConfig[] = QWIXX_VERS_1;
  scores: number[] = [0, 0, 0, 0, 0];

  ngUnsubscribe = new Subject<void>();

  constructor(private settings: QwixxSettingsService) {
    this.settings.newGame.pipe(takeUntil(this.ngUnsubscribe)).subscribe(newConfig => {
      this.rows = newConfig;
      this.scores = [0, 0, 0, 0, 0];
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
