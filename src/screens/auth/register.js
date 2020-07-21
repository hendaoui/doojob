import React from 'react';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import normalize from 'react-native-normalize';
import { inject, observer } from 'mobx-react';
import { View } from 'react-native';


class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "45%" }} ><AppInput label="First Name" /></View>
          <View style={{ width: "45%" }} ><AppInput label="Last Name" /></View>
        </View>
        <AppInput label="Phone Number" type="number" />
        <AppInput label="Email" />
        <AppInput label="Password" type="password" />
        <AppInput label="Confirm Password" type="password" />
        <AppButton
          title="Register"
          onPress={() => { navigation.replace('dashboard') }}
          style={{ marginTop: normalize(30), marginBottom: normalize(30) }}
        />
      </>
    );
  };
};

export default RegisterScreen;
