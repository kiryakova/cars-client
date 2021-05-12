import styled from 'styled-components';

const firstColor = '#66B9F8';

const secondColor = '#034a91';
//const secondColor = '#4d4d4d';

export const FormDropdownContainerInSearchMenu = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FormDropdownContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FormDropdownField = styled.select`
  width: 100%;
  margin: 3px 0px;
  font-size: 18px;
  color: ${firstColor};
  padding: 5px 0px 5px 7px;
  border: 1px solid ${secondColor};
  border-radius: 5px;
  outline: none;
`;

export const FormDropdownOption = styled.option`
  width: 100%;
  margin: 3px 0px;
  font-size: 18px;
  color: ${firstColor};
  padding: 5px 0px 5px 7px;
`;

export const FormDropdownLabel = styled.label`
  margin-top: 17px;
  color: ${secondColor};
  font-weight: bolder;
`;