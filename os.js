import os from "node:os";
import { Colors, colorStr } from './color.js';

/**
 * @param {string[]} inputArguments
 */
export const osHandler = (inputArguments) => {
  switch (inputArguments[0]) {
    case '--EOL':
      return JSON.stringify(os.EOL);

    case '--cpus':
      const info = os.cpus().map((cpu) =>
        `${colorStr('Model:', Colors.fgBlue)} ${cpu.model}, ${colorStr('clock rate:', Colors.fgBlue)} ${(cpu.speed / 1000).toFixed(2)}GHz`);

      return`${info.length} CPU cores${os.EOL}${info.join(os.EOL)}`;

    case '--homedir':
      return os.userInfo().homedir;

    case '--username':
      return os.userInfo().username;

    case '--architecture':
      return os.arch();
      
    default:
      return null;
  }
};
