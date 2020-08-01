import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import AppText from './AppText';
import normalize from 'react-native-normalize';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
var ellipsis = require('text-ellipsis');

export default class IssueCard extends Component {
  render() {
    const {details, navigation} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{marginBottom: normalize(15)}}
        onPress={() => navigation.navigate('issueDetails', {id: details?._id, title: details?.title})}>
        <View style={styleSheet.container}>
          <ImageBackground
            source={
              details?.photo1
                ? {uri: details?.photo1}
                : require('../assets/img/no-image.jpg')
            }
            style={styleSheet.cover}
          />
          <View style={{height: normalize(75)}}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.8)']}
              style={styleSheet.linearGradient}>
              <View
                style={{
                  flex: 1,
                  marginTop: normalize(20),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <AppText
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: normalize(23),
                      marginBottom: -10,
                    }}>
                    {ellipsis(details?.title, 25)}
                  </AppText>
                  <AppText style={{color: 'white', fontSize: normalize(12)}}>
                    {moment(details?.createdAt).fromNow()}
                  </AppText>
                </View>
                <View>
                  <ImageBackground
                    style={styleSheet.author}
                    source={
                      details?.author?.photo
                        ? {uri: details?.author?.photo}
                        : require('../assets/img/avatar.jpg')
                    }
                  />
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    // backgroundColor: 'red'
    height: normalize(200),
    flexDirection: 'column-reverse',
  },
  cover: {
    height: '100%',
    width: '100%',
    opacity: 1,
    position: 'absolute',
    borderRadius: normalize(17),
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: normalize(15),
    paddingRight: normalize(15),
    borderBottomLeftRadius: normalize(17),
    borderBottomRightRadius: normalize(17),
  },
  author: {
    height: normalize(50),
    width: normalize(50),
    opacity: 1,
    position: 'relative',
    borderRadius: normalize(50),
    overflow: 'hidden',
  },
});
