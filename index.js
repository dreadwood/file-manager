import process from 'node:process';
import { USER_ARGV_INDEX, PREFIX_CLI_COMMAND, ExitCode } from './constants.js';
import { Colors, colorStr } from './color.js';

console.log(colorStr('HELLO!\n', Colors.fgBlue));
console.log(colorStr('I am File Manager!', Colors.bgMagenta));
console.log(colorStr('actually, not yet\n', Colors.dim + Colors.fgRed));

/**
 * @type {string[]}
 */
const userArguments = process.argv.slice(USER_ARGV_INDEX);

const usernameCommand = userArguments.find((argument) => argument.startsWith(PREFIX_CLI_COMMAND));
const username = usernameCommand && usernameCommand.substring(PREFIX_CLI_COMMAND.length);

console.log(`Welcome to the File Manager${username ? `, ${username}` : ''}!`);

process.exit(ExitCode.success);