import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

/**
 * @param {string} inputCommand
 * @param {string[]} inputArguments
 */
export const nwdHandler = async (inputCommand, inputArguments) => {
  switch (inputCommand) {
    case 'up': {
      process.chdir(path.dirname(process.cwd()));
      break;
    }

    case 'cd': {
      // TODO: 2022-12-16 / win check
      const newWorkdir = path.join(process.cwd(), inputArguments.join(' ')); 
      process.chdir(newWorkdir);
      break;
    }

    case 'ls':
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
