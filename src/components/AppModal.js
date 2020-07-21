import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet } from 'react-native';
import Colors from '../helpers/colors';
import styles from '../helpers/styles';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/Feather';
import AppText from './AppText';
import AppButton from './AppButton';

const renderStatus = (status) => {
  switch (status) {
    case "confirm":
      return <Icon name={"help-circle"} size={normalize(170)} color={Colors.confirmIcon} />
    case "error":
      return <Icon name={"x-circle"} size={normalize(170)} color={Colors.errorIcon} />
    case "info":
      return <Icon name={"info"} size={normalize(170)} color={Colors.infoIcon} />
    case "success":
      return <Icon name={"check-circle"} size={normalize(170)} color={Colors.successIcon} />

  }
};

const AppModal = ({ status = "info", title = "", description = "", buttons = ["Close"], visible = false, onPress, onConfirm, onReject }) => {

  if (status === "confirm") {
    styleSheet.title = { ...styleSheet.title, fontSize: normalize(30) }
    if (buttons.length < 2)
      buttons = ["Yes", "No"]
  }

  return (
    <>
      <Modal
        isVisible={visible}
        animationInTiming={300}
        hideModalContentWhileAnimating={true}
        hasBackdrop={true}
        customBackdrop={<View style={styles.screenWrapperWithRadius}></View>}
        backdropOpacity={1}
        onBackButtonPress={() => onPress}
      >
        <View style={styleSheet.container}>
          <View style={styleSheet.block1} />
          <View style={styleSheet.block2}>
            {renderStatus(status)}
            <AppText style={styleSheet.title}>{title}</AppText>
            <AppText style={styleSheet.description}>{description}</AppText>
          </View>
          <View style={styleSheet.block3}>
            {
              status !== "confirm" ?
                <AppButton title={buttons[0]} onPress={() => onPress()} />
                : <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <View style={{ width: "45%" }}>
                    <AppButton title={buttons[0]} size="sm"
                      style={styleSheet.confirmButton}
                      onPress={() => onConfirm()} />
                  </View>
                  <View style={{ width: "45%" }}>
                    <AppButton title={buttons[1]} size="sm"
                      style={styleSheet.confirmButton}
                      onPress={() => onReject()} />
                  </View>
                </View>
            }
          </View>
        </View>
      </Modal>
    </>
  );
}

const styleSheet = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  block1: {
    height: "15%",
  },
  block2: {
    height: "70%",
    alignItems: "center",
  },
  block3: {
    height: "15%",
    flexDirection: "column-reverse",
  },
  title: {
    fontSize: normalize(35),
    fontFamily: 'Poppins-SemiBold',
    marginVertical: normalize(17),
    textAlign: "center"
  },
  description: {
    textAlign: "center",
    color: Colors.text,
    fontSize: normalize(18)
  },
  confirmButton: {
    borderRadius: normalize(10),
    width: "100%",
    height: normalize(60)
  }
});

export default AppModal;