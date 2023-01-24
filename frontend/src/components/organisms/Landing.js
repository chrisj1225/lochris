import React from 'react';
import styled from 'styled-components';

import { useRsvps, useSessions } from '../../hooks/'
import { ContentWrapper, Title } from '../../styles/ViewStyles';

const Landing = () => {
  const { user } = useSessions();
  const {
    rsvpFetched,
    currentRsvp,
    createRsvp,
  } = useRsvps(user.id);

  console.log({ user, rsvpFetched, currentRsvp });
  return (
    <ContentWrapper>
      <Title>This is the landing page</Title>
    </ContentWrapper>
  );
};

export default Landing;
