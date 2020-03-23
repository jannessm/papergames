import { QwixxCookieRow } from './cookie-row';
import { QwixxCookieFailed } from './cookie-failed';

export interface QwixxCookieSettings {
  'qwixx-row-0'?: QwixxCookieRow;
  'qwixx-row-1'?: QwixxCookieRow;
  'qwixx-row-2'?: QwixxCookieRow;
  'qwixx-row-3'?: QwixxCookieRow;
  'qwixx-failed'?: QwixxCookieFailed;
}
