import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from '../helpers/styles';
import AppText from './AppText';

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
    <TouchableOpacity
      activeOpacity={0.8}
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
    </TouchableOpacity>
  );
};

export default AppButton;
