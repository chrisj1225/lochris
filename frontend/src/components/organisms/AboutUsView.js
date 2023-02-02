import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ContentWrapper, GeneralText, Title } from '../../styles/ViewStyles';

const AboutUsView = () => {
  const location = useLocation();

  return (
    <ContentWrapper path={location.pathname}>
      <AboutUsWrapper>
        <Title>Our Story</Title>
        <GeneralText>
          Add photo here
        </GeneralText>
        <GeneralText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus bibendum sapien, at vestibulum eros. Nam in augue dapibus, lacinia nunc quis, aliquam neque. Vestibulum imperdiet ipsum nec porta tincidunt. Mauris nec quam sed est sodales dignissim. Aliquam erat volutpat. Proin et semper ipsum, et euismod sapien. Sed enim quam, malesuada vel cursus ac, lacinia vel ante. Suspendisse bibendum accumsan ipsum nec porttitor. Praesent lobortis sapien quis turpis consectetur, eu fermentum sapien faucibus. Pellentesque condimentum malesuada nibh eleifend sagittis. Nulla eget faucibus nibh. Sed in mi nec elit sodales imperdiet quis quis erat.
        </GeneralText>
        <GeneralText>
          Donec a varius odio. In massa metus, placerat eget urna sed, dapibus ultrices ligula. Donec convallis dictum diam cursus facilisis. Aenean elementum egestas mi ut luctus. Quisque vitae sem blandit, suscipit diam vitae, laoreet eros. Aliquam nulla dolor, gravida vitae neque eu, malesuada dapibus arcu. Etiam scelerisque ut ex ac accumsan. Nulla leo tellus, finibus ut cursus non, volutpat et tellus. Aliquam scelerisque sem aliquet sem cursus aliquet. Nulla efficitur nunc auctor, dignissim tortor vel, iaculis arcu. Curabitur eu purus in tortor venenatis bibendum a at justo. Vestibulum eget molestie mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </GeneralText>
        <GeneralText>
          Maecenas tincidunt massa ligula. In viverra porta augue, vitae pellentesque magna pretium lobortis. Aenean consectetur hendrerit velit, eget molestie massa bibendum a. Nullam turpis nibh, dictum vitae laoreet non, suscipit ut diam. Aenean aliquam lacus eget ultrices laoreet. Quisque dignissim venenatis diam non euismod. Aenean volutpat eros et lacinia semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque dictum est mattis, scelerisque orci a, tempus metus. Phasellus elementum nisi nec tempor rutrum. Maecenas tempus urna sed venenatis ornare. Donec sollicitudin odio a augue tristique, id pharetra tortor ullamcorper. Donec sapien libero, suscipit ut mattis et, tristique non lorem. Phasellus a ornare ipsum.
        </GeneralText>
        <GeneralText>
          In malesuada diam elit, ac tristique nulla elementum a. Duis consequat, nisl eget sollicitudin dignissim, mi arcu semper nulla, eget dignissim augue diam non nibh. Nam sagittis turpis vel turpis auctor, at vestibulum leo dictum. Donec ac nisi purus. Sed porta metus et tellus gravida efficitur. Mauris dictum porttitor pellentesque. Aenean auctor, tellus vel tincidunt rutrum, diam massa sollicitudin velit, eget imperdiet turpis nulla quis leo.
        </GeneralText>
        <GeneralText>
          Cras et urna cursus, scelerisque turpis quis, dictum lorem. Nullam luctus eu sapien et egestas. In facilisis, purus id rutrum ultricies, felis sapien porttitor metus, non sodales nibh sem ut nunc. Etiam faucibus bibendum dapibus. Nunc vel efficitur est. Praesent placerat lorem eu erat elementum bibendum. Mauris sed mollis libero. Vestibulum id nisl interdum libero finibus dictum at et libero. Curabitur iaculis facilisis purus et maximus. Aliquam sagittis interdum dui, id mattis tortor bibendum id. Proin eget nibh quis erat lacinia ullamcorper nec vel mi. Curabitur efficitur placerat ligula, in ultrices nunc placerat a. Nunc in lacus malesuada, commodo nisl suscipit, hendrerit lorem.
        </GeneralText>
      </AboutUsWrapper>
    </ContentWrapper>
  );
};

const AboutUsWrapper = styled.div`
  width: 500px;
`;

export default AboutUsView;
