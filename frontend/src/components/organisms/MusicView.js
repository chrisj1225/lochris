import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { device, ContentWrapper, Title } from '../../styles/ViewStyles';

const MusicView = () => {
  const location = useLocation();

  return (
    <ContentWrapper path={location.pathname}>
      <Title>Music</Title>
      <MusicWrapper>
      
      </MusicWrapper>
    </ContentWrapper>
  );
};

const MusicWrapper = styled.div`
  width: 800px;

  @media ${device.mobile} {
    width: 100%;
  }
  
  @media ${device.tablet} {
    width: 100%;
  }
`;

export default MusicView;
