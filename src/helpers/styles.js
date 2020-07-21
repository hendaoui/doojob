import {StyleSheet, Dimensions} from 'react-native';
import Colors from './colors';
import normalize from 'react-native-normalize';

const {width} = Dimensions.get('window');

const screenWrapper = {
  flex: 1,
  backgroundColor: Colors.gray,
};

const screenWrapperWithRadius = {
  flex: 1,
  borderTopStartRadius: normalize(30),
  borderTopEndRadius: normalize(30),
  backgroundColor: Colors.gray,
};

const baseFontStyle = {
  fontFamily: 'Poppins-Medium',
  color: Colors.navyBlue,
  fontSize: normalize(16),
};

const baseInputStyle = {
  fontFamily: 'Poppins-SemiBold',
  backgroundColor: Colors.white,
  color: Colors.navyBlue,
  fontSize: normalize(16),
  borderRadius: normalize(10),
  paddingHorizontal: normalize(20),
  marginBottom: normalize(5),
};

const screenTitle = {
  fontFamily: 'Poppins-SemiBold',
  color: Colors.navyBlue,
  fontSize: normalize(30),
};

const appButtonContainer = {
  backgroundColor: Colors.blue,
  justifyContent: 'center',
};

const appButtonLg = {
  borderRadius: normalize(10),
  width: width * 0.9,
  height: normalize(60),
};

const appButtonSm = {
  borderRadius: normalize(5),
  padding: normalize(20),
  height: normalize(35),
};

const appButtonOutline = {
  backgroundColor: 'transparent',
};

const appButtonText = {
  color: Colors.white,
  alignSelf: 'center',
  textTransform: 'capitalize',
};

const appButtonTextOutline = {
  color: Colors.blue,
};

const header = {
  width: '100%',
  // height: normalize(60),
  borderTopStartRadius: normalize(30),
  borderTopEndRadius: normalize(30),
  backgroundColor: Colors.gray,
  flexGrow: 0,
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const scrollView = {
  padding: normalize(20),
  paddingTop: 0,
  marginTop: 0,
};

const styles = StyleSheet.create({
  screenWrapper,
  screenWrapperWithRadius,
  baseFontStyle,
  screenTitle,
  appButtonContainer,
  appButtonLg,
  appButtonSm,
  appButtonOutline,
  appButtonText,
  appButtonTextOutline,
  header,
  baseInputStyle,
  scrollView
});

export default styles;
