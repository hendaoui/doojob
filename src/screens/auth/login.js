import React from 'react';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import normalize from 'react-native-normalize';
import { inject, observer } from 'mobx-react';

@inject('Store')
@observer
class LoginScreen extends React.Component {

  render() {
    return (
      <>
        <AppInput label="Email" />
        <AppInput label="Password" type="password" />
        <AppButton
          title="login"
          onPress={() => {
            this.props.Store.toggleSpinner(true)
            setTimeout(() => { this.props.Store.toggleSpinner(false) }, 3000)
          }}
          style={{ marginTop: normalize(30) }}
        />
        <AppButton
          title="Forgot Password?"
          outline
          style={{ marginTop: normalize(20), marginBottom: normalize(30) }}
        />
      </>
    );
  };
};

export default LoginScreen;
