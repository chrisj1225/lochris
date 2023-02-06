import React from 'react';
import { useLocation } from 'react-router-dom';
import csvDownload from 'json-to-csv-export';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

import { password } from '../../config/keys';
import { useSessions, useSessionErrors, useUsers, useEmailJs } from '../../hooks';
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
  const { allUsers, userIdMap, getAllUsers, } = useUsers();

  const defaultRegisterForm = {
    email: '',
    firstName: '',
    lastName: '',
    plusOne: '',
    password,
    superuser: false,
    errors: {},
  };

  const [registerFormState, setRegisterFormState] = React.useState(defaultRegisterForm);
  const [selectedUserIds, setSelectedUserIds] = React.useState([]);

  const { handleSendTestEmail } = useEmailJs(selectedUserIds, userIdMap);

  const updateField = field => {
    return e => setRegisterFormState({
      ...registerFormState,
      [field]: e.currentTarget.value,
    })
  };

  const handleSubmit = e => {
    e.preventDefault();

    let user = {
      email: registerFormState.email,
      firstName: registerFormState.firstName,
      lastName: registerFormState.lastName,
      plusOne: registerFormState.plusOne,
      password: registerFormState.password,
      superuser: registerFormState.superuser,
    };

    signupGuest(user, () => {
      setRegisterFormState(defaultRegisterForm);
      getAllUsers();
    });
  };

  const handleExportGuestList = () => {
    const selectedUsers = selectedUserIds
      .map(id => userIdMap[id])
      .map(user => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        attending: user.attending || '-',
        plusOne: user.plusOne || '-',
        p1Attending: user.p1Attending || '-',
        status: user.status,
        email: user.email,
      }));
  
    const data = {
      data: selectedUsers,
      filename: 'guest-list',
      headers: ['ID', 'First Name', 'Last Name', 'Attending?', 'Plus One', 'P1 Attending?', 'Status', 'Email'],
    };

    csvDownload(data);
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 20,
      editable: false,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 140,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 120,
      editable: false,
    },
    {
      field: 'attending',
      headerName: 'Attending?',
      width: 90,
      editable: false,
    },
    {
      field: 'plusOne',
      headerName: 'PlusOne',
      width: 150,
      editable: false,
    },
    {
      field: 'p1Attending',
      headerName: 'P1 Attending?',
      width: 110,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: false,
    },
  ];

  console.log({allUsers, userIdMap});
  return (
    <ContentWrapper path={location.pathname}>
      <Title>Admin</Title>
      <SectionHeader>Register New Guest</SectionHeader>
      <form onSubmit={handleSubmit}>
        <FormWrapper>
          <InputWrapper>
            <TextInput type="text"
              value={registerFormState.email}
              onChange={updateField('email')}
              placeholder="Email"
              />
            <ErrorMsg>{errors['email']}</ErrorMsg>
          </InputWrapper>
          <TextInput type="text"
            value={registerFormState.firstName}
            onChange={updateField('firstName')}
            placeholder="First Name"
            />
          <TextInput type="text"
            value={registerFormState.lastName}
            onChange={updateField('lastName')}
            placeholder="Last Name"
            />
          <TextInput type="text"
            value={registerFormState.plusOne}
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
      <SectionHeader>Actions</SectionHeader>
      <ActionsWrapper>
        <button onClick={() => handleSendTestEmail()}>Send Test Email</button>
        <button onClick={() => handleExportGuestList()}>Export Guest List</button>
      </ActionsWrapper>
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

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StatusCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color}
`;

export default AdminView;
