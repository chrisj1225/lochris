import React from 'react';
import styled from 'styled-components';

import { useSessions, useSessionErrors } from '../../hooks';
import { FormWrapper, TextInput, ErrorMsg, SubmitButton } from '../../styles/FormStyles';

const LoginView = () => {
  const {
    loginUser,
  } = useSessions();
  const { errors } = useSessionErrors();

  const [state, setState] = React.useState({
    email: '',
    password: '',
    errors: {},
  });

  const updateField = field => {
    return e => setState({
      ...state,
      [field]: e.currentTarget.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let user = {
      email: state.email,
      password: state.password,
    }

    loginUser(user);
  };

  const emailError = errors['email'];
  const passwordError = errors['password'];

  return (
    <LoginWrapper>
      <LoginHeader>LOCHRIS</LoginHeader>
      <form onSubmit={handleSubmit}>
        <FormWrapper>
          <TextInput type="text"
            value={state.email}
            onChange={updateField('email')}
            placeholder="Email"
          />
          <ErrorMsg>{emailError}</ErrorMsg>
          <TextInput type="password"
            value={state.password}
            onChange={updateField('password')}
            placeholder="password"
          />
          <ErrorMsg>{passwordError}</ErrorMsg>
          <SubmitButton type="submit"
            value="Login">
            Login
          </SubmitButton>
        </FormWrapper>
      </form>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
`;

const LoginHeader = styled.h1`
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
`;

export default LoginView;
