import os from "node:os";
import { Colors, colorStr } from './color.js';

/**
 * @param {string[]} firstArguments
 */
export const osHandler = (firstArguments) => {
  let output = null;

  switch (firstArguments) {
    case '--EOL':
      output = JSON.stringify(os.EOL);
      break;

    case '--cpus':
      const info = os.cpus().map((cpu) =>
        `${colorStr('Model:', Colors.fgBlue)} ${cpu.model}, ${colorStr('clock rate:', Colors.fgBlue)} ${(cpu.speed / 1000).toFixed(2)}GHz`);

      output =`${info.length} CPU cores${os.EOL}${info.join(os.EOL)}`;
      break;

    case '--homedir':
      output =  os.userInfo().homedir;
      break;

    case '--username':
      output =  os.userInfo().username;
      break;

    case '--architecture':
      output =  os.arch();
      break;
  }

  console.log(output || colorStr('Invalid input', Colors.fgRed));
};
