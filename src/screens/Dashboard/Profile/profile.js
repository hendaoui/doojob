import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import styles from '../../../helpers/styles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AppText from '../../../components/AppText';
import normalize from 'react-native-normalize';
import BottomNavigation from '../../../components/BottomNavigation';
import axios from 'axios';
import {apiConfig} from '../../../helpers/apiConfig';
import AppSpinner from '../../../components/AppSpinner';
import StarRating from '../../../components/StarRating';
import colors from '../../../helpers/colors';
import Icon from 'react-native-vector-icons/Feather';
import App from '../../../App';
import AppModal from '../../../components/AppModal';
import AsyncStorage from '@react-native-community/async-storage';

const ProfileScreen = ({navigation, Store}) => {
  const [profileData, setProfileData] = useState(null);
  const [modal, setModal] = useState({
    showModal: false,
    status: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    console.log(Store.selectedProfile);
    Store.setActiveTab('profile');
    const focusListener = navigation.addListener('focus', () => {
      onFocusFunction();
    });

    getProfileData();
  }, [navigation, Store.selectedProfile]);

  const onFocusFunction = () => {
    Store.setActiveTab('profile');
  };

  const getProfileData = () => {
    Store.toggleSpinner(true);
    axios
      .get('user/' + Store?.selectedProfile, {
        headers: {Authorization: 'Bearer ' + Store.accessToken},
      })
      .then((response) => {
        Store.toggleSpinner(false);
        setProfileData(response?.data);
      })
      .catch((error) => {
        Store.toggleSpinner(false);
        console.error(error);
      });
  };

  const logout = () => {
    setModal({
      showModal: true,
      status: 'confirm',
      title: 'Do you want really to logout?',
      description: '',
    });
  };

  const openSettings = () => {
    setModal({
      showModal: true,
      status: 'info',
      title: 'Oops!',
      description: "Unfortunately this feature isn't implemented yet.",
    });
  };

  const processLogout = () => {
    Store.toggleSpinner(true);
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('userData');
    Store.setCurrentUser();
    Store.setAccessToken();
    Store.setIssuesList();
    Store.toggleSpinner(false);
    navigation.replace('onBoarding');
  };

  const {height} = Dimensions.get('window');

  return (
    <>
      <AppSpinner />
      <AppModal
        status={modal.status}
        title={modal.title}
        description={modal.description}
        visible={modal.showModal}
        onPress={() => {
          setModal({...modal, showModal: false});
        }}
        onReject={() => {
          setModal({...modal, showModal: false});
        }}
        onConfirm={() => {
          processLogout();
        }}
      />
      <ScrollView
        style={{minHeight: 200}}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              getProfileData();
            }}
          />
        }>
        <View>
          <View style={styleSheet.container}>
            {profileData && (
              <>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: normalize(120),
                    marginTop: normalize(32),
                  }}>
                  <View>
                    {Store.currentUser?.email === Store.selectedProfile && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                          backgroundColor: colors.blue,
                          borderRadius: normalize(50),
                          width: normalize(37),
                        }}
                        onPress={() => logout()}>
                        <Icon
                          name={'log-out'}
                          size={normalize(20)}
                          color={colors.white}
                          style={{
                            paddingHorizontal: normalize(10),
                            paddingVertical: normalize(10),
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View
                    style={
                      (Store.currentUser?.email !== Store.selectedProfile && {
                        marginLeft: -normalize(20),
                      },
                      {alignItems: 'center'})
                    }>
                    <ImageBackground
                      source={
                        profileData?.photo
                          ? {uri: profileData?.photo}
                          : require('../../../assets/img/avatar.jpg')
                      }
                      style={styleSheet.avatar}
                    />
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: normalize(10),
                      }}>
                      <AppText
                        style={{
                          color: 'white',
                          fontFamily: 'Poppins-SemiBold',
                          marginBottom: normalize(5),
                        }}>
                        {profileData?.firstName + ' ' + profileData?.lastName}
                      </AppText>
                      <StarRating ratings={profileData?.raiting || 0} />
                    </View>
                  </View>
                  <View>
                    {Store.currentUser?.email === Store.selectedProfile && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                          backgroundColor: colors.blue,
                          borderRadius: normalize(50),
                          width: normalize(37),
                        }}
                        onPress={() => openSettings()}>
                        <Icon
                          name={'settings'}
                          size={normalize(20)}
                          color={colors.white}
                          style={{
                            paddingHorizontal: normalize(10),
                            paddingVertical: normalize(10),
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
        <View style={styles.screenWrapperWithRadius}>
          <View style={{flex: 1, minHeight: height - normalize(213)}}></View>
        </View>
      </ScrollView>
      <BottomNavigation navigation={navigation} />
    </>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: normalize(200),
  },
  avatar: {
    height: normalize(120),
    width: normalize(120),
    opacity: 1,
    borderRadius: normalize(120),
    overflow: 'hidden',
    resizeMode: 'cover',
    borderColor: 'white',
    borderWidth: normalize(6),
  },
});

export default inject('Store')(observer(ProfileScreen));
