import readline from 'node:readline/promises';
import { osHandler } from './os.js';
import { nwdHandler } from './nwd.js';
import { hashHandler } from './hash.js';
import { zipHandler } from './zip.js';
import { filesHandler } from './files.js';
import { parser } from './parser.js';
import { Colors, colorStr } from './color.js';
import { ExitCode, Commands } from './constants.js';
import { printInputError, printOperationError } from './errors.js';

const rl = readline.createInterface({ 
  input: process.stdin,
  output: process.stdout
});

export const readlineInput = async () => {
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
        printInputError();
        break;
    }

  } catch (error) {
    printOperationError();
  }

  readlineInput();
}