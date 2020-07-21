import React, { useState } from 'react';
import styles from '../helpers/styles';
import { View, TextInput, StyleSheet } from 'react-native';
import AppText from './AppText';
import Androw from 'react-native-androw';
import colors from '../helpers/colors';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/Feather';

const AppInput = ({
  style,
  type,
  label,
  status,
  value,
  onChange,
  ...props
}) => {

  const [show, toggleShow] = useState(false);

  if (type === "password") {
    styles.baseInputStyle = { ...styles.baseInputStyle, paddingEnd: normalize(40) }
  }

  let newStyle;
  if (Array.isArray(style)) {
    newStyle = [styles.baseInputStyle, ...style];
  } else {
    newStyle = [styles.baseInputStyle, style];
  }

  return (
    <View {...props} style={{ marginBottom: normalize(5) }}>
      <AppText style={{ color: colors.text, fontFamily: 'Poppins-SemiBold', marginBottom: normalize(5) }}>{label}</AppText>
      <Androw style={styleSheet.shadow}>
        <TextInput
          value={value}
          onChangeText={onChange}
          style={newStyle}
          selectionColor={Colors.lightBlue}
          secureTextEntry={type === "password" && !show}
          keyboardType={type === "number" ? "numeric" : "default"}
        />
        {
          type === "password" &&
          <Icon
            name={show ? "eye-off" : "eye"}
            size={normalize(20)}
            style={styleSheet.icon}
            onPress={() => toggleShow(!show)}
          />
        }
      </Androw>
    </View>
  );
};

AppInput.defaultProps = {
  style: {},
};

const styleSheet = StyleSheet.create({
  shadow: {
    shadowColor: colors.darkGray,
    shadowOffset: {
      width: 1,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 5
  },
  icon: {
    color: colors.blue,
    alignSelf: "flex-end",
    top: normalize(-37),
    marginRight: normalize(10),
    zIndex: 2,
    padding: 5
  }
});

export default AppInput;
