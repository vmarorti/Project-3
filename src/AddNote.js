import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const ADD_NOTE = gql`
  mutation AddNote($title: String!, $content: String!) {
    addNote(title: $title, content: $content) {
      _id
      title
      content
    }
  }
`;

const AddNote = () => {
  const [formState, setFormState] = useState({ title: '', content: '' });
  const [addNote] = useMutation(ADD_NOTE);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addNote({
      variables: {
        title: formState.title,
        content: formState.content,
      },
    });
    setFormState({ title: '', content: '' });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formState.title}
        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={formState.content}
        onChange={(e) => setFormState({ ...formState, content: e.target.value })}
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;
