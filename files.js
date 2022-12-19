import fs from 'node:fs';
import process from 'node:process';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import stream from 'node:stream/promises';
import { Colors, colorStr } from './color.js';

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
 * @param {string[]} inputArguments
 */
export const filesHandler = async (inputCommand, inputArguments) => {
  switch (inputCommand) {
    case 'cat': {
      const filePath = path.join(process.cwd(), inputArguments[0]); 
      const readStream = await fs.createReadStream(filePath);
      await readStream.pipe(process.stdout)
      await stream.finished(readStream);
      break;
    }

    case 'add': {
      const filePath = path.join(process.cwd(), inputArguments[0]); 
      await fsPromises.appendFile(filePath, '', { flag: 'ax' });
      console.log(`File ${colorStr(inputArgumentsxt[0], Colors.fgBlue)} is created`);
      break;
    }
  
    case 'rn': {
      const inputPath = path.join(process.cwd(), inputArguments[0]);
      const outputPath = path.join(process.cwd(), inputArguments[1]);
      await fsPromises.rename(inputPath, outputPath);
      console.log(`File ${colorStr(inputArguments[0], Colors.fgBlue)} was renamed ${colorStr(inputArguments[1], Colors.fgBlue)}`);
      break;
    }
  
    case 'cp': {
      await copyFile(inputArguments[0], inputArguments[1]);
      console.log(`File ${colorStr(inputArguments[0], Colors.fgBlue)} was copied as ${colorStr(inputArguments[1], Colors.fgBlue)}`);
      break;
    }
  
    case 'mv': {
      await copyFile(inputArguments[0], inputArguments[1]);
      await removeFile(inputArguments[0]);
      console.log(`File ${colorStr(inputArguments[0], Colors.fgBlue)} was moved as ${colorStr(inputArguments[1], Colors.fgBlue)}`);
      break;
    }

    case 'rm': {
      await removeFile(inputArguments[0]);
      console.log(`File ${colorStr(inputArguments[0], Colors.fgBlue)} is deleted`);
      break;
    }
  }
}
