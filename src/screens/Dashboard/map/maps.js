import React, {Component} from 'react';
import styles from '../../../helpers/styles';
import AppText from '../../../components/AppText';
import {ScrollView} from 'react-native-gesture-handler';
import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import AppSpinner from '../../../components/AppSpinner';
import Header from '../../../components/header';
import BottomNavigation from '../../../components/BottomNavigation';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import normalize from 'react-native-normalize';
import {observer, inject} from 'mobx-react';

@inject('Store')
@observer
export default class MapsScreen extends Component {
  componentDidMount() {
    this.props.Store.setActiveTab('maps');
  }

  mapMarkers = () => {
    return this.props.Store.issuesList.map((issue) => (
      <MapView.Marker
        key={issue._id}
        image={require('../../../assets/img/marker.png')}
        coordinate={{
          latitude: parseFloat(issue?.location.latitude),
          longitude: parseFloat(issue?.location.longitude),
        }}
        title={issue?.title}></MapView.Marker>
    ));
  };

  render() {
    const {navigation} = this.props;
    return (
      <>
        <AppSpinner />
        <View style={styles.screenWrapperWithRadius}>
          <View style={{height: normalize(65), paddingRight: normalize(20)}}>
            <Header nvg={{...navigation}} title="Map" showNotifications />
          </View>
          <MapView
            style={{
              flex: 1,
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}
            region={{
              latitude: 36.006389,
              longitude: 9.521667,
              latitudeDelta: 4,
              longitudeDelta: 4,
            }}
            onMapReady={() => {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              );
            }}>
            <this.mapMarkers />
            {/* <MapView.Callout>
                <View>
                  <AppText>This is a plain view</AppText>
                </View>
              </MapView.Callout> */}
          </MapView>
        </View>
        <BottomNavigation navigation={navigation} />
      </>
    );
  }
}

const styleSheet = StyleSheet.create({});
