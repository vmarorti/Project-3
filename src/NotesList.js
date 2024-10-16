import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch notes from backend
    const fetchNotes = async () => {
      const res = await axios.get('/api/notes');
      setNotes(res.data);
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    const newNote = { title, content };
    const res = await axios.post('/api/notes', newNote);
    setNotes([...notes, res.data]);
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map(note => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
      <h2>Add New Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default NotesList;
