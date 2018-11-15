import React from 'react';
import styled from 'styled-components';
import { navigate } from '../../navigation';
import { Theme } from '../../common';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Theme.colors.background.dark};
`;

const Face = styled.Text`
  font-size: ${Theme.sizes.text.enormous};
  color: ${Theme.colors.text.light};
`;

const Text = styled.Text`
  padding: 14px;
  font-size: ${Theme.sizes.text.huge};
  color: ${Theme.colors.text.default};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => (props.back ? Theme.colors.background.movie : Theme.colors.background.tv)};
  padding: 10px;
  border-radius: 6px;
  margin-top: 14px;
`;

const ButtonText = styled.Text`
  font-size: ${Theme.sizes.text.large};
  color: ${Theme.colors.text.light};
`;

export default () => (
  <Container>
    <Face>-_-</Face>
    <Text>Nothing found</Text>
    <Button onPress={() => navigate({ routeName: 'Camera' })}>
      <ButtonText>Try another image?</ButtonText>
    </Button>
    <Button onPress={() => navigate({ routeName: 'Search' })} back>
      <ButtonText>Back to search</ButtonText>
    </Button>
  </Container>
);
