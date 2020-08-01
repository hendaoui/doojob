import React, {Component} from 'react';
import styles from '../../../helpers/styles';
import AppText from '../../../components/AppText';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import AppSpinner from '../../../components/AppSpinner';
import Header from '../../../components/header';
import BottomNavigation from '../../../components/BottomNavigation';

export default class NotificationsScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <>
        <AppSpinner />
        <Header nvg={{...navigation}} />
        <View style={styles.screenWrapper}>
          <ScrollView style={styles.scrollView}>
            <AppText style={{...styles.screenTitle}}>Notifications</AppText>
          </ScrollView>
        </View>
        <BottomNavigation />
      </>
    );
  }
}
