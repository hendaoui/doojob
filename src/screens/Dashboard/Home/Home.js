import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../../../components/header';
import styles from '../../../helpers/styles';
import AppText from '../../../components/AppText';
import normalize from 'react-native-normalize';
import AppSpinner from '../../../components/AppSpinner';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <>
        <AppSpinner />
        <View style={styles.screenWrapperWithRadius}>
          <ScrollView style={styles.scrollView}>
          <Header nvg={{ ...navigation }} title="Home" noIcon screenTitle/>
            <View style={{backgroundColor: "red", height: 500}}></View>
            <View style={{backgroundColor: "blue", height: 500}}></View>
            <View style={{backgroundColor: "green", height: 500}}></View>
          </ScrollView>
        </View>
      </>
    );
  }
}
