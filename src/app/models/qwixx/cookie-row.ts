import { QwixxRowConfig } from './row-config';

export interface QwixxCookieRow {
  rowConfig: QwixxRowConfig;
  marked: boolean[];
  lastMarked: number;
}
