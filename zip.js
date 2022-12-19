import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import stream from 'node:stream/promises';
import { Colors, colorStr } from './color.js';
import { Commands } from './constants.js';

/**
 * @param {string} inputCommand
 * @param {string[]} inputArguments
 */
export const zipHandler = async (inputCommand, inputArguments) => {
  const inputPath = path.join(process.cwd(), inputArguments[0]);
  const outputPath = path.join(process.cwd(), inputArguments[1]);

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

  console.log(`File ${colorStr(inputArguments[0], Colors.fgBlue)} ${inputCommand} to ${colorStr(inputArguments[1], Colors.fgBlue)}`);
}
