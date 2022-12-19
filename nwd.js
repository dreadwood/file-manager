import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { Commands } from './constants.js';

/**
 * @param {string} inputCommand
 * @param {string} firstArguments
 */
export const nwdHandler = async (inputCommand, firstArguments) => {
  switch (inputCommand) {
    case Commands.up: {
      process.chdir(path.dirname(process.cwd()));
      break;
    }

    case Commands.cd: {
      const newWorkdir = path.join(process.cwd(), firstArguments); 
      process.chdir(newWorkdir);
      break;
    }

    case Commands.ls:
      const dataDir = await fs.readdir(process.cwd(), { withFileTypes: true });

      dataDir.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });

      const separateDataDir = dataDir.reduce((acc, it) => {
        if (it.isFile()) {
          acc.file.push({
            name: it.name,
            type: 'file',
          })
        } else if (it.isDirectory()) {
          acc.directory.push({
            name: it.name,
            type: 'directory',
          })
        } else {
          acc.unknown.push({
            name: it.name,
            type: 'unknown',
          })
        }
        return acc;
      }, {
        directory: [],
        file: [],
        unknown: [],
      });
      
      console.table([
        ...separateDataDir.directory, 
        ...separateDataDir.file,
        ...separateDataDir.unknown,
      ])

      break
  }
}
