import { Router } from 'express';

import { getNotes, getNote, createNote, updateNote, restoreHistory, getHistoryForNotes, deleteNote } from '../controllers/notes';

const router = Router();

// GET
router.get('/', getNotes);
router.get('/:noteId', getNote);

// POST
router.post('/', createNote);

// PUT
router.put('/restore/:historyId', restoreHistory);
router.put('/history/:noteId', getHistoryForNotes);
router.put('/:noteId', updateNote);

// DELETE
router.delete('/:noteId', deleteNote);

export default router;