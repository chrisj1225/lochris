import styled from 'styled-components';

import { getPageColorFromPath } from '../util/misc';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 10%;
  height: 100%;
  background-color: ${(props) => getPageColorFromPath(props.path)};
`;

export const Title = styled.h1`
  color: navy;
  margin: 0;
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