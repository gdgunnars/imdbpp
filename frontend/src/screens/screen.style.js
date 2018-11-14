import styled from 'styled-components';
import { Theme } from '../common';

const ScreenContainer = styled.ScrollView`
  position: relative;
  flex: 1;
  width: ${Theme.sizes.window.width};
  background-color: #141414;
`;

export default ScreenContainer;
