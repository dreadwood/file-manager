import process from 'node:process';
import os from "node:os";
import { Colors, colorStr } from './color.js';
import { getUsername } from './username.js';
import { readlineInput } from './readline-input.js';

process.chdir(os.homedir());

process.on('exit', () => {
  console.log(`${os.EOL}Thank you for using File Manager, ${username ? `${colorStr(username, Colors.fgBlue)}, ` : ''}goodbye!`);
});

process.on('SIGINT', process.exit);

const username = getUsername()
console.log(`Welcome to the File Manager${username ? `, ${colorStr(username, Colors.fgBlue)}` : ''}!`);
console.log('Press control-D, ^-D, Ctrl-D to exit');

readlineInput();
