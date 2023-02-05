import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { password } from '../../config/keys';
import { useRsvps, useSessions, useSessionErrors, useUsers } from '../../hooks';
import { ContentWrapper, GeneralText, Title } from '../../styles/ViewStyles';
import { FormWrapper, InputWrapper, TextInput, ErrorMsg, SubmitButton } from '../../styles/FormStyles';
import { getUserRsvpStatus, statusColorMap, getConfirmedGuestCount } from '../../util/misc';

const AdminView = () => {
  const location = useLocation();

  const {
    user,
    signupGuest,
  } = useSessions();
  const { errors } = useSessionErrors();
  const { allUsers, getAllUsers } = useUsers();

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
      getAllUsers();
      // getAllRsvps();
    });
  };

  // add functionalities:
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
      <SectionHeader>~Guest List~</SectionHeader>
      <GuestList>
        <GuestItem key="heading">
          <GuestHeading>First Name</GuestHeading>
          <GuestHeading>Last Name</GuestHeading>
          <GuestHeading>Attending?</GuestHeading>
          <GuestHeading>Plus One</GuestHeading>
          <GuestHeading>P1 Attending?</GuestHeading>
          <GuestHeading>Status</GuestHeading>
          <GuestHeading>Email</GuestHeading>
        </GuestItem>
        {allUsers.map((user, userIdx) => {
          const currRsvpStatus = getUserRsvpStatus(user);
          const statusColor = statusColorMap[currRsvpStatus];

          return (
            <GuestLineItem key={`${user.lastName}-${userIdx}`}>
              <GeneralText>{user.firstName}</GeneralText>
              <GeneralText>{user.lastName}</GeneralText>
              <GeneralText>
                {user?.attending === 'y'
                  ? 'yes'
                  : user?.attending === 'n'
                    ? 'no'
                    : '-'
                }
              </GeneralText>
              <GeneralText>{user.plusOne || '-'}</GeneralText>
              <GeneralText>
                {user?.p1Attending === 'y'
                  ? 'yes'
                  : user?.p1Attending === 'n'
                    ? 'no'
                    : '-'
                }
              </GeneralText>
              <StatusCircle color={statusColor}/>
              <GeneralText>{user.email}</GeneralText>
            </GuestLineItem>
          );
        })}
      </GuestList>
      <GeneralText>{`Guest Count: ${getConfirmedGuestCount(allUsers)}`}</GeneralText>
    </ContentWrapper>
  );
};

const SectionHeader = styled.h1`
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
`;

const GuestList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // overflow-x: auto;
`;

const GuestItem = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
width: 100%;
padding: 0 8px;
align-items: center;
`;

const GuestHeading = styled(GeneralText)`
  font-weight: 600;
`;

const GuestLineItem = styled(GuestItem)`
  &:hover {
    background-color: #bdbdbd;
  }
`;

const StatusCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color}
`;

export default AdminView;
