import React, {Component} from 'react';
import styles from '../../../helpers/styles';
import AppText from '../../../components/AppText';
import {ScrollView} from 'react-native-gesture-handler';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import AppSpinner from '../../../components/AppSpinner';
import Header from '../../../components/header';
import BottomNavigation from '../../../components/BottomNavigation';
import {observer, inject} from 'mobx-react';
import Swiper from 'react-native-swiper';
import colors from '../../../helpers/colors';
import normalize from 'react-native-normalize';
import axios from 'axios';
import {apiConfig} from '../../../helpers/apiConfig';

@inject('Store')
@observer
export default class IssueDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: null,
      issueAuthor: null,
    };
  }

  componentDidMount() {
    this.props.Store.toggleSpinner(true);
    axios
      .get(apiConfig.API.ISSUE.GET_ISSUE_BY_ID + this.props.route.params.id, {
        headers: {Authorization: 'Bearer ' + this.props.Store.accessToken},
      })
      .then((response) => {
        this.props.Store.toggleSpinner(false);
        this.setState({issue: response.data});
      })
      .catch((error) => {
        this.props.Store.toggleSpinner(false);
        console.error(error);
      });
  }

  render() {
    const {navigation, route} = this.props;
    const {width} = Dimensions.get('window');
    return (
      <>
        <AppSpinner />
        <Header nvg={{...navigation}} title={route.params.title} />
        <>
          <View style={styles.screenWrapper}>
            {this.state.issue && (
              <ScrollView>
                <Swiper
                  style={{height: width}}
                  activeDotColor={colors.blue}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  loop={false}>
                  {this.state.issue?.photo1 && (
                    <ImageBackground
                      source={{uri: this.state.issue?.photo1}}
                      style={styleSheet.cover}
                    />
                  )}
                  {this.state.issue?.photo2 && (
                    <ImageBackground
                      source={{uri: this.state.issue?.photo2}}
                      style={styleSheet.cover}
                    />
                  )}
                  {this.state.issue?.photo3 && (
                    <ImageBackground
                      source={{uri: this.state.issue?.photo3}}
                      style={styleSheet.cover}
                    />
                  )}
                  {!this.state.issue?.photo1 &&
                    !this.state.issue?.photo2 &&
                    !this.state.issue?.photo3 && (
                      <ImageBackground
                        source={require('../../../assets/img/no-image.jpg')}
                        style={styleSheet.cover}
                      />
                    )}
                </Swiper>
                <View style={styles.scrollView}></View>
              </ScrollView>
            )}
          </View>
        </>
        <BottomNavigation />
      </>
    );
  }
}

const styleSheet = StyleSheet.create({
  cover: {
    height: '100%',
    width: '100%',
    opacity: 1,
    position: 'absolute',
    overflow: 'hidden',
    resizeMode: 'cover',
  },
});
