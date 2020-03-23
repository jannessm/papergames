import { Injectable, EventEmitter } from '@angular/core';
import { QwixxRowConfig } from '../models/qwixx/row-config';
import { QwixxCookieRow } from '../models/qwixx/cookie-row';
import { QwixxCookieFailed } from '../models/qwixx/cookie-failed';
import { CookieService } from 'ngx-cookie-service';
import { QwixxCookieSettings } from '../models/qwixx/cookie-settings';

@Injectable({
  providedIn: 'root'
})
export class QwixxSettingsService {

  newGame = new EventEmitter<QwixxRowConfig[]>();

  cookies: QwixxCookieSettings = {};

  constructor(private cookieService: CookieService) {
    ['qwixx-row-0', 'qwixx-row-1', 'qwixx-row-2', 'qwixx-row-3'].forEach(key => this.processCookieRow(key));
    this.processCookieFailed('qwixx-failed');
  }

  resetGame(layout: QwixxRowConfig[]) {
    this.setCookieFailed('qwixx-failed', {marked: [false, false, false, false]});
    layout.forEach((row, i) => this.setCookieRow('qwixx-row-' + i, {
      marked: Array(12).fill(false),
      rowConfig: row,
      lastMarked: -1
    }));
  }

  setCookieRow(key: string, rowConfig: QwixxCookieRow) {
    this.cookies[key] = rowConfig;
    this.cookieService.set(key, JSON.stringify(rowConfig));
  }

  setCookieFailed(key: string, failedConfig: QwixxCookieFailed) {
    this.cookies[key] = failedConfig;
    this.cookieService.set(key, JSON.stringify(failedConfig));
  }

  private processCookieRow(key: string) {
    if (!this.cookieService.check(key)) {
      return;
    }
    try {
      const rowConfig: QwixxCookieRow = JSON.parse(this.cookieService.get(key));
      this.cookies[key] = rowConfig;
    } catch (err) {}
  }

  private processCookieFailed(key: string) {
    if (!this.cookieService.check(key)) {
      return;
    }
    try {
      const rowConfig: QwixxCookieFailed = JSON.parse(this.cookieService.get(key));
      this.cookies[key] = rowConfig;
    } catch (err) {}
  }
}
