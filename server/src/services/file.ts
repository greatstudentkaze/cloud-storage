import fs from 'fs';
import path from 'path';

import { IFile } from '../models/file';

class FileService {
  createDirectory(file: IFile) {
    const filePath = path.join(path.resolve(), 'files', file.user.toString(), file.path);

    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);

        return resolve({ message: 'File was created' });
      } else {
        return reject(new Error('File already exists'));
      }
    });
  }

  deleteFile(file: IFile) {
    const path = this.getPath(file);

    file.type === 'dir' ? fs.rmdirSync(path) : fs.unlinkSync(path);
  }

  getPath(file: IFile) {
    return path.join(path.resolve(), 'files', file.user.toString(), file.path);
  }
}

export default new FileService();
