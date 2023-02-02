import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  gap: 5px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%
`;

export const TextInput = styled.input`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  // margin-bottom: 5px;
`;

export const ErrorMsg = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: red;
  margin: 0;
`;

export const SubmitButton = styled.button`
  width: 100px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid black;
  background: white;
  cursor: pointer; 
`;