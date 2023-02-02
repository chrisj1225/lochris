import React from 'react';
import styled from 'styled-components';

import { useEscape, useOutsideClick } from '../../hooks';

const Modal = ({ content, closeModal }) => {
  const modalRef = React.useRef();

  useOutsideClick(modalRef, () => {
    closeModal();
  })
  useEscape(modalRef, () => {
    closeModal();
  })

  return (
    <ModalBackground>
      <ModalContentWrapper ref={modalRef}>
        {content}
      </ModalContentWrapper>
    </ModalBackground>
  )
}

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(118, 118, 118, 0.45);
  backdrop-filter: blur(2px);
  top: 0;
  left: 0;
  z-index: 1100;
`;

const ModalContentWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(235, 235, 235);
  z-index: 1000;
  -webkit-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.15);
  -moz-box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.15);
  box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.15);
  border-radius: 10px;
  width: auto;
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-right: auto;
  margin-left: auto;
  max-height: 90%;
  max-width: 90%;
  overflow: auto;

  -webkit-animation: fadein 0.25s ease-in-out; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.25s ease-in-out; /* Firefox < 16 */
   -ms-animation: fadein 0.25s ease-in-out; /* Internet Explorer */
    -o-animation: fadein 0.25s ease-in-out; /* Opera < 12.1 */
       animation: fadein 0.25s ease-in-out;
`;

export default Modal;
