import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login({
      variables: {
        email: formState.email,
        password: formState.password,
      },
    });
    localStorage.setItem('token', data.login.token);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}></input>
        </form>
  );
};
export default LoginForm;