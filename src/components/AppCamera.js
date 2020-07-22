import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { observer, inject } from 'mobx-react';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../helpers/colors';

@inject('Store')
@observer
class AppCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashMode: RNCamera.Constants.FlashMode.off,
      type: this.props.Store.cameraType || RNCamera.Constants.Type.back,
    };
  }

  componentDidMount() {
    this.props.Store.saveCameraPhoto(null)
  }

  toggleFlash = () => {
    const { flashMode } = this.state;
    const { on, off } = RNCamera.Constants.FlashMode;
    this.setState({ flashMode: flashMode === on ? off : on })
  }

  toggleCamera = () => {
    const { type } = this.state;
    const { front, back } = RNCamera.Constants.Type;
    this.setState({ type: type === front ? back : front })
  }

  takePicture = async function (camera) {
    const options = { quality: 1, base64: true };
    const data = await camera.takePictureAsync(options);
    if (data?.base64) {
      this.props.Store.saveCameraPhoto(data?.base64)
      this.goBack()
    }
  };

  goBack = () => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack(null)
    }
  }

  render() {
    const { flashMode, type } = this.state;
    return (
      <>
        <View style={styleSheet.container}>
          <RNCamera
            style={styleSheet.preview}
            type={type}
            flashMode={flashMode}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            {({ camera, status }) => {
              if (status === 'READY') {
                return (
                  <View style={styleSheet.actionContainer}>
                    <View style={styleSheet.header} >
                      {
                        type === RNCamera.Constants.Type.back &&
                        <TouchableOpacity onPress={this.toggleFlash}>
                          <Icon
                            name={flashMode === RNCamera.Constants.FlashMode.on ? "zap" : "zap-off"}
                            size={normalize(25)}
                            style={styleSheet.icon}
                          />
                        </TouchableOpacity>
                      }
                    </View>
                    <View style={styleSheet.footer} >
                      <TouchableOpacity onPress={this.goBack}>
                        <Icon
                          name={"x"}
                          size={normalize(30)}
                          style={styleSheet.icon}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styleSheet.snapContainer}
                        onPress={() => this.takePicture(camera)}
                      >
                        <View style={styleSheet.snap}>
                          <Icon
                            name={"camera"}
                            size={normalize(25)}
                            style={{ color: "white", margin: normalize(17) }}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.toggleCamera}>
                        <Icon
                          name={"refresh-ccw"}
                          size={normalize(25)}
                          style={styleSheet.icon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            }}
          </RNCamera>
        </View>
      </>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    borderTopStartRadius: normalize(30),
    borderTopEndRadius: normalize(30),
    overflow: 'hidden'
  },
  preview: {
    flex: 1,
  },
  actionContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    marginHorizontal: normalize(20),
    marginTop: normalize(20)
  },
  header: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: normalize(40),
  },
  footer: {
    height: normalize(100),
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  snapContainer: {
    backgroundColor: Colors.white,
    borderRadius: 100,
  },
  snap: {
    backgroundColor: Colors.blue,
    borderRadius: 100,
    margin: normalize(6),
  },

  icon: {
    color: "white",
    margin: normalize(10)
  }
});

export default AppCamera;