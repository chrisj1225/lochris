import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { TravelItem } from '../atoms';
import { ContentWrapper, GeneralText, Title } from '../../styles/ViewStyles';

const TravelView = () => {
  const location = useLocation();

  const travelItems = [
    {
      type: "airplane",
      title: "Flying In",
      content: <GeneralText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus bibendum sapien, at vestibulum eros. Nam in augue dapibus, lacinia nunc quis, aliquam neque.</GeneralText>
    },
    {
      type: "train",
      title: "Taking a train from Manhattan",
      content: <GeneralText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus bibendum sapien, at vestibulum eros. Nam in augue dapibus, lacinia nunc quis, aliquam neque.</GeneralText>
    },
    {
      type: "car",
      title: "Driving from NYC",
      content: <GeneralText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus bibendum sapien, at vestibulum eros. Nam in augue dapibus, lacinia nunc quis, aliquam neque.</GeneralText>
    },
    {
      type: "hotel",
      title: "Lodging",
      content: <GeneralText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus bibendum sapien, at vestibulum eros. Nam in augue dapibus, lacinia nunc quis, aliquam neque.</GeneralText>
    },
    {
      type: "food",
      title: "Our favorite restaurants",
      content: <GeneralText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus bibendum sapien, at vestibulum eros. Nam in augue dapibus, lacinia nunc quis, aliquam neque.</GeneralText>
    },
  ];

  return (
    <ContentWrapper path={location.pathname}>
      <Title>Travel</Title>
      <TravelWrapper>
        {travelItems.map((item, i) => (
          <TravelItem
            key={`${item.type}-${i}`}
            showGreyLine={i !== travelItems.length - 1}
            type={item.type}
            title={item.title}
            content={item.content}
          />
        ))}
      </TravelWrapper>
    </ContentWrapper>
  );
};

const TravelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
`;

export default TravelView;
