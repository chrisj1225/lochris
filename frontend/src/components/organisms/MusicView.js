import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ContentWrapper, Title } from '../../styles/ViewStyles';

const MusicView = () => {
  const location = useLocation();

  return (
    <ContentWrapper path={location.pathname}>
      <Title>Music</Title>
    </ContentWrapper>
  );
};

export default MusicView;
