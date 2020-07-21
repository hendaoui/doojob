import React, {useState, useEffect} from 'react';
import {View, Image, Dimensions} from 'react-native';
import styles from '../../helpers/styles';
import AppText from '../../components/AppText';
import Swiper from 'react-native-swiper';
import colors from '../../helpers/colors';
import {ScrollView} from 'react-native-gesture-handler';
import AppButton from '../../components/AppButton';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');

const swiperStyles = {
  image: {
    width: width * 0.9,
    height: width * 0.8 - normalize(70),
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    marginBottom: normalize(40),
    marginTop: normalize(40),
  },
  scrollView: {
    padding: normalize(10),
    marginBottom: normalize(55),
    paddingTop: 0,
    marginTop: 0,
  },
};

const OnBoardingScreen = ({navigation}) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const checkStep = async () =>{
      try {
        const value = await AsyncStorage.getItem('onBoardingDone');
        if (value !== null) {
          setStep(3);
        }
      } catch (error) {}
    };
    checkStep();
  }, []);

  const finishOnBoarding = () => {
    try {
      AsyncStorage.setItem('onBoardingDone', 'true').then(() => {
        setStep(2);
      });
    } catch (error) {}
  };

  return (
    <>
      {step === 1 ? (
        <View style={{...styles.screenWrapperWithRadius, alignItems: 'center', justifyContent: 'center'}}>
          <Swiper
            activeDotColor={colors.blue}
            showsVerticalScrollIndicator={true}
            scrollEnabled={true}
            loop={false}>
            <ScrollView
              testID="1"
              style={swiperStyles.scrollView}
              contentContainerStyle={[
                {flexGrow: 1, justifyContent: 'space-between'},
              ]}>
              <View style={swiperStyles.slide}>
                <Image
                  source={require('../../assets/img/onBoarding-1.png')}
                  resizeMode="center"
                  style={swiperStyles.image}
                />
                <AppText
                  style={{
                    fontSize: normalize(25),
                    marginTop: width * 0.1,
                    textAlign: 'center',
                  }}>
                  Are you looking for a technician?
                </AppText>
              </View>
            </ScrollView>
            <ScrollView
              testID="2"
              style={swiperStyles.scrollView}
              contentContainerStyle={[
                {flexGrow: 1, justifyContent: 'space-between'},
              ]}>
              <View style={swiperStyles.slide}>
                <Image
                  source={require('../../assets/img/onBoarding-2.png')}
                  resizeMode="center"
                  style={swiperStyles.image}
                />
                <AppText
                  style={{
                    fontSize: normalize(25),
                    textAlign: 'center',
                    marginTop: width * 0.1,
                  }}>
                  Are you a technician?
                </AppText>
                <AppText style={{fontSize: normalize(25), textAlign: 'center'}}>
                  Do you need a job?
                </AppText>
              </View>
            </ScrollView>
            <ScrollView
              testID="3"
              style={swiperStyles.scrollView}
              contentContainerStyle={[
                {flexGrow: 1, justifyContent: 'space-between'},
              ]}>
              <View style={swiperStyles.slide}>
                <Image
                  source={require('../../assets/img/onBoarding-3.png')}
                  resizeMode="center"
                  style={swiperStyles.image}
                />
                <Image
                  source={require('../../assets/img/logo.png')}
                  resizeMode="center"
                  style={{
                    width: width * 0.5,
                    height: normalize(70),
                    margin: normalize(25),
                  }}
                />
                <AppText
                  style={{
                    fontSize: normalize(25),
                    textAlign: 'center',
                    marginBottom: normalize(-20),
                  }}>
                  Will help you to resolve all of your problems!
                </AppText>
              </View>
              <AppButton style={{margin: normalize(10)}} title="Continue" onPress={() => finishOnBoarding()} />
            </ScrollView>
          </Swiper>
        </View>
      ) : (
        <View
          style={{
            ...styles.screenWrapperWithRadius,
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{marginTop: width * 0.3}}>
            <AppText
              style={{
                textAlign: 'center',
                marginBottom: normalize(-20),
              }}>
              Welcome to
            </AppText>
            <Image
              source={require('../../assets/img/logo.png')}
              resizeMode="center"
              style={{
                width: width * 0.5,
                height: normalize(70),
                margin: normalize(25),
              }}
            />
          </View>
          <View style={{marginBottom: normalize(16)}}>
            {step === 2 ? (
              <>
                <AppButton
                  title="Join us, it's Free"
                  onPress={() => navigation.navigate('auth', {path: 'Registration'})}
                  style={{margin: normalize(10)}}
                />
                <AppButton
                  title="Have an account? Login"
                  onPress={() => navigation.navigate('auth', {path: 'Login'})}
                  outline
                  style={{margin: normalize(10)}}
                />
              </>
            ) : (
              <>
                <AppButton
                  title="login"
                  onPress={() => navigation.navigate('auth', {path: 'Login'})}
                  style={{margin: normalize(10)}}
                />
                <AppButton
                  title="register"
                  onPress={() => navigation.navigate('auth', {path: 'Registration'})}
                  style={{margin: normalize(10)}}
                  outline
                />
              </>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default OnBoardingScreen;
