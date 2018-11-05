import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as DimSize from '../../common/dimensionSize';

const RecentSearchContainer = styled.View`
  padding-top: ${DimSize.windowSidesPadding()};
  margin-left: ${DimSize.windowSidesPadding()};
  margin-right: ${DimSize.windowSidesPadding()};
  flex: 1;
  background-color: hotpink;
`;

const RecentSearchTitle = styled.Text`
  color: #fefefe;
  font-size: 16;
  flex: 1;
  text-align: center;
`;

class RecentSearches extends PureComponent {
  render() {
    return (
      <RecentSearchContainer>
        <RecentSearchTitle>Recent Searches</RecentSearchTitle>
      </RecentSearchContainer>
    );
  }
}

export default RecentSearches;
