import fs from 'fs';
import path from 'path';

// throw errors instead of try-catch
class FileService {
  createDirectory(file: any) {
    const filePath = path.join(path.resolve(), 'files', file.user.toString(), file.path);

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);

          return resolve({ message: 'File was created' });
        } else {
          return reject({ message: 'File already exists' });
        }

      } catch (err) {
        return reject({ message: 'File error' });
      }
    });
  }

  deleteFile(file: any) {
    const path = FileService.getPath(file);

    file.type === 'dir' ? fs.rmdirSync(path) : fs.unlinkSync(path);
  }

  private static getPath(file: any) {
    return path.join(path.resolve(), 'files', file.user.toString(), file.path);
  }
}

export default new FileService();
