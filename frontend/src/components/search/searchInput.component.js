import React from 'react';
import styled from 'styled-components';
import { Icon } from 'expo';
import { Header } from 'react-navigation';
import * as DimSize from '../../common/dimensionSize';
import { navigate } from '../../navigation';


const InputContainer = styled.View`
  background: #424242;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${DimSize.statusBarHeight() + Header.HEIGHT};
  border-radius: 8;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16;
  padding-top: 10;
  padding-right: 10;
  padding-bottom: 10;
  margin-left: 7;
  color: white;
`;

const searchIcon = {
  padding: 10,
};

const SearchInput = ({ onSearch }) => (
  <InputContainer>
    <Input
      placeholder=" ... start typing"
      type="text"
      underlineColorAndroid="transparent"
      onChangeText={onSearch}
      autoFocus={true}
    />
    <Icon.FontAwesome name="camera" color="white" size={16} style={searchIcon} onPress={() => navigate('Camera', {})} />
  </InputContainer>
);

export default SearchInput;
