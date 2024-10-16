import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import AddNote from './AddNote';
import { useState } from 'react';
import NotesList from './NotesList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return (
      <div>
        <h1>Sign Up or Log In</h1>
        <SignupForm />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h1>My Notes</h1>
      <AddNote />
      <NotesList />
    </div>
  );
};

export default App;

