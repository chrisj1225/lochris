import React from 'react';
import { useLocation } from 'react-router-dom';

import { photos } from '../../assets/photos';
import { PhotoGallery } from '../molecules';
import { ContentWrapper } from '../../styles/ViewStyles';

const MomentsView = () => {
  const location = useLocation();

  return (
    <ContentWrapper path={location.pathname}>
      <PhotoGallery photos={photos} />
    </ContentWrapper>
  );
};

export default MomentsView;
