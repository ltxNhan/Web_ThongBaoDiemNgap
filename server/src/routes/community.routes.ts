import { Router } from 'express';
import { CommunityPostsController } from '../controllers/CommunityPostsController';

const router = Router();

router.get('/posts', CommunityPostsController.getAll);
router.post('/posts', CommunityPostsController.create);

export default router;

