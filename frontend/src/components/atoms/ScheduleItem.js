import React from 'react';
import styled from 'styled-components';

import { GeneralText } from '../../styles/ViewStyles';

const ScheduleItem = ({ startTime, endTime, address, name, description, dressCode }) => {

  return (
    <ScheduleItemWrapper>
      <TimeDiv>
        <GeneralText>
          {`${startTime} - ${endTime}`}
        </GeneralText>
      </TimeDiv>
      <DetailsDiv>
        <DetailsTitle>{name}</DetailsTitle>
        <DetailsAddress>{address}</DetailsAddress>
        <GeneralText>{description}</GeneralText>
        <DressCodeText>
          <GeneralText>Dress Code:</GeneralText>
          <BoldText>{dressCode}</BoldText>
        </DressCodeText>
      </DetailsDiv>
    </ScheduleItemWrapper>
  );
};

const ScheduleItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  margin-bottom: 4px;
`;

const TimeDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DetailsTitle = styled(GeneralText)`
  font-weight: 600;
  margin-bottom: 8px;
`;

const DetailsAddress = styled(GeneralText)`
  color: #656D78;
  font-weight: 500;
  margin-bottom: 8px;
`;

const DressCodeText = styled.div`
  display: flex;
  align-items: center;
`;

const BoldText = styled(GeneralText)`
  font-weight: 600;
  margin: 0px 0px 0px 8px;
`;

export default ScheduleItem;
