import path from 'path';
import fs from 'fs';
import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

import fileService from '../services/file.js';
import FileModel from '../models/file.js';
import UserModel from '../models/user.js';
import { UploadedFile } from 'express-fileupload';

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
      const { sort } = req.query;

      let files;

      switch (sort) {
        case 'name':
          files = await FileModel.find({ user: req.user.id, parent: req.query.parent }).sort({ name: 1 });
          break;
        case 'type':
          files = await FileModel.find({ user: req.user.id, parent: req.query.parent }).sort({ type: 1 });
          break;
        case 'date':
          files = await FileModel.find({ user: req.user.id, parent: req.query.parent }).sort({ date: 1 });
          break;
        default:
          files = await FileModel.find({ user: req.user.id, parent: req.query.parent });
          break;
      }

      return res.json(files);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Cannot get files' });
    }
  }

  async uploadFile(req: Request, res: Response) {
    try {
      const file = req.files?.file as UploadedFile;

      const parent = await FileModel.findOne({ user: req.user.id, _id: req.body.parent });
      const user = await UserModel.findOne({ _id: req.user.id });

      if (user.usedSpace + file.size > user.storageSpace) {
        return res.status(400).json({ message: 'There is no free storage space' });
      }

      user.usedSpace = user.usedSpace + file.size;

      let filePath = parent
        ? path.join(path.resolve(), 'files', user._id.toString(), parent.path, file.name)
        : path.join(path.resolve(), 'files', user._id.toString(), file.name);

      if (fs.existsSync(filePath)) {
        return res.status(400).json({ message: 'File already exists' });
      }

      await file.mv(filePath);

      const type = file.name.split('.').pop();
      const fileData = new FileModel({
        name: file.name,
        type,
        size: file.size,
        path: parent ? path.join(parent.path, file.name) : file.name,
        parent: parent?._id,
        user: user._id,
      });

      await fileData.save();
      await user.save();

      return res.status(201).json(fileData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Upload error' });
    }
  }

  async downloadFile(req: Request, res: Response) {
    try {
      const file = await FileModel.findOne({ _id: req.query.id, user: req.user.id });
      const filePath = fileService.getPath(file);

      if (fs.existsSync(filePath)) {
        return res.download(filePath, file.name);
      }

      return res.status(400).json({ message: 'Download error' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Download error' });
    }
  }

  async deleteFile(req: Request, res: Response) {
    try {
      const file = await FileModel.findOne({ _id: req.query.id, user: req.user.id });
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }

      fileService.deleteFile(file);
      await file.remove();

      return res.json({ message: 'File deleted' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Directory is not empty' });
    }
  }

  async searchFiles(req: Request, res: Response) {
    try {
      const searchQuery = req.query.query ? String(req.query.query) : '';
      const sourceFiles = await FileModel.find({ user: req.user.id });
      const files = sourceFiles.filter((file: any) => file.name.toLowerCase().includes(searchQuery.toLowerCase()));

      res.json(files);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Search error' });
    }
  }

  // todo: add file validation
  async uploadAvatar(req: Request, res: Response) {
    try {
      const file = req.files?.file as UploadedFile;
      const user = await UserModel.findById(req.user.id);
      const avatarName = uuidv4() + '.jpg';

      await file.mv(path.join(path.resolve(), 'static', avatarName));

      user.avatar = avatarName;
      await user.save();

      return res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Upload avatar error' });
    }
  }

  async deleteAvatar(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(req.user.id);
      fs.unlinkSync(path.join(path.resolve(), 'static', user.avatar));

      user.avatar = null;
      await user.save();

      return res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Delete avatar error' });
    }
  }
}

export default new FileController();
