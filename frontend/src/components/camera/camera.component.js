import React from 'react';
import styled from 'styled-components';
import { Text, View, ImageStore } from 'react-native';

import {
  Camera, Permissions, ImageManipulator, Icon,
} from 'expo';
import { Theme, DimSize } from '../../common';
import { navigate, goBack } from '../../navigation';
import { getVisionSearchData } from '../../services';
import Loading from '../loading';
import NotFound from './notfound.component';

const Cam = styled.View`
  padding-top: ${Theme.sizes.statusBar.height};
  padding-left: ${Theme.sizes.spaces.window.left};
  padding-right: ${Theme.sizes.spaces.window.right};
  flex: 1;
  background-color: transparent;
  flex-direction: row;
`;

const TopIconsContainer = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  top: ${Theme.sizes.spaces.window.top};
  padding-top: ${Theme.sizes.spaces.content.medium.top};
  left: 0;
  right: 0;
  padding-left: ${Theme.sizes.spaces.window.left};
  padding-right: ${Theme.sizes.spaces.window.right};
`;

const SnapContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const TakePicture = styled.TouchableOpacity`
  align-items: center;
`;

const LoadingContainer = styled.View`
  flex: 1;
`;

// Todo: Remember to comment out TabNavigation in frontend/src/navigation/index.js to see the camera button.
export default class SearchCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    parsingImage: false,
    imgUrl: null,
    loading: false,
    notFound: false,
  };

  camera = null;

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  snap = async () => {
    this.setState({ loading: true });

    try {
      const { parsingImage } = this.state;

      if (this.camera && !parsingImage) {
        this.setState({
          parsingImage: true,
        });
        let photo = await this.camera.takePictureAsync({ exif: true });

        // We need to orientate the picture correctly based on EXIF metadata
        // Otherwise it's always in landscape orientation
        // More info: https://docs.expo.io/versions/v31.0.0/sdk/imagemanipulator
        photo = await ImageManipulator.manipulate(
          photo.uri,
          [
            {
              resize: {
                width: photo.width / 10, // The resize mode keeps ratio if we only specify width or height
              },
            },
          ],
          { compress: 1, base64: true },
        );

        this.setState({
          parsingImage: false,
          imgUrl: photo.base64,
        });

        this.sendImage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  flip = () => {
    const { type } = this.state;

    this.setState({
      type:
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  sendImage = async () => {
    // imgUrl is base64
    try {
      const { imgUrl } = this.state;
      const res = await getVisionSearchData(imgUrl);
      this.setState({ loading: false });
      console.log(res);

      if (res === null) {
        this.setState({ notFound: true });
        return;
      }

      navigate({ routeName: 'Search', params: { imgSearchRes: res } });
    } catch (error) {
      console.log('there was an error:', error);
    }
  };

  render() {
    const {
      hasCameraPermission, type, notFound, loading,
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to the camera.</Text>;
    }

    if (loading) {
      return (
        <LoadingContainer>
          <Loading isLoading={loading} fullScreen />
        </LoadingContainer>
      );
    }

    if (notFound) {
      return <NotFound />;
    }

    return (
      <Camera
        style={{ flex: 1, backgroundColor: Theme.colors.background.dark }}
        type={type}
        ref={(ref) => {
          this.camera = ref;
        }}
      >
        <Cam>
          <TopIconsContainer>
            <Icon.EvilIcons
              name="close"
              color={Theme.colors.text.default}
              size={Theme.sizes.text.grand}
              onPress={() => goBack()}
            />
            <Icon.Ionicons
              name="ios-reverse-camera"
              color={Theme.colors.text.default}
              size={Theme.sizes.text.grand}
              onPress={this.flip}
            />
          </TopIconsContainer>
          <SnapContainer>
            <TakePicture onPress={this.snap}>
              <Icon.Ionicons name="ios-camera" color={Theme.colors.text.light} size={64} />
            </TakePicture>
          </SnapContainer>
        </Cam>
      </Camera>
    );
  }
}
