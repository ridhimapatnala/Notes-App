import React from 'react';

function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <div className="edit-delete-buttons">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default NoteItem;
