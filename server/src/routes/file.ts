import Router from 'express';

import authMiddleware from '../middlewares/auth.js';

import fileController from '../controllers/file.js';

const router = Router();

router.post('', authMiddleware, fileController.createDirectory);
router.get('', authMiddleware, fileController.getFiles);
router.post('/upload', authMiddleware, fileController.uploadFile);
router.get('/download', authMiddleware, fileController.downloadFile);
router.delete('/', authMiddleware, fileController.deleteFile);
router.get('/search', authMiddleware, fileController.searchFiles);
router.post('/avatar', authMiddleware, fileController.uploadAvatar);
router.delete('/avatar', authMiddleware, fileController.deleteAvatar);

export default router;
