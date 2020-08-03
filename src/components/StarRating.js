import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import AppText from './AppText';
import normalize from 'react-native-normalize';

export default class StarRating extends React.Component {
  render() {
    let stars = [];

    for (var i = 1; i <= 5; i++) {
      let star = require('../assets/img/star-filled.png');
      if (i > this.props.ratings) {
        star = require('../assets/img/star.png');
      }

      stars.push(
        <Image
          source={star}
          style={{
            height: normalize(this.props.size || 12),
            width: normalize(this.props.size || 12),
          }}
          key={i}
        />,
      );
    }
    return (
      <View style={styles.container}>
        {stars}
        {this.props.reviews && (
          <AppText
            style={{
              fontSize: normalize(this.props.size - 2 || 10),
              marginTop: normalize(6),
              marginLeft: normalize(5),
              color: '#444',
            }}>
            ({this.props.reviews})
          </AppText>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
