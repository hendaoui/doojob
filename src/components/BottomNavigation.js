import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import Colors from '../helpers/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {observer, inject} from 'mobx-react';
@inject('Store')
@observer
export default class BottomNavigation extends Component {
  navigate = (path, tab = path) => {
    this.props.Store.setActiveTab(tab);
    this.props.navigation.navigate(path);
  };

  render() {
    return (
      <View style={styleSheet.contianer}>
        <TouchableOpacity onPress={() => this.navigate('dashboard', 'home')}>
          <Icon
            name={'home'}
            size={normalize(33)}
            style={
              (styleSheet.icon,
              {
                color:
                  this.props.Store.activeTab === 'home'
                    ? Colors.blue
                    : Colors.navyBlue,
              })
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigate('maps')}>
          <Icon
            name={'map'}
            size={normalize(33)}
            style={
              (styleSheet.icon,
              {color: Colors.navyBlue},
              {
                color:
                  this.props.Store.activeTab === 'maps'
                    ? Colors.blue
                    : Colors.navyBlue,
              })
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigate('profile')}>
          <Icon
            name={'user'}
            size={normalize(33)}
            style={
              (styleSheet.icon,
              {
                color:
                  this.props.Store.activeTab === 'profile'
                    ? Colors.blue
                    : Colors.navyBlue,
              })
            }
          />
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
