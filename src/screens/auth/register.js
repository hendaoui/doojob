import React from 'react';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import normalize from 'react-native-normalize';
import {View} from 'react-native';
var empty = require('is-empty');
import axios from 'axios';
import {apiConfig} from '../../helpers/apiConfig';
import {observer, inject} from 'mobx-react';
import AppModal from '../../components/AppModal';
@inject('Store')
@observer
class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      isValidForm: '',
      modal: {
        showModal: false,
        statuts: 'success',
        title: 'Success!',
        description: 'Your Account has been successfully created.',
      },
    };
  }

  register = () => {
    this.props.Store.toggleSpinner(true);
    const {firstName, lastName, email, phoneNumber, password} = this.state;
    let modal = {...this.state.modal};
    axios
      .post(apiConfig.API.AUTH.REGISTER, {
        firstName, lastName, email, phoneNumber, password
      })
      .then((response) => {
        this.props.Store.toggleSpinner(false);
        modal.showModal = true;
        this.setState({modal: modal});
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
  };

  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = this.state;

    const isFormValid =
      !empty(firstName) &&
      !empty(lastName) &&
      !empty(phoneNumber) &&
      !empty(email) &&
      !empty(password) &&
      !empty(confirmPassword) &&
      password === confirmPassword;

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
            if (this.state.modal.statuts === "success")
              this.props.navigation.replace('auth', {path: 'Login'});
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '45%'}}>
            <AppInput
              label="First Name"
              value={firstName}
              onChange={(val) => this.setState({firstName: val})}
            />
          </View>
          <View style={{width: '45%'}}>
            <AppInput
              label="Last Name"
              value={lastName}
              onChange={(val) => this.setState({lastName: val})}
            />
          </View>
        </View>
        <AppInput
          label="Phone Number"
          type="number"
          value={phoneNumber}
          onChange={(val) => this.setState({phoneNumber: val})}
        />
        <AppInput
          label="Email"
          value={email}
          onChange={(val) => this.setState({email: val})}
        />
        <AppInput
          label="Password"
          type="password"
          value={password}
          onChange={(val) => this.setState({password: val})}
        />
        <AppInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(val) => this.setState({confirmPassword: val})}
        />
        <AppButton
          title="Register"
          onPress={() => {
            this.register();
          }}
          style={{marginTop: normalize(30), marginBottom: normalize(30)}}
          disabled={!isFormValid}
        />
      </>
    );
  }
}

export default RegisterScreen;
