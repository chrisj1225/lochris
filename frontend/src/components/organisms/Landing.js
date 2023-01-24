import React from 'react';
import styled from 'styled-components';

import { Modal } from '../atoms';

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

  const modalObj = {
    editRsvp: (
      <RsvpFormWrapper>
        Hello
      </RsvpFormWrapper>
    ),
    viewRsvp: (
      <RsvpWrapper>
        Here is where the RSVP will be displayed
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
          <RsvpButton onClick={() => setActiveModal('editRsvp')}>
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

  console.log({ user, rsvpFetched, currentRsvp });
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
  height: 600px;
  padding: 24px;
`;

const RsvpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 600px;
`;

export default Landing;