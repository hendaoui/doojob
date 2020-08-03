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
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import moment from 'moment';

const ProfileScreen = ({navigation, Store}) => {
  const [profileData, setProfileData] = useState(null);
  const [modal, setModal] = useState({
    showModal: false,
    status: '',
    title: '',
    description: '',
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
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
        setProfileData(response?.data);
        getReviews();
      })
      .catch((error) => {
        Store.toggleSpinner(false);
        console.error(error);
      });
  };

  const getReviews = () => {
    axios
      .get(apiConfig.API.REVIEW.LIST, {
        headers: {Authorization: 'Bearer ' + Store.accessToken},
      })
      .then((response) => {
        Store.toggleSpinner(false);
        setReviews(
          response.data?.filter(
            (review) => review?.reviewee === Store.selectedProfile,
          ),
        );
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

  const HelpsRoute = () => (
    <View style={styleSheet.scene}>
      {Store.issuesList.map((issue, index) => {
        if (issue?.assignee === Store.selectedProfile) {
          return (
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
                    style={styleSheet.issueCover}
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
                    {moment(issue?.createdAt).format('LLL')}
                  </AppText>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Icon name={'chevron-right'} size={normalize(20)} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );

  const IssuesRoute = () => (
    <View style={styleSheet.scene}>
      {Store.issuesList.map((issue, index) => {
        if (issue?.author?.email === Store.selectedProfile) {
          return (
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
                    style={styleSheet.issueCover}
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
                    {moment(issue?.createdAt).format('LLL')}
                  </AppText>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Icon name={'chevron-right'} size={normalize(20)} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );

  const ReviewsRoute = () => (
    <View style={styleSheet.scene}>
      {reviews.map((review, index) => {
        return (
          <View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                // backgroundColor: 'red',
                padding: normalize(10),
              }}>
              <View style={{alignSelf: 'center'}}>
                <ImageBackground
                  style={styleSheet.reviewerPhoto}
                  source={
                    review?.reviewer?.photo
                      ? {uri: review?.reviewer?.photo}
                      : require('../../../assets/img/avatar.jpg')
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
                  {review?.reviewer?.name}
                </AppText>
                <AppText
                  style={{fontSize: normalize(14), marginTop: -normalize(5)}}>
                  {moment(review?.createdAt).format('LLL')}
                </AppText>
                <StarRating ratings={review?.rating || 0} />
              </View>
            </View>
            <View style={styleSheet.triangle} />
            <View
              style={{
                marginHorizontal: normalize(10),
                padding: normalize(10),
                backgroundColor: colors.darkGray,
                borderRadius: normalize(10)
              }}>
              <AppText style={{textAlign: 'justify'}}>
                {review?.message}
              </AppText>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={colors.blue}
      inactiveColor={colors.navyBlue}
      indicatorStyle={{backgroundColor: colors.blue}}
      labelStyle={{
        fontFamily: 'Poppins-SemiBold',
        fontSize: normalize(16),
        textTransform: 'capitalize',
      }}
      pressColor={'transparent'}
      style={{
        borderTopStartRadius: normalize(30),
        borderTopEndRadius: normalize(30),
        backgroundColor: colors.gray,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkGray,
        elevation: 0,
      }}
    />
  );

  const initialLayout = {width: Dimensions.get('window').width};

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'helps', title: 'Helps'},
    {key: 'issues', title: 'Issues'},
    {key: 'reviews', title: 'Reviews'},
  ]);

  const renderScene = SceneMap({
    helps: HelpsRoute,
    issues: IssuesRoute,
    reviews: ReviewsRoute,
  });

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
        <View style={{flex: 1, minHeight: height - normalize(213)}}>
          <TabView
            navigationState={{index, routes}}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </View>
      </ScrollView>
      <BottomNavigation navigation={navigation} />
    </>
  );
};

const styleSheet = StyleSheet.create({
  container: {
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
  scene: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  card: {
    padding: normalize(10),
    backgroundColor: 'white',
    height: normalize(80),
    overflow: 'hidden',
    paddingHorizontal: normalize(15),
    marginBottom: normalize(10),
  },
  issueCover: {
    height: normalize(60),
    width: normalize(60),
    opacity: 1,
    position: 'relative',
    borderRadius: normalize(10),
    overflow: 'hidden',
  },
  issueCover: {
    height: normalize(60),
    width: normalize(60),
    opacity: 1,
    position: 'relative',
    borderRadius: normalize(10),
    overflow: 'hidden',
  },
  reviewerPhoto: {
    height: normalize(60),
    width: normalize(60),
    opacity: 1,
    position: 'relative',
    borderRadius: normalize(60),
    overflow: 'hidden',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: normalize(20),
    borderRightWidth: normalize(20),
    borderBottomWidth: normalize(15),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.darkGray,
    marginLeft: normalize(20)
  }
});

export default inject('Store')(observer(ProfileScreen));
