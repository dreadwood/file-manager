import fs from 'node:fs';
import process from 'node:process';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import stream from 'node:stream/promises';
import { Colors, colorStr } from './color.js';
import { Commands } from './constants.js';

/**
 * @param {string} inputFile
 * @param {string} outputFile
 */
const copyFile = async (inputFile, outputFile) => {
  const inputPath = path.join(process.cwd(), inputFile);
  const outputPath = path.join(process.cwd(), outputFile);
  await stream.pipeline(
    fs.createReadStream(inputPath),
    fs.createWriteStream(outputPath),
  )
}

/**
 * @param {string} inputPath
 */
const removeFile = async (inputPath) => {
  const filePath = path.join(process.cwd(), inputPath); 
  await fsPromises.rm(filePath);
}

/**
 * @param {string} inputCommand
 * @param {string} firstArguments
 * @param {string} secondArguments
 */
export const filesHandler = async (inputCommand, firstArguments, secondArguments) => {
  switch (inputCommand) {
    case Commands.cat: {
      const filePath = path.join(process.cwd(), firstArguments); 
      const readStream = await fs.createReadStream(filePath);
      await readStream.pipe(process.stdout)
      await stream.finished(readStream);
      break;
    }

    case Commands.add: {
      const filePath = path.join(process.cwd(), secondArguments); 
      await fsPromises.appendFile(filePath, '', { flag: 'ax' });
      console.log(`File ${colorStr(firstArguments, Colors.fgBlue)} is created`);
      break;
    }
  
    case Commands.rn: {
      const inputPath = path.join(process.cwd(), firstArguments);
      const outputPath = path.join(process.cwd(), secondArguments);
      await fsPromises.rename(inputPath, outputPath);
      console.log(`File ${colorStr(firstArguments, Colors.fgBlue)} was renamed ${colorStr(secondArguments, Colors.fgBlue)}`);
      break;
    }
  
    case Commands.cp: {
      await copyFile(firstArguments, secondArguments);
      console.log(`File ${colorStr(firstArguments, Colors.fgBlue)} was copied as ${colorStr(secondArguments, Colors.fgBlue)}`);
      break;
    }
  
    case Commands.mv: {
      await copyFile(firstArguments, secondArguments);
      await removeFile(firstArguments);
      console.log(`File ${colorStr(firstArguments, Colors.fgBlue)} was moved as ${colorStr(secondArguments, Colors.fgBlue)}`);
      break;
    }

    case Commands.rm: {
      await removeFile(firstArguments);
      console.log(`File ${colorStr(firstArguments, Colors.fgBlue)} is deleted`);
      break;
    }
  }
}
