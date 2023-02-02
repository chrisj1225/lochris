import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ContentWrapper, Title } from '../../styles/ViewStyles';

const MomentsView = () => {
  const location = useLocation();

  return (
    <ContentWrapper path={location.pathname}>
      <Title>This is the Moments page</Title>
    </ContentWrapper>
  );
};

export default MomentsView;
