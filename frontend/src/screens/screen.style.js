import styled from 'styled-components';
import * as DimSize from '../common/dimensionSize';

const NavigationStyle = {
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
    color: '#fefefe',
    fontWeight: 'normal',
    fontSize: 16,
  },
  headerStyle: {
    elevation: 0,
  },
  headerTransparent: true,
};

const ScreenContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: ${DimSize.width('100%')};
  height: ${DimSize.height('100%')};
  background-color: #141414;
  padding-top: ${DimSize.statusBarHeight()};
`;

export { NavigationStyle, ScreenContainer };
