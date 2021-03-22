import Router, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import UserModel from '../models/user.js';

const router = Router();

const validation = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Password must be longer than 3 and shorter that 12 characters').isLength({ min: 3, max: 12 }),
];

router.post('/registration', ...validation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Incorrect request', errors })
    }

    const { email, password } = req.body;

    const candidate = await UserModel.findOne({ email, password });

    if (candidate) {
      return res.status(400).json({ message: `User with email ${email} already exists` });
    }

    const hashPassword = bcrypt.hashSync(password, 15);
    const user = new UserModel({ email, password: hashPassword });
    await user.save();

    return res.status(201).json({ message: 'User was created' });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

export default router;
