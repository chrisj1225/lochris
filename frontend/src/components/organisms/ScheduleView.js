import React from 'react';
import styled from 'styled-components';

const ScheduleView = () => {

  return (
    <Wrapper>
      <Title>This is the Schedule page</Title>
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

export default ScheduleView;
