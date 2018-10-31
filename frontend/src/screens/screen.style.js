import styled from 'styled-components';
import * as DimSize from '../common/dimensionSize';

const ScreenContainer = styled.ScrollView`
  flex: 1;
  width: ${DimSize.width('100%')};
  background-color: #141414;
`;

export default ScreenContainer;
