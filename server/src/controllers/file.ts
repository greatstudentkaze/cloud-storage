import path from 'path';
import { Response, Request } from 'express';

import fileService from '../services/file.js';
import FileModel from '../models/file.js';

class FileController {
  async createDirectory(req: Request, res: Response) {
    try {
      const { name, type, parent } = req.body;
      const file = new FileModel({ name, type, parent, user: req.user.id });
      const parentFile = await FileModel.findOne({ _id: parent });

      if (!parentFile) {
        file.path = name;
        await fileService.createDirectory(file);
      } else {
        file.path = path.join(parentFile.path, file.name);
        await fileService.createDirectory(file);
        parentFile.children.push(file._id);
        await parentFile.save();
      }

      await file.save();
      return res.json(file);
    } catch (err) {
      console.error(err);
      return res.status(400).json(err.message);
    }
  }

  async getFiles(req: Request, res: Response) {
    try {
      const files = await FileModel.find({ user: req.user.id, parent: req.query.parent });
      return res.json(files);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Cannot get files' });
    }
  }
}

export default new FileController();
