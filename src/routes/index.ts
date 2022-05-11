import { Router, Request, Response } from 'express';
import notes from './notes'

const router = Router();

// Routes
router.use('/notes', notes)

export default router;