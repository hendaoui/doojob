import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import styles from '../../helpers/styles';
import Header from '../../components/header';
import AppText from '../../components/AppText';
import normalize from 'react-native-normalize';
import LoginScreen from './login';
import RegisterScreen from './register';
import { observer } from 'mobx-react';
import AppSpinner from '../../components/AppSpinner';

const renderScreen = (navigation, route) => {
  switch (route) {
    case 'Login':
      return <View style={{ marginTop: normalize(50) }}><LoginScreen navigation={navigation} /></View>;
    case 'Registration':
      return <View style={{ marginTop: normalize(50) }}><RegisterScreen navigation={navigation} /></View>;
  }
};

@observer
class AuthScreen extends React.Component {
  render() {
    const { navigation, route } = this.props;
    return (
      <>
        <AppSpinner />
        <Header nvg={{ ...navigation }} />
        <View style={styles.screenWrapper}>
          <ScrollView style={styles.scrollView}>
            <AppText style={{ ...styles.screenTitle }}>{route.params.path}</AppText>
            {renderScreen(navigation, route.params.path)}
          </ScrollView>
        </View>
      </>
    );
  }
};

export default AuthScreen;
