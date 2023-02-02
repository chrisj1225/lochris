import React from 'react';
import styled from 'styled-components';

import { ContentWrapper } from '../../styles/ViewStyles';

const Footer = () => (
  <FooterWrapper>
    <FooterText>
      LP {'\u2665'} CJ
    </FooterText>
    <FooterSubText>
      Made by Chris Joo
    </FooterSubText>
  </FooterWrapper>
);

const FooterWrapper = styled(ContentWrapper)`
  // position: sticky;
  // left: 0;
  // bottom: 0;
  // right: 0;
  justify-content: center;
  width: 100%;
  height: 118px;
  padding: 0;
  border-top: 2px solid black;
`;

const FooterText = styled.p`
  font-size: 36px;
  font-weight: 500;
  margin: 0
`;
const FooterSubText = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin: 0
`;

export default Footer;
