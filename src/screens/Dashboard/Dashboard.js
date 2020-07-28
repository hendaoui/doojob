import React, { Component } from 'react';
import SetupScreen from './Setup/Setup';
import HomeScreen from './Home/Home';
import BottomNavigation from '../../components/BottomNavigation';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccountConfirmed: true,
    };
  }

  renderScreen = (navigation) => {
    if (this.state.isAccountConfirmed) {
      return <HomeScreen navigation={navigation} />;
    } else {
      return <SetupScreen navigation={navigation} />;
    }
  };

  render() {
    return (
      <>
        {this.renderScreen(this.props.navigation)}
        {this.state.isAccountConfirmed && <BottomNavigation />}
      </>
    );
  }
}

export default DashboardScreen;
