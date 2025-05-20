require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((e) => console.log("Error: ", e));

// Model for Notes
const Note = mongoose.model('Note', new mongoose.Schema({
    title: { 
        type: String,
        required: true,
    },
    content: { 
        type: String,
        required: true,
    }
}));

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running');
});


// Get all notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({});
        res.json(notes);
    } catch (err) {
        console.error('Error fetching notes:', err);
        res.status(500).send('Server error');
    }
});

// Add a new note
app.post('/notes', async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            content: req.body.content,
        });
        await note.save();
        res.json(note);
    } catch (err) {
        console.error('Error adding note:', err);
        res.status(500).send('Server error');
    }
});

// Update a note
app.put('/notes/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content,
        }, { new: true });

        if (!updatedNote) {
            return res.status(404).send('Note not found');
        }

        res.json(updatedNote);
    } catch (err) {
        console.error('Error updating note:', err);
        res.status(500).send('Server error');
    }
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).send('Note not found');
        }

        res.json(deletedNote);
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
