import React, { PureComponent } from 'react';
import { WebView, View } from 'react-native';
import styled from 'styled-components';

// Extract key from youtube link
// TODO: Change API so that it just returns the key like it did originally

const getId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  }
  return 'error';
};

const Loading = styled.View`
  background-color: #141414;
`;

/* 
  THIS IS PRETTY MUCH THE ONLY WAY TO PLAY YOUTUBE VIDEOS WITH REACT-NATIVE AND EXPO.
  There is a library called react-native-youtube but Expo doesnt support it.
  Expo's native <Video> component does not support YouTube videos either.

  WebView is pretty much an iFrame, it sucks but its the only way to implement YouTube videos.
*/

class Trailer extends PureComponent {
  render() {
    const { src, width, height } = this.props;
    const id = getId(src);
    const url = `https://www.youtube.com/embed/${id}?rel=0&autoplay=0&controls=0&modestbranding=1`;

    return (
      <View style={{ width, height }}>
        <WebView source={{ uri: url }} style={{ width, height }} scrollEnabled={false} allowsInlineMediaPlayback javaScriptEnabled startInLoadingState renderLoading={() => <Loading />} />
      </View>
    );
  }
}

export default Trailer;
