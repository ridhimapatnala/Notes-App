import React, { useState } from 'react';

function NoteForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className="input-group">
      <h2>Add a Note</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <button onClick={handleSubmit}>Add Note</button>
    </div>
  );
}

export default NoteForm;
