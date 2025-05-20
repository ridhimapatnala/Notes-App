/*  https://notes-app-4itf.onrender.com */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';
import NoteEditor from './NoteEditor';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/notes`)
      .then(res => setNotes(res.data));
  }, []);

  const addNote = (note) => {
    axios.post(`${process.env.REACT_APP_API_URL}/notes`, note)
      .then(res => setNotes([...notes, res.data]));
  };

  const updateNote = (id, updatedNote) => {
    axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, updatedNote)
      .then(res => {
        setNotes(notes.map(n => (n._id === id ? res.data : n)));
        setSelectedNote(null);
      });
  };

  const deleteNote = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/notes/${id}`)
      .then(() => setNotes(notes.filter(n => n._id !== id)));
  };

  return (
    <>
    <h1>Notes App</h1>
    <div className="App">
      <div className="input-section">
        <NoteForm onSubmit={addNote} />
      </div>
      <div className="notes-section">
        <h2>My Notes</h2>
        {notes.map(note => (
          <NoteItem
            key={note._id}
            note={note}
            onEdit={() => setSelectedNote(note)}
            onDelete={() => deleteNote(note._id)}
          />
        ))}
      </div>
      {selectedNote && (
        <NoteEditor
          note={selectedNote}
          onSave={updateNote}
          onCancel={() => setSelectedNote(null)}
        />
      )}
    </div>
    </>
  );
}

export default App;
