import { Component, OnInit } from '@angular/core';
import { QwixxRowConfig } from 'src/app/models/qwixx/row-config';
import { QWIXX_VERS_1 } from 'src/app/models/qwixx/configs';

@Component({
  selector: 'app-qwixx',
  templateUrl: './qwixx.component.html',
  styleUrls: ['./qwixx.component.scss']
})
export class QwixxComponent implements OnInit {

  rows: QwixxRowConfig[] = QWIXX_VERS_1;
  scores: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
