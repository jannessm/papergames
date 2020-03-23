import { Injectable, EventEmitter } from '@angular/core';
import { QwixxRowConfig } from '../models/qwixx/row-config';

@Injectable({
  providedIn: 'root'
})
export class QwixxSettingsService {

  newGame = new EventEmitter<QwixxRowConfig[]>();

  constructor() { }
}
