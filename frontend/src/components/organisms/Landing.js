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
          <button onClick={() => setActiveModal('editRsvp')}>
            RSVP Now
          </button>
        );
      } else {
        return (
          <button onClick={() => setActiveModal('viewRsvp')}>
            View RSVP
          </button>
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

const RsvpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 600px;
`;

const RsvpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 600px;
`;

export default Landing;