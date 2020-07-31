import React from 'react';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import normalize from 'react-native-normalize';
import {inject, observer} from 'mobx-react';
import AppModal from '../../components/AppModal';
var empty = require('is-empty');
import axios from 'axios';
import {apiConfig} from '../../helpers/apiConfig';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';

@inject('Store')
@observer
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showModal: false,
      modalDescription: '',
    };
  }

  login = () => {
    this.props.Store.toggleSpinner(true);
    const {email, password} = this.state;
    axios
      .post(apiConfig.API.AUTH.LOGIN, {
        email,
        password,
      })
      .then((response) => {
        this.props.Store.toggleSpinner(false);
        try {
          AsyncStorage.setItem('accessToken', response.data.accessToken).then(() => {
            let data = jwt_decode(response.data.accessToken);
            AsyncStorage.setItem('userData', JSON.stringify(data)).then(() => {
              this.props.navigation.replace('dashboard');
            });
          });
        } catch (error) {}
      })
      .catch((error) => {
        this.props.Store.toggleSpinner(false);
        this.setState({
          showModal: true,
          modalDescription:
            '[' +
            error.response.data.statusCode +
            '] ' +
            error.response.data.message,
        });
      });
  };

  render() {
    const {email, password} = this.state;

    const isFormValid = !empty(email) && !empty(password);

    return (
      <>
        <AppModal
          status="error"
          title="Oops!"
          description={this.state.modalDescription}
          visible={this.state.showModal}
          onPress={() => {
            this.setState({showModal: false});
          }}
        />
        <AppInput
          label="Email"
          value={email}
          autoCapitalize = 'none'
          onChange={(val) => this.setState({email: val})}
        />
        <AppInput
          label="Password"
          type="password"
          value={password}
          onChange={(val) => this.setState({password: val})}
        />
        <AppButton
          title="login"
          onPress={() => {
            this.login();
          }}
          disabled={!isFormValid}
          style={{marginTop: normalize(30)}}
        />
        <AppButton
          title="Forgot Password?"
          outline
          style={{marginTop: normalize(20), marginBottom: normalize(30)}}
        />
      </>
    );
  }
}

export default LoginScreen;
