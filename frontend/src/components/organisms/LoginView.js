import React from 'react';
import styled from 'styled-components';

import useSessions from '../../hooks/useSessions.hooks';
import useSessionErrors from '../../hooks/useSessionErrors.hooks';

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
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    let user = {
      email: state.email,
      password: state.password,
    }

    loginUser(user);
  }

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

const LoginHeader = styled.h1`
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  gap: 5px;
`;

const TextInput = styled.input`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  // margin-bottom: 5px;
`;

const ErrorMsg = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: red;
  margin: 0;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid black;
  background: white;
  cursor: pointer; 
`;

export default LoginView;
