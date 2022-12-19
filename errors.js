import { Colors, colorStr } from './color.js';

export const printInputError = () => {
  console.log(colorStr('Invalid input', Colors.fgRed));
}

export const printOperationError = () => {
  console.log(colorStr('Operation failed', Colors.fgRed));
}