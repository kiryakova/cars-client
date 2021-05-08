import styled from 'styled-components';

const firstColor = '#66B9F8';
//const firstColor = '#034a91';
//const secondColor = '#4d4d4d';
const secondColor = '#034a91';

export const FormInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FormInputField = styled.input`
  width: 100%;
  margin: 3px 0px;
  font-size: 18px;
  color: ${firstColor};
  padding: 5px 0px 5px 7px;
  border: 1px solid ${secondColor};
  border-radius: 5px;
  outline: none;
`;

export const FormInputFieldImage = styled.input`
width: 100%;
margin: 3px 0px;
font-size: 18px;
color: ${firstColor};
padding: 5px 0px 5px 32px;
border: 1px solid ${secondColor};
border-radius: 5px;
outline: none;
`;

export const FormInputLabel = styled.label`
  margin-top: 17px;
  color: ${secondColor};
  font-weight: bolder;
`;