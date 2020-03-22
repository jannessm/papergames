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

export const QWIXX_VERS_2: QwixxRowConfig[] = [
  {
    labels: Array(11).fill(1).map((_, i) => (i + 2).toString()).concat(['X']),
    colors: Array(12).fill('').map((val, i) => {
      if (i < 3) {
        return QWIXX_COLOR.YELLOW;
      } else if (i < 6) {
        return QWIXX_COLOR.BLUE;
      } else if (i < 9) {
        return QWIXX_COLOR.GREEN;
      }
      return QWIXX_COLOR.RED;
    })
  },
  {
    labels: Array(11).fill(1).map((_, i) => (i + 2).toString()).concat(['X']),
    colors: Array(12).fill('').map((val, i) => {
      if (i < 2) {
        return QWIXX_COLOR.RED;
      } else if (i < 6) {
        return QWIXX_COLOR.GREEN;
      } else if (i < 8) {
        return QWIXX_COLOR.BLUE;
      }
      return QWIXX_COLOR.YELLOW;
    })
  },
  {
    labels: Array(11).fill(1).map((_, i) => (12 - i).toString()).concat(['X']),
    colors: Array(12).fill('').map((val, i) => {
      if (i < 3) {
        return QWIXX_COLOR.BLUE;
      } else if (i < 6) {
        return QWIXX_COLOR.YELLOW;
      } else if (i < 9) {
        return QWIXX_COLOR.RED;
      }
      return QWIXX_COLOR.GREEN;
    })
  },
  {
    labels: Array(11).fill(1).map((_, i) => (12 - i).toString()).concat(['X']),
    colors: Array(12).fill('').map((val, i) => {
      if (i < 2) {
        return QWIXX_COLOR.GREEN;
      } else if (i < 6) {
        return QWIXX_COLOR.RED;
      } else if (i < 8) {
        return QWIXX_COLOR.YELLOW;
      }
      return QWIXX_COLOR.BLUE;
    })
  }
];

export const QWIXX_VERS_3: QwixxRowConfig[] = [
  {
    labels: ['10', '6', '2', '8', '3', '4', '12', '5', '9', '7', '11', 'X'],
    colors: Array(12).fill(QWIXX_COLOR.RED)
  },
  {
    labels: ['9', '12', '4', '6', '7', '2', '5', '8', '11', '3', '10', 'X'],
    colors: Array(12).fill(QWIXX_COLOR.YELLOW)
  },
  {
    labels: ['8', '2', '10', '12', '6', '9', '7', '4', '5', '11', '3', 'X'],
    colors: Array(12).fill(QWIXX_COLOR.GREEN)
  },
  {
    labels: ['5', '7', '11', '9', '12', '3', '8', '10', '2', '6', '4', 'X'],
    colors: Array(12).fill(QWIXX_COLOR.BLUE)
  }
];
