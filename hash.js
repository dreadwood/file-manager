import fs from 'node:fs/promises';
import path from 'node:path';
import os from "node:os";
import { createHash } from 'node:crypto';
import { colorStr, Colors } from './color.js';
import { printInputError } from './errors.js';

/**
 * @param {string[]} firstArguments
 */
export const hashHandler = async (firstArguments) => {
  if (!firstArguments) {
    printInputError();
    return;
  }

  const filePath = path.join(process.cwd(), firstArguments); 
  const contents = await fs.readFile(filePath, { encoding: 'utf8' });

  const hash = createHash('sha256').update(contents).digest('hex');

  console.log(`Hash for ${colorStr(firstArguments, Colors.fgBlue)}:${os.EOL}${hash}`);
}
