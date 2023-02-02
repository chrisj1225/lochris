import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ContentWrapper, Title } from '../../styles/ViewStyles';

const AdminView = () => {
  const location = useLocation();

  return (
    <ContentWrapper path={location.pathname}>
      <Title>Admin</Title>
    </ContentWrapper>
  );
};

export default AdminView;
