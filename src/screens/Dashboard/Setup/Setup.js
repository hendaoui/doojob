import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, ImageBackground} from 'react-native';
import styles from '../../../helpers/styles';
import AppText from '../../../components/AppText';
import normalize from 'react-native-normalize';
import Colors from '../../../helpers/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppButton from '../../../components/AppButton';
import {observer, inject} from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import Androw from 'react-native-androw';
import AppModal from '../../../components/AppModal';
import {apiConfig} from '../../../helpers/apiConfig';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
var empty = require('is-empty');
import 'mobx-react-lite/batchingForReactNative';

@inject('Store')
@observer
export default class SetupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardFace: 'front',
      frontPhoto: null,
      backPhoto: null,
      profilePhoto: null,
      step: 1,
      accountType: 'regular',
      isValidForm: '',
      modal: {
        showModal: false,
        statuts: 'success',
        title: 'Congratulations!',
        description: 'Your Account is ready to use.',
      },
    };
  }
  componentDidMount() {
    this.props.Store.setCameraType('back');
    this.props.navigation.addListener('focus', () => {
      if (this.props.Store.cameraPurpose === 'profilePhoto') {
        this.setState({profilePhoto: this.props.Store?.cameraPhoto});
      } else {
        this.setState({
          [this.state.cardFace + 'Photo']: this.props.Store?.cameraPhoto,
        });
      }
    });
  }

  takePhoto = (cardFace) => {
    this.setState({cardFace});
    this.props.navigation.navigate('camera');
  };

  takeProfilePhoto = () => {
    this.props.Store.setCameraPurpose('profilePhoto');
    this.props.Store.setCameraType('front');
    this.props.navigation.navigate('camera');
  };

  verifyAccount() {
    this.props.Store.toggleSpinner(true);
    const {backPhoto, frontPhoto} = this.state;
    let modal = {...this.state.modal};
    axios
      .post(
        apiConfig.API.PROFILE.VERIFY_ACCOUNT,
        {
          cardBack: backPhoto,
          cardFace: frontPhoto,
          email: this.props.Store.currentUser?.email,
        },
        {headers: {Authorization: 'Bearer ' + this.props.Store.accessToken}},
      )
      .then((response) => {
        this.props.Store.toggleSpinner(false);
        modal.showModal = true;
        this.setState({modal: modal});
        const {cardBack, cardFace, password, ...data} = response.data;
        AsyncStorage.setItem('userData', JSON.stringify(data))
      })
      .catch((error) => {
        this.props.Store.toggleSpinner(false);
        modal.showModal = true;
        modal.statuts = 'error';
        modal.title = 'Oops!';
        modal.description =
          '[' +
          error.response.data.statusCode +
          '] ' +
          error.response.data.message;
        this.setState({modal: modal});
      });
  }

  componentWillUnmount() {
    this.props.Store.setCameraPurpose(null);
    this.props.Store.saveCameraPhoto(null);
  }

  changeAccountType = (type) => {
    this.setState({accountType: type});
  };

  renderAccountType = () => {
    return (
      <>
        <AppText style={{color: Colors.text, marginBottom: normalize(20)}}>
          Please choose your account's type:
        </AppText>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{width: '35%'}}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styleSheet.roleIcon,
                this.state.accountType === 'regular' && styleSheet.blueBorder,
              ]}
              onPress={() => this.changeAccountType('regular')}>
              <Icon
                name={'user'}
                size={normalize(45)}
                style={styleSheet.innerRoleIcon}
              />
              <AppText>Regular</AppText>
            </TouchableOpacity>
          </View>
          <View style={{width: '35%'}}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styleSheet.roleIcon,
                this.state.accountType === 'repairman' && styleSheet.blueBorder,
              ]}
              onPress={() => this.changeAccountType('repairman')}>
              <Icon
                name={'user'}
                size={normalize(45)}
                style={styleSheet.innerRoleIcon}
              />
              <AppText>Repairman</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  render() {
    const {backPhoto, frontPhoto} = this.state;

    const isFormValid = !empty(backPhoto) && !empty(frontPhoto);
    return (
      <>
        <AppModal
          status={this.state.modal.statuts}
          title={this.state.modal.title}
          description={this.state.modal.description}
          visible={this.state.modal.showModal}
          onPress={() => {
            let modal = {...this.state.modal};
            modal.showModal = false;
            this.setState({modal: modal});
            if (this.state.modal.statuts === 'success')
              this.props.navigation.replace('dashboard');
          }}
        />
        <View style={styles.screenWrapperWithRadius}>
          <ScrollView style={styles.scrollView}>
            <AppText style={{...styles.screenTitle, marginTop: normalize(30)}}>
              Setup Your Account
            </AppText>
            {this.state.step === 1 ? (
              <>
                <AppText
                  style={{color: Colors.text, marginBottom: normalize(20)}}>
                  Please place your national ID card on a flat surface, then
                  take a clear phto from above.
                </AppText>
                <TouchableOpacity
                  style={styleSheet.card}
                  onPress={() => this.takePhoto('front')}>
                  {!this.state.frontPhoto ? (
                    <AppText>Front Face</AppText>
                  ) : (
                    <ImageBackground
                      source={{uri: this.state.frontPhoto}}
                      style={styleSheet.photo}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styleSheet.card}
                  onPress={() => this.takePhoto('back')}>
                  {!this.state.backPhoto ? (
                    <AppText>Back Face</AppText>
                  ) : (
                    <ImageBackground
                      source={{uri: this.state.backPhoto}}
                      style={styleSheet.photo}
                    />
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* <AppModal status="success" title="Congratulations!" description="Your accout is ready to use."
                  visible={this.state.showModal}
                  onPress={() => { this.setState({ showModal: false }) }}
                /> */}
                <AppText
                  style={{color: Colors.text, marginVertical: normalize(20)}}>
                  Profile photo:
                </AppText>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Androw style={styleSheet.shadow}>
                    <TouchableOpacity
                      style={styleSheet.profilePhoto}
                      onPress={() => this.takeProfilePhoto()}>
                      {!this.state.profilePhoto ? (
                        <Icon name={'upload'} size={normalize(75)} />
                      ) : (
                        <ImageBackground
                          source={{uri: this.state.profilePhoto}}
                          style={styleSheet.photo}
                        />
                      )}
                    </TouchableOpacity>
                  </Androw>
                </View>
                {this.renderAccountType()}
              </>
            )}
          </ScrollView>
          <View
            style={{
              flex: 0,
              marginHorizontal: normalize(20),
              marginBottom: normalize(20),
              flexDirection: 'column-reverse',
            }}>
            <AppButton
              title="Done"
              disabled={!isFormValid}
              onPress={() => this.verifyAccount()}
            />
          </View>
        </View>
      </>
    );
  }
}

const styleSheet = StyleSheet.create({
  card: {
    borderColor: Colors.blue,
    borderRadius: normalize(20),
    borderWidth: normalize(4),
    borderStyle: 'dashed',
    height: normalize(170),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(40),
    marginVertical: normalize(20),
  },
  photo: {
    height: '100%',
    width: '100%',
    opacity: 1,
    position: 'absolute',
    borderRadius: normalize(17),
    overflow: 'hidden',
  },
  roleIcon: {
    borderColor: 'transparent',
    borderRadius: normalize(20),
    borderWidth: normalize(4),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  blueBorder: {
    borderColor: Colors.blue,
  },
  innerRoleIcon: {
    color: Colors.navyBlue,
  },
  profilePhoto: {
    flex: 1,
    aspectRatio: 1,
    borderColor: Colors.blue,
    borderRadius: normalize(20),
    height: normalize(200),
    backgroundColor: Colors.darkGray,
    borderWidth: normalize(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(40),
    marginBottom: normalize(40),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
});
