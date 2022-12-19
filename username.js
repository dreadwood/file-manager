import process from 'node:process';
import { USER_ARGV_INDEX, PREFIX_CLI_COMMAND } from './constants.js';

export const getUsername = () => {
  const userArguments = process.argv.slice(USER_ARGV_INDEX);

  const usernameCommand = userArguments.find((argument) => argument.startsWith(PREFIX_CLI_COMMAND));
  return usernameCommand && usernameCommand.substring(PREFIX_CLI_COMMAND.length);
}
