import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Modal } from '../atoms';

const PhotoGallery = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [carouselOpen, setCarouselOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setCarouselOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setCarouselOpen(false);
  };

  const carousel = () => (
    <Carousel
      showArrows={true}
      dynamicHeight={true}
      infiniteLoop={true}
      useKeyboardArrows={true}
      selectedItem={currentImage}
      onChange={(index, item) => {setCurrentImage(index)}}
    >
      {photos.map((photo, i) => (
          <img key={i} src={photo.src} alt="us" />
      ))}
    </Carousel>
  );

  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} />
      {carouselOpen && <Modal
        content={carousel()}
        closeModal={closeLightbox}
      />}
    </div>
  );
}

export default PhotoGallery;
