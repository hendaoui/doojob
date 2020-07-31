import React from 'react';
import styles from '../helpers/styles';
import AppText from './AppText';
import { TouchableHighlight } from 'react-native';

const AppButton = ({
  onPress,
  title,
  size,
  position = 'flex-start',
  outline,
  style,
  disabled
}) => {
  outline && size !== 'sm' ? position = 'center' : null;
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor='none'
      onPress={disabled ? () => { } : onPress}
      style={[
        styles.appButtonContainer,
        size === 'sm' ? styles.appButtonSm : styles.appButtonLg,
        outline && { ...styles.appButtonOutline, width: 'auto', height: 'auto', padding: 0 },
        { alignSelf: position },
        style && style,
        disabled ? { opacity: .8 } : null
      ]}>
      <AppText
        style={[
          styles.appButtonText,
          size === 'sm' && { fontSize: 14 },
          outline && styles.appButtonTextOutline,
        ]}>
        {title}
      </AppText>
    </TouchableHighlight>
  );
};

export default AppButton;
