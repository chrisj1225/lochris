import styled from 'styled-components';

import { getPageColorFromPath } from '../util/misc';

const sizes = {
  mobile: '320px',
  tablet: '480px',
  desktop: '950px',
};

export const device = {
  mobile: `(min-width: ${sizes.mobile}) and (max-width: ${sizes.tablet})`,
  tablet: `(min-width: ${sizes.tablet}) and (max-width: ${sizes.desktop})`,
};

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 10% 24px 10%;
  background-color: ${(props) => getPageColorFromPath(props.path)};
`;

export const Title = styled.h1`
  font-size: 32px;
  color: #16191C;
  margin: 0;
`;

export const GeneralText = styled.p`
color: #16191C;
font-size: 14px;
line-height: 21px;
margin: 5px 0px;
`;

export const ActionButton = styled.button`
  padding: 4px 8px;
  margin: 4px;
  font-size: 14px;
  color: black;
  border-radius: 8px;
  background: white;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    color: white;
    background: #F2AAC9;
  }
`;

export const GreyLine = styled.div`
  width: 80%;
  height: 0px;
  border-top: 1px solid #656D78;
  margin-bottom: 16px;
`;
