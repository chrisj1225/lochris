import React from 'react';
import styled from 'styled-components';

import { mapTypeToTravelIcon } from '../../util/misc';
import { GeneralText, GreyLine } from '../../styles/ViewStyles';

const TravelItem = ({ showGreyLine, type, title, content }) => {

  return (
    <>
      <TravelItemWrapper>
        <IconDiv>
          {mapTypeToTravelIcon(type)}
        </IconDiv>
        <DetailsDiv>
          <TravelTitle>{title}</TravelTitle>
          {content}
        </DetailsDiv>
      </TravelItemWrapper>
      {showGreyLine && <GreyLine />}
    </>
  );
};

const TravelItemWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 12px;
`;

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TravelTitle = styled(GeneralText)`
  font-weight: 600;
  margin: 0;
`;

export default TravelItem;
