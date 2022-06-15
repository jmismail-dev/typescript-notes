import { Router, Request, Response } from 'express';
import notes from './notes'

const router = Router();

// Routes
router.get('/', (req, res) => {
    return res.status(200).send({ message: "API is running successfully!" })
})
router.use('/notes', notes)

export default router;