import express from 'express';
import { VideoController } from '../controllers/videoController';
import { MainController } from '../controllers/mainController';

const router = express.Router();


router.get('/video/', VideoController.getVideo);
router.get('/video/:id', VideoController.video);
router.get('/', MainController.index);

router.use('*', MainController.e404);


export default router;