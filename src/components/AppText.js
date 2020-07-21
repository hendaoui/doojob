import React from 'react';
import {Text} from 'react-native';
import styles from '../helpers/styles';

const AppText = ({style, children, ...props}) => {
  let newStyle;
  if (Array.isArray(style)) {
    newStyle = [styles.baseFontStyle, ...style];
  } else {
    newStyle = [styles.baseFontStyle, style];
  }

  return (
    <Text {...props} style={newStyle}>
      {children}
    </Text>
  );
};

AppText.defaultProps = {
  style: {},
};

export default AppText;
