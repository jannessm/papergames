import { Component } from '@angular/core';
import { QwixxRowConfig } from 'src/app/models/qwixx/row-config';
import { QWIXX_VERS_2, QWIXX_VERS_3, QWIXX_VERS_1 } from 'src/app/models/qwixx/configs';
import { QwixxSettingsService } from 'src/app/services/qwixx-settings.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-qwixx-menu',
  templateUrl: './qwixx-menu.component.html',
  styleUrls: ['./qwixx-menu.component.scss']
})
export class QwixxMenuComponent {

  private cookieId = 'qwixx-menu';
  layoutsLabels: string[] = ['classical', 'mixed colors', 'mixed numbers'];
  layouts: QwixxRowConfig[][] = [QWIXX_VERS_1, QWIXX_VERS_2, QWIXX_VERS_3];
  selectedLayout: QwixxRowConfig[] = QWIXX_VERS_1;

  constructor(
    private settings: QwixxSettingsService
  ) {
    if (this.settings.cookies[this.cookieId]) {

    }
  }

  reset() {
    this.settings.newGame.emit(this.selectedLayout);
    this.settings.resetGame(this.selectedLayout);
  }

}
