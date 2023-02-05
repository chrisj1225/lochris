import React from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

import { password, emailJSKeys } from '../../config/keys';
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

  const handleSendTestEmail = () => {
    const selectedUsers = selectedUserIds.map(id =>  userIdMap[id]);
    selectedUsers.forEach((user) => {
      const templateParams = {
        email: user.email,
        to_firstName: user.firstName,
        to_lastName: user.lastName,
        reply_to: 'chrisj1225@gmail.com',
        message: 'You are cordially invited!',
      }

      if (user.plusOne) {
        templateParams.to_plusOne_name = user.plusOne;

        emailjs.send(
          emailJSKeys.serviceId,
          emailJSKeys.testP1TemplateId,
          templateParams,
          emailJSKeys.publicKey
        )
        .then((res) => {
          console.log({ status: res.status, text: res.text, msg: 'Success!', templateParams });

        })
        .catch((err) => console.log({ err, status: 'Failed' }));
      } else {
        emailjs.send(
          emailJSKeys.serviceId,
          emailJSKeys.testTemplateId,
          templateParams,
          emailJSKeys.publicKey
        )
        .then((res) => {
          console.log({ status: res.status, text: res.text, msg: 'Success!', templateParams });
        })
        .catch((err) => console.log({ err, status: 'Failed' }));
      }
    })

  };

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
      <button onClick={() => handleSendTestEmail()}>Send Test Email</button>
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
