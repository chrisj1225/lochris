import React from 'react';
import styled from 'styled-components';

const TravelView = () => {

  return (
    <Wrapper>
      <Title>This is the Travel page</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: lightgray;
`;

const Title = styled.h1`
  color: navy;
  margin: 0;
`;

export default TravelView;