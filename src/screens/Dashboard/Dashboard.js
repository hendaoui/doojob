import React from 'react';
import SetupScreen from './Setup/Setup';
import HomeScreen from './Home/Home';

const DashboardScreen = ({ navigation }) => {

  const renderScreen = (navigation) => {
    const isAccountConfirmed = false;
    if (isAccountConfirmed) {
      return <HomeScreen navigation={navigation} />
    } else {
      return <SetupScreen navigation={navigation} />
    }
  };


  return (
    <>
      {renderScreen(navigation)}
    </>
  );
}

export default DashboardScreen;
