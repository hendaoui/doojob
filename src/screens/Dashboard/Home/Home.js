import React, {Component} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import Header from '../../../components/header';
import styles from '../../../helpers/styles';
import AppText from '../../../components/AppText';
import normalize from 'react-native-normalize';
import AppSpinner from '../../../components/AppSpinner';
import {apiConfig} from '../../../helpers/apiConfig';
import axios from 'axios';
import {observer, inject} from 'mobx-react';
import IssueCard from '../../../components/IssueCard';

@inject('Store')
@observer
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction();
    });
    this.props.Store.setActiveTab('home');
    this.props.Store.toggleSpinner(true);
    setTimeout(() => {
      this.getIssuesList();
    }, 500);
  }

  onFocusFunction = () => {
    this.props.Store.setActiveTab('home');
  };

  getIssuesList = () => {
    this.props.Store.toggleSpinner(true);
    axios
      .get(apiConfig.API.ISSUE.LIST, {
        headers: {Authorization: 'Bearer ' + this.props.Store.accessToken},
      })
      .then((response) => {
        this.props.Store.toggleSpinner(false);
        this.props.Store.setIssuesList(response.data);
      })
      .catch((error) => {
        this.props.Store.toggleSpinner(false);
        console.error(error);
      });
  };

  render() {
    const {navigation} = this.props;
    return (
      <>
        <AppSpinner />
        <View style={styles.screenWrapperWithRadius}>
          <ScrollView
            style={[styles.scrollView, {minHeight: 200}]}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  this.setState({refreshing: true});
                  this.getIssuesList();
                }}
              />
            }>
            <Header
              nvg={{...navigation}}
              title="Home"
              noIcon
              screenTitle
              showNotifications
            />
            {this.props.Store.issuesList.length ? (
              this.props.Store.issuesList?.map((issue) => {
                return (
                  <IssueCard
                    key={issue?._id}
                    details={issue}
                    navigation={this.props.navigation}
                  />
                );
              })
            ) : (
              <>
                <AppText>No Issues Found, please pull to refresh!</AppText>
              </>
            )}
          </ScrollView>
        </View>
      </>
    );
  }
}
