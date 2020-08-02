import React, {Component} from 'react';
import SetupScreen from './Setup/Setup';
import HomeScreen from './Home/Home';
import BottomNavigation from '../../components/BottomNavigation';
import {observer, inject} from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
@inject('Store')
@observer
class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApproved: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      if (accessToken !== null) {
        this.props.Store.setAccessToken(accessToken);
        let decodedData = jwt_decode(accessToken);
        if (decodedData) {
          if (decodedData.exp < Date.now() / 1000) {
            AsyncStorage.removeItem('accessToken');
          } else {
            this.props.Store.setAccessToken(accessToken);
          }
        }
      }
    });
    AsyncStorage.getItem('userData').then((userData) => {
      if (userData !== null) {
        this.props.Store.setCurrentUser(JSON.parse(userData));
      }
    });
    console.log(">>>>>>>>>>>", this.props.Store.currentUser?.isApproved);
  }

  renderScreen = (navigation) => {
    if (this.props.Store.currentUser?.isApproved) {
      return <HomeScreen navigation={navigation} />;
    } else {
      return <SetupScreen navigation={navigation} />;
    }
  };

  render() {
    return (
      <>
        {this.renderScreen(this.props.navigation)}
        {this.props.Store.currentUser?.isApproved && <BottomNavigation navigation={this.props.navigation} />}
      </>
    );
  }
}

export default DashboardScreen;
