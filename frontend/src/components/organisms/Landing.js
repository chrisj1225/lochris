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

  const [rsvpModalOpen, setRsvpModalOpen] = React.useState(false);

  const rsvpBtn = () => {
    if (!rsvpFetched) {
      return (
        <p>Loading...</p>
      );
    } else {
      if (!Object.keys(currentRsvp).length) {
        return (
          <button onClick={() => setRsvpModalOpen(true)}>
            RSVP Now
          </button>
        );
      } else {
        return (
          <button onClick={() => {}}>
            Edit RSVP
          </button>
        );
      }
    }
  };

  console.log({ user, rsvpFetched, currentRsvp });
  return (
    <ContentWrapper>
      {rsvpModalOpen && (
        <Modal
          content={<div>hello</div>}
          closeModal={() => setRsvpModalOpen(false)}
        />
      )}
      <Title>This is the landing page</Title>
      {rsvpBtn()}
    </ContentWrapper>
  );
};

export default Landing;