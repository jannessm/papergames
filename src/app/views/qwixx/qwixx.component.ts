import { Component, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { QwixxRowConfig } from 'src/app/models/qwixx/row-config';
import { QWIXX_VERS_1 } from 'src/app/models/qwixx/configs';
import { QwixxSettingsService } from 'src/app/services/qwixx-settings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RollDicesComponent } from 'src/app/components/roll-dices/roll-dices.component';
import { QwixxBarComponent } from 'src/app/components/qwixx-bar/qwixx-bar.component';
import { SceneService } from 'src/app/services/scene.service';
import { QWIXX_COLOR_VALUES } from 'src/app/models/qwixx/colors';

@Component({
  selector: 'app-qwixx',
  templateUrl: './qwixx.component.html',
  styleUrls: ['./qwixx.component.scss']
})
export class QwixxComponent implements OnDestroy {

  @ViewChild('dices') dicesComponent: RollDicesComponent;
  @ViewChildren('qwixxBar') bars: QwixxBarComponent[];

  open = false;
  notfirstopen = false;

  rows: QwixxRowConfig[] = QWIXX_VERS_1;
  scores: number[] = [0, 0, 0, 0, 0];

  dicesResults: { points: number; color: string; }[] = [];

  ngUnsubscribe = new Subject<void>();

  constructor(
    private settings: QwixxSettingsService,
    private sceneService: SceneService
  ) {
    this.settings.newGame.pipe(takeUntil(this.ngUnsubscribe)).subscribe(newConfig => {
      this.rows = newConfig;
      this.scores = [0, 0, 0, 0, 0];
      this.dicesResults = [];
    });

    this.sceneService.results.pipe(takeUntil(this.ngUnsubscribe)).subscribe(results => {
      const ids = this.getCurrentDiceColors();

      let i = 0;
      const interval = setInterval(() => {
        this.sceneService.removeDice(ids[i]);
        this.dicesResults.push({
          points: results[ids[i]],
          color: ids[i].replace(/\d*/g, '')
        });
        i++;

        if (i === ids.length) {
          clearInterval(interval);
          this.dicesComponent.doNotShow = true;
        }
      }, 300);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getCurrentDiceColors() {
    const diceColors = ['white1', 'white2'];
    this.bars.forEach((bar) => {
      if (!bar.closed || !bar.unicolor) {
        diceColors.push(bar.colors[0]);
      }
    });

    return diceColors;
  }

  rollDices() {
    this.dicesComponent.doNotShow = false;
    this.dicesResults = [];

    const diceColors = this.getCurrentDiceColors();
    const diceColorValues = diceColors.map((color) => QWIXX_COLOR_VALUES[color]);
    this.dicesComponent.rollDices(
      diceColors,
      diceColorValues
    );
  }

}
