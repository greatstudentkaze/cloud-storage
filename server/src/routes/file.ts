import Router from 'express';

import authMiddleware from '../middlewares/auth.js';

import fileController from '../controllers/file.js';

const router = Router();

router.post('', authMiddleware, fileController.createDirectory);
router.get('', authMiddleware, fileController.getFiles);

export default router;
