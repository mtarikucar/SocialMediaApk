import { Router } from 'express';
import {
    getAll,
    getDetail,
    updateVersion,
    deleteVersion,
    compareVersion,
} from '../controllers/instagram/index.js';

const router = Router();


router.post('/compare', compareVersion);

router.delete('/:id', deleteVersion);
router.put('/:id', updateVersion);

router.get('/', getAll);
router.get('/detail', getDetail);

export default router
