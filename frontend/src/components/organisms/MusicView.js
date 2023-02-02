import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ContentWrapper, Title } from '../../styles/ViewStyles';

const MusicView = () => {
  const location = useLocation();

  return (
    <ContentWrapper path={location.pathname}>
      <Title>This is the Music page</Title>
    </ContentWrapper>
  );
};

export default MusicView;
