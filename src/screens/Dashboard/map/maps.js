import React, {Component, useRef} from 'react';
import styles from '../../../helpers/styles';
import AppText from '../../../components/AppText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  ImageBackground,
} from 'react-native';
import AppSpinner from '../../../components/AppSpinner';
import Header from '../../../components/header';
import BottomNavigation from '../../../components/BottomNavigation';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import normalize from 'react-native-normalize';
import {observer, inject} from 'mobx-react';
import Animated from 'react-native-reanimated';
import colors from '../../../helpers/colors';
import moment from 'moment';
import StarRating from '../../../components/StarRating';

@inject('Store')
@observer
export default class MapsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.Store.setActiveTab('maps');
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
    // this.mapAnimation.addListener(({value}) => {
    //   let index = Math.floor(value / normalize(250) + 0.3);
    //   if (index >= this.props.Store.issuesList.length) {
    //     index = this.props.Store.issuesList.length - 1;
    //   }
    //   if (index <= 0) {
    //     index = 0;
    //   }

    //   clearTimeout(regionTimeout);

    //   const regionTimeout = setTimeout(() => {
    //     if (this.mapIndex === index) {
    //       this.mapIndex = idnex;
    //       const {location} = this.props.Store.issuesList[index];
    //       this._map.current.animateToRegion(
    //         {
    //           ...location,
    //           latitudeDelta: 4,
    //           longitudeDelta: 4,
    //         },
    //         350,
    //       );
    //     }
    //   }, 10);
    // });
  }

  onFocusFunction = () => {
    this.props.Store.setActiveTab('maps');
  };

  mapMarkers = () => {
    return this.props.Store.issuesList.map((issue) => (
      <MapView.Marker
        key={issue._id}
        coordinate={{
          latitude: parseFloat(issue?.location.latitude),
          longitude: parseFloat(issue?.location.longitude),
        }}
        title={issue?.title}>
        <Animated.View style={styleSheet.markerWrap}>
          <Animated.Image
            source={require('../../../assets/img/marker.png')}
            style={styleSheet.marker}
            resizeMode="cover"
          />
        </Animated.View>
      </MapView.Marker>
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
          </MapView>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            style={styleSheet.scrollView}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.mapAnimation,
                    },
                  },
                },
              ],
              {useNativeDriver: true},
            )}>
            {this.props.Store.issuesList.map((issue, index) => (
              <TouchableOpacity
                style={styleSheet.card}
                key={index}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('issueDetails', {
                    id: issue?._id,
                    title: issue?.title,
                  })
                }>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <View>
                    <ImageBackground
                      style={styleSheet.photo}
                      source={
                        issue?.photo1
                          ? {uri: issue?.photo1}
                          : require('../../../assets/img/no-image.jpg')
                      }
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: normalize(10),
                      alignSelf: 'center',
                    }}>
                    <AppText style={{fontFamily: 'Poppins-SemiBold'}}>
                      {issue?.title}
                    </AppText>
                    <AppText style={{fontSize: normalize(14)}}>
                      {issue?.author?.name}
                    </AppText>
                    <StarRating ratings={issue?.author?.rating} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
        </View>
        <BottomNavigation navigation={navigation} />
      </>
    );
  }
}

const styleSheet = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(50),
    height: normalize(50),
  },
  marker: {
    width: normalize(35),
    height: normalize(40),
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: normalize(10),
  },
  card: {
    padding: normalize(10),
    borderRadius: normalize(17),
    backgroundColor: '#FFF',
    marginHorizontal: normalize(10),
    height: normalize(100),
    width: normalize(250),
    overflow: 'hidden',
  },
  photo: {
    height: normalize(80),
    width: normalize(80),
    opacity: 1,
    position: 'relative',
    borderRadius: normalize(17),
    overflow: 'hidden',
  },
});
