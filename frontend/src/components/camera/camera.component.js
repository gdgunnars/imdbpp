import React from 'react';
import styled from 'styled-components';
import { Text, View } from 'react-native';
import {
  Camera, Permissions, ImageManipulator, Icon,
} from 'expo';

const Container = styled.View`
  flex: 1;
`;

const Cam = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  position: relative;
`;

const Flip = styled.TouchableOpacity`
  flex: 0.1;
  alignself: flex-end;
  alignitems: center;
`;

const FlipContainer = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: center;
  padding-top: 20;
  padding-right: 20;
`;

const SnapContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TakePicture = styled.TouchableOpacity`
  flex: 0.2;
  align-items: center;
`;

export default class SearchCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  camera = null;

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ exif: true });

      // We need to orientate the picture correctly based on EXIF metadata
      // Otherwise it's always in landscape orientation
      photo = await ImageManipulator.manipulate(
        photo.uri,
        [
          {
            rotate: -photo.exif.Orientation,
          },
          {
            resize: {
              width: photo.width,
              height: photo.height,
            },
          },
        ],
        { compress: 1 },
      );

      console.log(photo);
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

  render() {
    const { hasCameraPermission, type } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to the camera.</Text>;
    }

    return (
      <Container>
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
                  color="white"
                  size={36}
                />
              </Flip>
            </FlipContainer>
            <SnapContainer>
              <TakePicture onPress={this.snap}>
                <Icon.Ionicons name="ios-camera" color="white" size={64} />
              </TakePicture>
            </SnapContainer>
          </Cam>
        </Camera>
      </Container>
    );
  }
}
