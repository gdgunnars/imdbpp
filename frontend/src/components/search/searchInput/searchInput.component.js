import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { Header } from 'react-navigation';
import * as DimSize from '../../../common/dimensionSize';

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${DimSize.statusBarHeight() + Header.HEIGHT};
  background: #424242;
  border-radius: 7;
`;

const Input = styled.TextInput`
  flex: 1;
  padding-top: 10;
  padding-right: 10;
  padding-bottom: 10;
  margin-left: 7;
  color: white;
`;

const searchIcon = {
  padding: 10,
};

const SearchInput = () => {
  const d = 'data';
  return (
    <InputContainer>
      <Input placeholder=" ... start typing" type="text" underlineColorAndroid="transparent" />
      <Icon.FontAwesome name="camera" color="white" size={24} style={searchIcon} />
    </InputContainer>
  );
};

export default SearchInput;
