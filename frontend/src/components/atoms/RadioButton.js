import React from 'react';
import styled from 'styled-components';

const RadioButton = ({ id, text, onChange, name, value }) => (
  <RadioBtnWrapper>
    <RadioLabel htmlFor={id}>
      <input id={id} onChange={onChange} type="radio" name={name} value={value} />
      {text}
    </RadioLabel>
  </RadioBtnWrapper>
);  

export default RadioButton;

const RadioBtnWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const RadioLabel = styled.label`

`;

const RadioBtnInput = styled.input`

`;