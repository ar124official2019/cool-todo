/**
 * This file serves as a configuration for storage directories.
 * It should be generally included once in main file of the server
 *  and initStorage should be called, that will create every required storage
 *  directory. Then later we can import storage directories `storageDirectories`
 *  anywhere and use those paths.
 */

import { tmpdir } from 'os';
import * as fs from 'fs';
import * as path from 'path';

/**
 * root should be the root directory of the project.
 * Generally, I export `__direname` from `root.ts` residing in root directory of
 *  the project and use it as a reference from files in other directories.
 * An example file is added in the snippet.
 */
import root from './root';

/**
 * Create and index of every required storage directory
 */
const directories = Object.freeze([
  // main storage directory
  { base: root, path: ['storage'], name: 'root' },

  // directory where user files will be stored
  {
    base: root,
    path: ['storage', 'user'],
    name: 'user',
  },

  // directory where user profile pictures will be stored
  {
    base: root,
    path: ['storage', 'user', 'profile-picture'],
    name: 'profilePicture',
  },

  // directory where post files will be stored
  { base: root, path: ['storage', 'post'], name: 'post' },

  // directory where post thumbnail files will be stored
  {
    base: root,
    path: ['storage', 'post', 'thumbnail'],
    name: 'thumbnail',
  },

  // directory where files will be temporarily stored
  {
    base: tmpdir(),
    path: [],
    name: 'tmp',
  },
]);

class DoesNotExistError {
  path: string;

  constructor(path) {
    if (!path) {
      throw new Error('Path is required');
    }

    this.path = path;
  }
}

/**
 * Creates all directories initially.
 * It deliberately suppress the exists error.
 */
export function initStorage() {
  for (const directory of directories) {
    try {
      const newPath = path.join(directory.base, directory.path.join(path.sep));
      if (newPath && newPath.length) {
        let info;

        try {
          info = fs.statSync(newPath);
        } catch (err) {
          if (err.code === 'ENOENT') {
            throw new DoesNotExistError(newPath);
          }

          throw err;
        }

        if (!info.isDirectory()) {
          throw new Error(
            `FS Entry (${newPath}) exists but is not a directory`,
          );
        }
      }
    } catch (err) {
      if (!(err instanceof DoesNotExistError)) {
        console.error(err);
        process.exit(1);
      } else {
        fs.mkdirSync(err.path);
      }
    }
  }
}

/**
 * Create a registry of different paths that can be used anywhere later
 *  to reference a particular directory.
 */
export const storageDirectories = {
  root: path.join(root, 'storage'),
  user: path.join(root, 'storage', 'user'),
  profilePictures: path.join(root, 'storage', 'user', 'profile-picture'),
  post: path.join(root, 'storage', 'post'),
  postThumbnail: path.join(root, 'storage', 'post', 'thumbnail'),
  tmp: tmpdir(),
};
