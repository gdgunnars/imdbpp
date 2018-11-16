import React from 'react';
import styled from 'styled-components';
import {
  DimSize, IsIos, MediaLink, Theme,
} from '../../common';
import { navigate } from '../../navigation';
import DefaultListItemImage from '../../../assets/images/defaultUserImage.png';

const CastListContainer = styled.View`
  margin-left: ${Theme.sizes.spaces.window.left};
  margin-right: ${Theme.sizes.spaces.window.right};
`;

const ListeItemContainer = styled.View`
  flex-direction: row;
  margin-top: ${DimSize.windowSidesPadding()};
  align-items: center;
`;

const ListItemNaviagtionContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
`;

const ListItemImageStyle = styled.Image`
  width: ${DimSize.width('20%')};
  height: ${DimSize.width('20%')};
  border-radius: ${DimSize.width(`${IsIos() ? '10%' : '12%'}`)};
`;

const ListItemImage = ({ url }) => {
  const source = url ? { uri: url } : DefaultListItemImage;
  return <ListItemImageStyle source={source} resizeMode="cover" />;
};

const ListTextColumn = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: ${DimSize.windowSidesPadding()};
  margin-right: ${DimSize.windowSidesPadding()};
`;

const ListItemName = styled.Text`
  font-size: 16;
  color: ${Theme.colors.text.light};
`;

const ListItemSubTitleContainer = styled.Text`
  font-size: 14;
  color: ${Theme.colors.text.default};
`;
const ListItem = ({ media, onPress }) => {
  const {
    posterPath, name, character, job,
  } = media;
  const subTitle = character ? `as ${character}` : job || '';
  return (
    <ListeItemContainer>
      <ListItemNaviagtionContainer onPress={onPress}>
        <ListItemImage url={posterPath} />
        <ListTextColumn>
          <ListItemName>{name}</ListItemName>
          <ListItemSubTitleContainer>{subTitle}</ListItemSubTitleContainer>
        </ListTextColumn>
      </ListItemNaviagtionContainer>
    </ListeItemContainer>
  );
};

const renderListItem = (list, listType) => list.map((item) => {
  const link = () => navigate(MediaLink(item));
  return <ListItem media={item} onPress={link} key={`${listType}_${item.id}`} />;
});

const CastList = ({ list, active, listType }) => {
  const lastItem = active ? list.length : 3;
  const renderedList = list.slice(0, lastItem);
  return <CastListContainer>{renderListItem(renderedList, listType)}</CastListContainer>;
};

export default CastList;
