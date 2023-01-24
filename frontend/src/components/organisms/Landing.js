import React from 'react';
import styled from 'styled-components';

import { ContentWrapper, Title } from '../../styles/ViewStyles';
import useRsvps from '../../hooks/useRsvps.hooks';
import useSessions from '../../hooks/useSessions.hooks';

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
