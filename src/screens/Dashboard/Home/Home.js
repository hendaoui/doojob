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
        <Header nvg={{ ...navigation }} />
        <View style={styles.screenWrapper}>
          <ScrollView style={styles.scrollView}>
            <AppText style={{ ...styles.screenTitle, marginTop: normalize(20) }}>Home</AppText>
          </ScrollView>
        </View>
      </>
    );
  }
}
