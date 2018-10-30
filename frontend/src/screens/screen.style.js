import styled from 'styled-components';
import * as DimSize from '../common/dimensionSize';

const ScreenContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: ${DimSize.width('100%')};
  height: ${DimSize.height('100%')};
  background-color: #141414;
  padding-top: ${DimSize.statusBarHeight()};
`;

export default ScreenContainer;
