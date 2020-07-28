import React from 'react';
import {View, StyleSheet} from 'react-native';
import styles from '../helpers/styles';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/Feather';
import normalize from 'react-native-normalize';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styleSheet = StyleSheet.create({
  icon: {
    margin: normalize(18),
    width: normalize(35),
  },
  backIcon: {
    marginLeft: normalize(8),
    marginRight: normalize(13),
  },
  text: {
    margin: normalize(15),
    marginLeft: normalize(0),
    fontSize: normalize(25),
    textTransform: 'capitalize',
    lineHeight: normalize(40),
  },
});

const goBack = (navigation) => {
  if (navigation.canGoBack()) navigation.goBack(null);
};

const Header = ({
  nvg,
  title = nvg.name || '',
  icon,
  transparent,
  noIcon,
  screenTitle,
  onPress = () => goBack(nvg),
}) => {
  if (transparent) {
    styles.header = {...styles.header, backgroundColor: 'transparent'};
    styleSheet.icon = {...styleSheet.icon, color: 'white'};
  }
  if (!icon) styleSheet.icon = {...styleSheet.icon, ...styleSheet.backIcon};
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        {!noIcon && (
          <Icon
            name={icon || 'chevron-left'}
            size={normalize(35)}
            style={styleSheet.icon}
          />
        )}
      </TouchableOpacity>
      <AppText style={[styleSheet.text, screenTitle && styles.screenTitle]}>{title}</AppText>
    </View>
  );
};

export default Header;
