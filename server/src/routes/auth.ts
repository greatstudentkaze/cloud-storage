import Router, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authMiddleware from '../middlewares/auth.js';

import UserModel from '../models/user.js';
import FileModel from '../models/file.js';
import fileService from '../services/file.js';

const router = Router();

const validation = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Password must be longer than 3 and shorter that 12 characters').isLength({ min: 3, max: 12 }),
];

const getTokenAndUserData = (user: any) => {
  if (!process.env.SECRET_KEY) {
    console.error('Добавь SECRET_KEY в .env');
    throw new Error();
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      storageSpace: user.storageSpace,
      usedSpace: user.usedSpace,
      avatar: user.avatar,
    }
  };
};

router.post('/registration', ...validation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Incorrect request', errors })
    }

    const { email, password } = req.body;

    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: `User with email ${email} already exists` });
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new UserModel({ email, password: hashPassword });
    await user.save();
    await fileService.createDirectory(new FileModel({ user: user.id, name: '' }));

    return res.status(201).json({ message: 'User was created' });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    return res.json(getTokenAndUserData(user));
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

router.get('/auth', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id });

    return res.json(getTokenAndUserData(user));
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

export default router;
