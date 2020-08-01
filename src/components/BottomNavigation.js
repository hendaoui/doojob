import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import Colors from '../helpers/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { observer, inject } from 'mobx-react';
@inject('Store')
@observer
export default class BottomNavigation extends Component {
  render() {
    return (
      <View style={styleSheet.contianer}>
        <TouchableOpacity>
          <Icon name={'home'} size={normalize(33)} style={styleSheet.icon, this.props.Store.activeTab === "home" && {color: Colors.blue}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name={'map'} size={normalize(33)} style={styleSheet.icon, this.props.Store.activeTab === "map" && {color: Colors.blue}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name={'user'} size={normalize(33)} style={styleSheet.icon, this.props.Store.activeTab === "profile" && {color: Colors.blue}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name={'plus'}
            size={normalize(25)}
            style={[styleSheet.icon, styleSheet.addIcon]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styleSheet = StyleSheet.create({
  contianer: {
    height: normalize(60),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
  },
  addIcon: {
    backgroundColor: Colors.blue,
    borderRadius: 100,
    color: Colors.white,
  },
});
