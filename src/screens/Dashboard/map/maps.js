import React, {Component, useRef, useEffect} from 'react';
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
import Animated, {block, call} from 'react-native-reanimated';
import colors from '../../../helpers/colors';
import moment from 'moment';
import StarRating from '../../../components/StarRating';
import 'mobx-react-lite/batchingForReactNative';

const MapsScreen = ({navigation, Store}) => {
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    Store.setActiveTab('maps');
    const focusListener = navigation.addListener('focus', () => {
      onFocusFunction();
    });
  }, []);

  const onFocusFunction = () => {
    Store.setActiveTab('maps');
  };

  const mapMarkers = () => {
    return Store.issuesList.map((issue, index) => {
      const scaleStyle = {
        transform: [
          {
            scale: interpolations[index].scale,
          },
        ],
      };
      return (
        <MapView.Marker
          key={issue._id}
          coordinate={{
            latitude: parseFloat(issue?.location.latitude),
            longitude: parseFloat(issue?.location.longitude),
          }}
          onPress={(e) => onMarkerPress(e)}>
          <Animated.View style={styleSheet.markerWrap}>
            <Animated.Image
              source={require('../../../assets/img/marker.png')}
              style={[styleSheet.marker, scaleStyle]}
              resizeMode="cover"
            />
          </Animated.View>
        </MapView.Marker>
      );
    });
  };

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.index;

    let x = markerID * normalize(300) + markerID * 20;

    _scrollView.current.getNode().scrollTo({x: x, y: 0, animated: true});
  };

  const interpolations = Store.issuesList.map((issue, index) => {
    const inputRange = [
      (index - 1) * normalize(300),
      index * normalize(300),
      (index + 1) * normalize(300),
    ];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

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
          ref={_map}
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
          {mapMarkers()}
        </MapView>
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styleSheet.scrollView}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: (x) =>
                      Animated.block([
                        Animated.set(mapAnimation, x),
                        Animated.call([x], ([value]) => {
                          let index = Math.floor(value / normalize(300) + 0.3);
                          if (index >= Store.issuesList.length) {
                            index = Store.issuesList.length - 1;
                          }
                          if (index <= 0) {
                            index = 0;
                          }
                          clearTimeout(regionTimeout);
                          const regionTimeout = setTimeout(() => {
                            if (mapIndex !== index) {
                              mapIndex = index;
                              const {location} = Store.issuesList[index];
                              _map.current.animateToRegion(
                                {
                                  latitude: parseFloat(location?.latitude),
                                  longitude: parseFloat(location?.longitude),
                                  latitudeDelta: 1.5,
                                  longitudeDelta: 1.5,
                                },
                                350,
                              );
                            }
                          }, 10);
                        }),
                      ]),
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}>
          {Store.issuesList.map((issue, index) => (
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
                <View style={{alignSelf: 'center'}}>
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
};

const styleSheet = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(55),
    height: normalize(55),
  },
  marker: {
    width: normalize(30),
    height: normalize(35),
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
    height: normalize(110),
    width: normalize(300),
    overflow: 'hidden',
  },
  photo: {
    height: normalize(90),
    width: normalize(90),
    opacity: 1,
    position: 'relative',
    borderRadius: normalize(17),
    overflow: 'hidden',
  },
});

export default inject('Store')(observer(MapsScreen));
