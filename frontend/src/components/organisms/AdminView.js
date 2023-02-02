import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { password } from '../../config/keys';
import { useSessions, useSessionErrors, useUsers, } from '../../hooks';
import { ContentWrapper, GeneralText, Title } from '../../styles/ViewStyles';
import { FormWrapper, InputWrapper, TextInput, ErrorMsg, SubmitButton } from '../../styles/FormStyles';

const AdminView = () => {
  const location = useLocation();

  const {
    signupGuest,
  } = useSessions();
  const { errors } = useSessionErrors();
  const { allUsers } = useUsers();

  const defaultRegisterForm = {
    email: '',
    firstName: '',
    lastName: '',
    plusOne: '',
    password,
    superuser: false,
    errors: {},
  };

  const [state, setState] = React.useState(defaultRegisterForm);

  const updateField = field => {
    return e => setState({
      ...state,
      [field]: e.currentTarget.value,
    })
  };

  const handleSubmit = e => {
    e.preventDefault();

    let user = {
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
      plusOne: state.plusOne,
      password: state.password,
      superuser: state.superuser,
    };

    signupGuest(user, () => {
      setState(defaultRegisterForm);
    });
  };

  // add capabilities:
  // View list of all guests
  // Search & Filter guests
  // Select guests & send email template via EmailJS

  return (
    <ContentWrapper path={location.pathname}>
      <Title>Admin</Title>
      <SectionHeader>Register New Guest</SectionHeader>
      <form onSubmit={handleSubmit}>
        <FormWrapper>
          <InputWrapper>
            <TextInput type="text"
              value={state.email}
              onChange={updateField('email')}
              placeholder="Email"
              />
            <ErrorMsg>{errors['email']}</ErrorMsg>
          </InputWrapper>
          <TextInput type="text"
            value={state.firstName}
            onChange={updateField('firstName')}
            placeholder="First Name"
            />
          <TextInput type="text"
            value={state.lastName}
            onChange={updateField('lastName')}
            placeholder="Last Name"
            />
          <TextInput type="text"
            value={state.plusOne}
            onChange={updateField('plusOne')}
            placeholder="Plus One Name"
            />
          <SubmitButton type="submit"
            value="Register">
            Register
          </SubmitButton>
        </FormWrapper>
      </form>
      <GeneralText>(Edit existing guests on MongoDB)</GeneralText>
    </ContentWrapper>
  );
};

const SectionHeader = styled.h1`
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
`;

export default AdminView;
