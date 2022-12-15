import process from 'node:process';
import os from "node:os";
import readline from 'node:readline/promises';
import { USER_ARGV_INDEX, PREFIX_CLI_COMMAND, ExitCode } from './constants.js';
import { Colors, colorStr } from './color.js';
import { osHandler } from './os.js';

/**
 * @type {string[]}
 */
const userArguments = process.argv.slice(USER_ARGV_INDEX);

const usernameCommand = userArguments.find((argument) => argument.startsWith(PREFIX_CLI_COMMAND));
const username = usernameCommand && usernameCommand.substring(PREFIX_CLI_COMMAND.length);

console.log(`Welcome to the File Manager${username ? `, ${colorStr(username, Colors.fgBlue)}` : ''}!`);
console.log('Press command-D, control-D, ^-D, Ctrl-D to exit');
process.stdout.write(os.EOL);

process.stdin.on('data', data => {
  const input = data.toString().trim();
  const [inputCommand, ...inputArguments] = input.split(' ');

  let output = null;

  switch (inputCommand) {
    case '.exit':
      process.exit(ExitCode.success);
    case 'os':
      output = osHandler(inputArguments)
      break;
    default:
      console.log(colorStr(`Invalid input: ${input}`, Colors.fgRed));
      break;
  }

  console.log(output || colorStr(`Invalid input: ${input}`, Colors.fgRed));
  process.stdout.write(os.EOL);
});