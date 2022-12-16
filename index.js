import process from 'node:process';
import os from "node:os";
import readline from 'node:readline/promises';
import { USER_ARGV_INDEX, PREFIX_CLI_COMMAND, ExitCode } from './constants.js';
import { Colors, colorStr } from './color.js';
import { osHandler } from './os.js';
import { nwdHandler } from './nwd.js';
import { hashHandler } from './hash.js';

/**
 * @type {string[]}
 */
const userArguments = process.argv.slice(USER_ARGV_INDEX);

const usernameCommand = userArguments.find((argument) => argument.startsWith(PREFIX_CLI_COMMAND));
const username = usernameCommand && usernameCommand.substring(PREFIX_CLI_COMMAND.length);

process.chdir(os.homedir());

console.log(`Welcome to the File Manager${username ? `, ${colorStr(username, Colors.fgBlue)}` : ''}!`);
console.log('Press command-D, control-D, ^-D, Ctrl-D to exit');
process.stdout.write(`You are currently in ${colorStr(process.cwd(), Colors.fgBlue)} > `);

process.stdin.on('data', async (data) => {
  const input = data.toString().trim();
  const [inputCommand, ...inputArguments] = input.split(' ');

  try {
    
    switch (inputCommand) {
      case '.exit':
        process.exit(ExitCode.success);
      case 'up':
      case 'cd':
      case 'ls':
        await nwdHandler(inputCommand, inputArguments);
        break;
      case 'os':
        osHandler(inputArguments);
        break;
      case 'hash':
        await hashHandler(inputArguments);
        break;
      default:
        console.log(colorStr(`Invalid input: ${input}`, Colors.fgRed));
        break;
    }

  } catch (error) {
    console.log(error); // TODO: remove
    console.log(colorStr(`Operation failed: ${input}`, Colors.fgRed));
  }

  process.stdout.write(`You are currently in ${colorStr(process.cwd(), Colors.fgBlue)} > `);
});