import React, { useState } from 'react';

function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    onSave(note._id, { title, content });
  };

  return (
    <div className="note-editor">
      <h2>Edit Note</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <div class="save-cancel-button">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default NoteEditor;
