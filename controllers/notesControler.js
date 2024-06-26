// const Note = require('../models/Note')

// exports.createNote = async (req, res) => {
//     const { title, content } = req.body;
//     const note = new Note({ title, content});
//     await note.save();
//     res.status(201).send(note);
// };

// exports.getAllNotes = async (req, res) => {
//     const notes = await Note.find();
//     if(notes.length === 0) res.send({"message" : "No Notes found"})
//     else res.send(notes);
// };

// exports.getNoteById = async (req, res) => {
//     const note = await Note.findOne({ _id: req.params.id});
//     if (note) return res.status(404).send({"message" : 'Note such not found'});
//     res.send(note);
// };

// exports.updateNote = async (req, res) => {
//     const { title, content } = req.body;
//     const note = await Note.findOneAndUpdate(
//         { _id: req.params.id, userId: req.user._id },
//         { title, content },
//         { new: true }
//     );
//     if (!note) return res.status(404).send('Note not found');
//     res.send(note);
// };

// exports.deleteNote = async (req, res) => {
//     const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
//     if (!note) return res.status(404).send('Note not found');
//     res.send(note);
// };



//=======================
const express = require('express');
const Note = require('../models/Note'); // Adjust the path accordingly
// const { auth } = require('./middlewares/auth'); // Adjust the path accordingly

// Create a note
exports.createNote = async (req, res) => {
    const userId = req.params.userId;
    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content,
            userID: userId  // Correctly reference the userID field here
        });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id });
        if (notes.length === 0) return res.send({ "message": "No Notes found" });
        res.send(notes);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
        if (!note) return res.status(404).send({ "message": "Note not found" });
        res.send(note);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { title, content },
            { new: true }
        );
        if (!note) return res.status(404).send('Note not found');
        res.send(note);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!note) return res.status(404).send('Note not found');
        res.send(note);
    } catch (error) {
        res.status(500).send(error);
    }
};
