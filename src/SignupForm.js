import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const SIGNUP_USER = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const SignupForm = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [signup] = useMutation(SIGNUP_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data } = await signup({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
    localStorage.setItem('token', data.signup.token);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={formState.username}
        onChange={(e) => setFormState({ ...formState, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(e) => setFormState({ ...formState, password: e.target.value })}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
