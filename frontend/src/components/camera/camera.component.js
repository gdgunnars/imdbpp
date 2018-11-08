import React from 'react';
import styled from 'styled-components';
import { Text, View, ImageStore } from 'react-native';
import {
  Camera, Permissions, ImageManipulator, Icon,
} from 'expo';
import { Theme } from '../../common';

const Img = styled.Image`
  width: 250;
  height: 250;
`;

const Cam = styled.View`
  padding-top: ${Theme.sizes.statusBar.height};
  padding-left: ${Theme.sizes.spaces.window.left};
  padding-right: ${Theme.sizes.spaces.window.right};
  flex: 1;
  background-color: transparent;
  flex-direction: row;
`;

const Flip = styled.TouchableOpacity`
  align-self: flex-end;
`;

const FlipContainer = styled.View`
  position: absolute;
  top: ${Theme.sizes.spaces.window.top};
  right: ${Theme.sizes.spaces.window.right};
  padding-top: ${Theme.sizes.spaces.window.top};
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

const ImageResContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.Button`
  margin-top: ${Theme.sizes.spaces.content.medium.top};
  background-color: ${Theme.colors.background.tv};
`;

// Todo: Remember to comment out TabNavigation in frontend/src/navigation/index.js to see the camera button.
export default class SearchCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    parsingImage: false,
    imgUrl: null,
  };

  camera = null;

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  snap = async () => {
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

  onImageBtnPressHandler = () => {
    // imgUrl is base64
    const { imgUrl } = this.state;
    console.log(encodeURI(imgUrl)); // I have no clue what format this should be sent on.,. :S
  };

  render() {
    const { hasCameraPermission, type, imgUrl } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to the camera.</Text>;
    }
    if (imgUrl) {
      return (
        <ImageResContainer>
          <Img source={{ uri: `data:image/jpeg;base64,${imgUrl}` }} resizeMode="contain" />
          <Btn onPress={this.onImageBtnPressHandler} title="Send image" />
        </ImageResContainer>
      );
    }

    return (
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          this.camera = ref;
        }}
      >
        <Cam>
          <FlipContainer>
            <Flip onPress={this.flip}>
              <Icon.Ionicons
                name="ios-reverse-camera"
                color={Theme.colors.text.default}
                size={Theme.sizes.text.grand}
              />
            </Flip>
          </FlipContainer>
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
