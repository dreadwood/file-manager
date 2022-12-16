import fs from 'node:fs/promises';
import path from 'node:path';
import os from "node:os";
import { createHash } from 'node:crypto';
import { colorStr, Colors } from './color.js';

/**
 * @param {string[]} inputArguments
 */
export const hashHandler = async (inputArguments) => {
  const filePath = path.join(process.cwd(), inputArguments[0]); 
  const contents = await fs.readFile(filePath, { encoding: 'utf8' });

  const hash = createHash('sha256').update(contents).digest('hex');

  console.log(`Hash for ${colorStr(inputArguments[0], Colors.fgBlue)}:${os.EOL}${hash}`);
}
