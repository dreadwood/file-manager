import process from 'node:process';
import { USER_ARGV_INDEX, PREFIX_CLI_COMMAND, ExitCode } from './constants.js';

console.log('\x1b[34m%s\x1b[0m', 'HELLO!\n');
console.log('\x1b[45m%s\x1b[0m', 'I am File Manager');
console.log('\x1b[91m\x1b[2m%s\x1b[0m', 'actually, not yet\n');

/**
 * @type {string[]}
 */
const userArguments = process.argv.slice(USER_ARGV_INDEX);

const usernameCommand = userArguments.find((argument) => argument.startsWith(PREFIX_CLI_COMMAND));
const username = usernameCommand && usernameCommand.substring(PREFIX_CLI_COMMAND.length);

console.log(`Welcome to the File Manager${username ? `, ${username}` : ''}!`);

process.exit(ExitCode.success);