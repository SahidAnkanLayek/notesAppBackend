const express = require('express');
const { createNote, updateNote, deleteNote, getAllNotes, getNoteById } = require('../controllers/notesControler');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/:userId', auth, createNote);
router.get('/', auth,  getAllNotes);
router.get('/:id', auth, getNoteById);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);

module.exports = router;