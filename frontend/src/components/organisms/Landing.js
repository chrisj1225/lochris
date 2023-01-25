import React from 'react';
import styled from 'styled-components';

import { Modal, RadioButton } from '../atoms';

import { useRsvps, useSessions }from '../../hooks/'
import { ContentWrapper, Title } from '../../styles/ViewStyles';

const Landing = () => {
  const { user } = useSessions();
  const {
    rsvpFetched,
    currentRsvp,
    createRsvp,
  } = useRsvps(user.id);

  const [activeModal, setActiveModal] = React.useState(null);

  const [rsvpForm, setRsvpForm] = React.useState({
    userId: user.id,
    attending: null,
  });

  const handleCreateRsvp = e => {
    e.preventDefault();
    createRsvp(rsvpForm);
  } 

  const modalObj = {
    createRsvp: (
      <RsvpFormWrapper>
        <p>Welcome {user.firstName} {user.lastName}!</p>
        <p>You have not yet RSVPed</p>
        <p>Will you be able to join us on XX/XX/2023?</p>
        <div>
          <RadioButton id="accept"
            text="Joyfully Accept" 
            onChange={(e) => setRsvpForm({
              ...rsvpForm,
              attending: e.target.value,
            })}
            name="attending"
            value={true}
          />
          <RadioButton id="decline"
            text="Regretfully Decline" 
            onChange={(e) => setRsvpForm({
              ...rsvpForm,
              attending: e.target.value,
            })}
            name="attending"
            value={false}
          />
        </div>
        {user.plusOne && <>
          <p>{`Will ${user.plusOne} be able to join us?`}</p>
          <div>
            <RadioButton id="p1accept"
              text="Joyfully Accept" 
              onChange={(e) => setRsvpForm({
                ...rsvpForm,
                p1Attending: e.target.value,
              })}
              name="p1attending"
              value={true}
            />
            <RadioButton id="p1decline"
              text="Regretfully Decline" 
              onChange={(e) => setRsvpForm({
                ...rsvpForm,
                p1Attending: e.target.value,
              })}
              name="p1attending"
              value={false}
            />
          </div>
        </>}
        <ActionButton onClick={handleCreateRsvp}>RSVP</ActionButton>
      </RsvpFormWrapper>
    ),
    editRsvp: (
      <RsvpFormWrapper>
        <p>Welcome Back {user.firstName} {user.lastName}!</p>
      </RsvpFormWrapper>
    ),
    viewRsvp: (
      <RsvpWrapper>
        <p>Here is where the RSVP will be displayed</p>
        <button>Edit Rsvp</button>
      </RsvpWrapper>
    )
  }

  const rsvpBtn = () => {
    if (!rsvpFetched) {
      return (
        <p>Loading...</p>
      );
    } else {
      if (!Object.keys(currentRsvp).length) {
        return (
          <RsvpButton onClick={() => setActiveModal('createRsvp')}>
            RSVP Now
          </RsvpButton>
        );
      } else {
        return (
          <RsvpButton onClick={() => setActiveModal('viewRsvp')}>
            View RSVP
          </RsvpButton>
        );
      }
    }
  };

  console.log({ user, rsvpFetched, currentRsvp, rsvpForm });
  return (
    <ContentWrapper>
      {activeModal && (
        <Modal
          content={modalObj[activeModal]}
          closeModal={() => setActiveModal(false)}
        />
      )}
      <Title>This is the landing page</Title>
      {rsvpBtn()}
    </ContentWrapper>
  );
};

const RsvpButton = styled.button`
  padding: 6px 10px;
  margin-top: 24px;
  font-size: 16px;
  line-height: 20px;
  color: black;
  border-radius: 8px;
  background: white;
  border: 1px solid black;
  cursor: pointer;
`;

const RsvpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 300px;
  padding: 24px;
`;

const RsvpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 300px;
  padding: 24px;
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  margin-top: 24px;
  font-size: 16px;
  line-height: 20px;
  color: black;
  border-radius: 8px;
  background: #39CA8E;
  border: 1px solid black;
  cursor: pointer;
`;

export default Landing;