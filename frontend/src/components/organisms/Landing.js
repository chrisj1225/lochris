import React from 'react';
import styled from 'styled-components';

const Landing = () => {

  return (
    <Wrapper>
      <Title>This is the landing page</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: gray;
`;

const Title = styled.h1`
  color: lightblue;
  margin: 0;
`;

export default Landing;
