import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import stream from 'node:stream/promises';
import { Colors, colorStr } from './color.js';
import { Commands } from './constants.js';
import { printInputError } from './errors.js';

/**
 * @param {string} inputCommand
 * @param {string} firstArguments
 * @param {string} secondArguments
 */
export const zipHandler = async (inputCommand, firstArguments, secondArguments) => {
  if (!firstArguments || !secondArguments) {
    printInputError();
    return;
  }

  const inputPath = path.join(process.cwd(), firstArguments);
  const outputPath = path.join(process.cwd(), secondArguments);

  switch (inputCommand) {
    case Commands.compress:
      await stream.pipeline(
        fs.createReadStream(inputPath),
        zlib.createBrotliCompress(),
        fs.createWriteStream(outputPath),
      )
      break;

    case Commands.decompress:
      await stream.pipeline(
        fs.createReadStream(inputPath),
        zlib.createBrotliDecompress(),
        fs.createWriteStream(outputPath),
      )
      break;
  }

  console.log(`File ${colorStr(firstArguments, Colors.fgBlue)} ${inputCommand} to ${colorStr(secondArguments, Colors.fgBlue)}`);
}
