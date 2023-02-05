import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ScheduleItem } from '../atoms';
import { device, ContentWrapper, Title } from '../../styles/ViewStyles';

const ScheduleView = () => {
  const location = useLocation();
  // Add a countdown timer to this page

  return (
    <ContentWrapper path={location.pathname}>
      <ScheduleWrapper>
        <Title>Schedule</Title>
        <ScheduleItemWrapper>
          <ScheduleItem
            startTime="5:00pm"
            endTime="6:00pm"
            address="Venue Name, 999 South Street, New York, NY, USA"
            name="Ceremony"
            description="Please join us by 4:45pm for the ceremony!"
            dressCode="Black Tie Optional" />
          <ScheduleItem
            startTime="6:00pm"
            endTime="7:00pm"
            address="Venue Name, 999 South Street, New York, NY, USA"
            name="Cocktail Hour"
            description="Please join us for some hors d'oeuvres and refreshments after the ceremony :)"
            dressCode="Black Tie Optional" />
          <ScheduleItem
            startTime="7:00pm"
            endTime="11:00pm"
            address="Venue Name, 999 South Street, New York, NY, USA"
            name="Reception"
            description="Party time!"
            dressCode="Black Tie Optional" />
        </ScheduleItemWrapper>
      </ScheduleWrapper>
    </ContentWrapper>
  );
};

const ScheduleWrapper = styled.div`
  width: 500px;

  @media ${device.mobile} {
    width: 100%
  }
  
  @media ${device.tablet} {
    width: 100%
  }
`;
const ScheduleItemWrapper = styled.div`
  margin: 10px 0px;
`;

export default ScheduleView;
