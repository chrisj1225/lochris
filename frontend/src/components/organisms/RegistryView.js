import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { device, ContentWrapper, GeneralText, Title } from '../../styles/ViewStyles';

const RegistryView = () => {
  const location = useLocation();

  return (
    <ContentWrapper path={location.pathname}>
      <Title>Registry</Title>
      <GeneralText>Add Photo Here</GeneralText>
      <RegistryWrapper>
        <GeneralText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus bibendum sapien, at vestibulum eros. Nam in augue dapibus, lacinia nunc quis, aliquam neque. Vestibulum imperdiet ipsum nec porta tincidunt. Mauris nec quam sed est sodales dignissim. Aliquam erat volutpat. Proin et semper ipsum, et euismod sapien.
        </GeneralText>
      </RegistryWrapper>
    </ContentWrapper>
  );
};

const RegistryWrapper = styled.div`
  width: 500px;

  @media ${device.mobile} {
    width: 100%;
  }
  
  @media ${device.tablet} {
    width: 100%;
  }
`;

export default RegistryView;
