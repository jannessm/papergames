import { QwixxRowConfig } from './row-config';
import { QWIXX_COLOR } from './colors';

export const QWIXX_VERS_1: QwixxRowConfig[] = [
  {
    labels: Array(11).fill(1).map((_, i) => (i + 2).toString()).concat(['X']),
    colors: Array(12).fill(QWIXX_COLOR.RED)
  },
  {
    labels: Array(11).fill(1).map((_, i) => (i + 2).toString()).concat(['X']),
    colors: Array(12).fill(QWIXX_COLOR.YELLOW)
  },
  {
    labels: Array(11).fill(1).map((_, i) => (12 - i).toString()).concat(['X']),
    colors: Array(12).fill(QWIXX_COLOR.GREEN)
  },
  {
    labels: Array(11).fill(1).map((_, i) => (12 - i).toString()).concat(['X']),
    colors: Array(12).fill(QWIXX_COLOR.BLUE)
  }
];
