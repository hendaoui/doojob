import React, {Component} from 'react';
import styles from '../../../helpers/styles';
import AppText from '../../../components/AppText';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
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
import moment from 'moment';
import AppButton from '../../../components/AppButton';
import Icon from 'react-native-vector-icons/Feather';

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

  async componentDidMount() {
    this.props.Store.setActiveTab('home');
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
    this.props.Store.toggleSpinner(true);
    axios
      .get(apiConfig.API.ISSUE.GET_ISSUE_BY_ID + this.props.route.params.id, {
        headers: {Authorization: 'Bearer ' + this.props.Store.accessToken},
      })
      .then((response) => {
        this.setState({issue: response.data});
        // get Author data
        axios
          .get('user/' + response.data?.author, {
            headers: {Authorization: 'Bearer ' + this.props.Store.accessToken},
          })
          .then((response) => {
            this.props.Store.toggleSpinner(false);
            this.setState({issueAuthor: response.data});
          })
          .catch((error) => {
            this.props.Store.toggleSpinner(false);
            console.error(error);
          });
      })
      .catch((error) => {
        this.props.Store.toggleSpinner(false);
        console.error(error);
      });
  }

  onFocusFunction = () => {
    this.props.Store.setActiveTab('home');
  };

  render() {
    const {navigation, route} = this.props;
    const {width} = Dimensions.get('window');
    return (
      <>
        <AppSpinner />
        <Header nvg={{...navigation}} title={route.params.title} />
        <>
          <View style={styles.screenWrapper}>
            {this.state.issue && this.state.issueAuthor && (
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
                <View style={styles.scrollView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginVertical: normalize(20),
                    }}>
                    <View>
                      <ImageBackground
                        style={styleSheet.author}
                        source={
                          this.state?.issueAuthor?.photo
                            ? {uri: this.state?.issueAuthor?.photo}
                            : require('../../../assets/img/avatar.jpg')
                        }
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: normalize(10),
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <AppText style={{fontFamily: 'Poppins-SemiBold'}}>
                          {this.state.issueAuthor?.firstName +
                            ' ' +
                            this.state.issueAuthor?.lastName}
                        </AppText>
                        <AppText style={{fontSize: normalize(14)}}>
                          {moment(this.state.issue?.createdAt).format('LLL')}
                        </AppText>
                      </View>
                      <View style={{alignSelf: 'center'}}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={{
                            backgroundColor: colors.blue,
                            borderRadius: normalize(50),
                            width: normalize(37),
                          }}
                          onPress={() => navigation.navigate('maps')}>
                          <Icon
                            name={'map-pin'}
                            size={normalize(20)}
                            color={colors.white}
                            style={{
                              paddingHorizontal: normalize(10),
                              paddingVertical: normalize(10),
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View>
                    <AppText style={{textAlign: 'justify'}}>
                      {this.state.issue?.description}
                    </AppText>
                  </View>
                  <AppButton title="apply" />
                </View>
              </ScrollView>
            )}
          </View>
        </>
        <BottomNavigation navigation={navigation} />
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
  author: {
    height: normalize(60),
    width: normalize(60),
    opacity: 1,
    position: 'relative',
    borderRadius: normalize(60),
    overflow: 'hidden',
  },
});
