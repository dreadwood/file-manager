import process from 'node:process';
import os from "node:os";
import readline from 'node:readline/promises';
import { USER_ARGV_INDEX, PREFIX_CLI_COMMAND, ExitCode, Commands } from './constants.js';
import { Colors, colorStr } from './color.js';
import { osHandler } from './os.js';
import { nwdHandler } from './nwd.js';
import { hashHandler } from './hash.js';
import { zipHandler } from './zip.js';
import { filesHandler } from './files.js';
import { parser } from './parser.js';

/**
 * @type {string[]}
 */
const userArguments = process.argv.slice(USER_ARGV_INDEX);

const usernameCommand = userArguments.find((argument) => argument.startsWith(PREFIX_CLI_COMMAND));
const username = usernameCommand && usernameCommand.substring(PREFIX_CLI_COMMAND.length);

process.chdir(os.homedir());

console.log(`Welcome to the File Manager${username ? `, ${colorStr(username, Colors.fgBlue)}` : ''}!`);
console.log('Press control-D, ^-D, Ctrl-D to exit');

process.on('exit', () => {
  console.log(`${os.EOL}Thank you for using File Manager, ${username ? `${colorStr(username, Colors.fgBlue)}, ` : ''}goodbye!`);
});

process.on('SIGINT', process.exit);

const rl = readline.createInterface({ 
  input: process.stdin,
  output: process.stdout
});

const readlineInput = async () => {
  const input = await rl.question(`You are currently in ${colorStr(process.cwd(), Colors.fgBlue)} > `);
  
  const [inputCommand, firstArguments, secondArguments] = parser(input);

  try {
    
    switch (inputCommand) {
      case Commands.exit:
        process.exit(ExitCode.success);

      case Commands.up:
      case Commands.cd:
      case Commands.ls:
        await nwdHandler(inputCommand, firstArguments);
        break;

      case Commands.cat:
      case Commands.add:
      case Commands.rn:
      case Commands.cp:
      case Commands.mv:
      case Commands.rm:
        await filesHandler(inputCommand, firstArguments, secondArguments);
        break;

      case Commands.os:
        osHandler(firstArguments);
        break;

      case Commands.hash:
        await hashHandler(firstArguments);
        break;

      case Commands.compress:
      case Commands.decompress:
        await zipHandler(inputCommand, firstArguments, secondArguments);
        break;

      default:
        console.log(colorStr('Invalid input', Colors.fgRed));
        break;
    }

  } catch (error) {
    console.log(colorStr('Operation failed', Colors.fgRed));
  }

  readlineInput();
}

readlineInput();
