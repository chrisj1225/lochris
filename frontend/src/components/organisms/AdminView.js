import React from 'react';
import { useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

import { password } from '../../config/keys';
import { useSessions, useSessionErrors, useUsers } from '../../hooks';
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
    });
  };

  // add functionalities:
  // Select guests & send email template via EmailJS

  const columns = [
    {
      field: 'id',
      header: 'ID',
      width: 20,
      editable: false,
    },
    {
      field: 'firstName',
      header: 'First Name',
      width: 150,
      editable: false,
    },
    {
      field: 'lastName',
      header: 'last Name',
      width: 120,
      editable: false,
    },
    {
      field: 'attending',
      header: 'Attending?',
      width: 80,
      editable: false,
    },
    {
      field: 'plusOne',
      header: 'PlusOne',
      width: 150,
      editable: false,
    },
    {
      field: 'p1Attending',
      header: 'P1 Attending?',
      width: 100,
      editable: false,
    },
    {
      field: 'status',
      header: 'Status',
      width: 100,
      editable: false,
    },
    {
      field: 'email',
      header: 'Email',
      width: 200,
      editable: false,
    },
  ];

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
        <DataGrid 
          rows={allUsers}
          columns={columns}
          pageSize={40}
          autoHeight
          rowsPerPageOptions={[40]}
          checkboxSelection
          selectionModel={selectedUserIds}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectedUserIds(newSelectionModel);
          }}
          />
      </GuestList>
      <GeneralText>{`Attending Guest Count (incl. Plus Ones): ${getConfirmedGuestCount(allUsers)}`}</GeneralText>
      <GeneralText>{`Selected Guest Count: ${selectedUserIds.length}`}</GeneralText>
    </ContentWrapper>
  );
};

const SectionHeader = styled.h1`
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
`;

const GuestList = styled.div`
  // height: 500px;
  width: 100%;
`;

const StatusCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color}
`;

export default AdminView;
