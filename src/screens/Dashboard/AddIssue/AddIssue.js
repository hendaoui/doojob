import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { inject, observer } from 'mobx-react';
import styles from '../../../helpers/styles';
import normalize from 'react-native-normalize';
import AppSpinner from '../../../components/AppSpinner';
import Header from '../../../components/header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppText from '../../../components/AppText';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../../helpers/colors';
import BottomNavigation from '../../../components/BottomNavigation';
import AppInput from '../../../components/AppInput';
import AppButton from '../../../components/AppButton';
import AppModal from '../../../components/AppModal';
import axios from 'axios';
import { apiConfig } from '../../../helpers/apiConfig';

@inject('Store')
@observer
export default class AddIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoNumber: 1,
            photo1: null,
            photo2: null,
            photo3: null,
            title: "",
            description: "",
            modal: {
                showModal: false,
                status: 'success',
                title: 'Success!',
                description: 'The Issue has been successfully created.',
            },
        }
    }

    componentDidMount() {
        this.props.Store.setCameraType('back');
        this.props.navigation.addListener('focus', () => {
            this.setState({ ...this.state, ["photo" + this.state.photoNumber]: this.props.Store?.cameraPhoto })
        })
    }

    takePhoto = (number) => {
        this.setState({ ...this.state, photoNumber: number })
        this.props.navigation.navigate('camera');
    };
    goToMap = () => {
        this.props.Store.setMapPurpose("setIssueLocation");
        this.props.navigation.navigate('maps');
    }
    submitIssue = () => {
        this.props.Store.toggleSpinner(true);
        let modal = { ...this.state.modal };
        axios
            .post(apiConfig.API.ISSUE.CREATE, {
                title: this.state.title,
                description: this.state.description,
                photo1: this.state.photo1,
                photo2: this.state.photo2,
                photo3: this.state.photo3,
                location: {
                    latitude: this.props.Store.issueLocation.latitude,
                    longitude: this.props.Store.issueLocation.longitude
                },
                author: this.props.Store.currentUser?.email
            }, { headers: { Authorization: 'Bearer ' + this.props.Store.accessToken } })
            .then((response) => {
                this.props.Store.toggleSpinner(false);
                modal.showModal = true;
                this.setState({ modal: modal });
            })
            .catch((error) => {
                this.props.Store.toggleSpinner(false);
                modal.showModal = true;
                modal.status = 'error';
                modal.title = 'Oops!';
                modal.description =
                    '[' +
                    error.response.data.statusCode +
                    '] ' +
                    error.response.data.message;
                this.setState({ modal: modal });
            });
    }

    componentWillUnmount() {
        this.props.Store.setCameraPurpose(null);
        this.props.Store.saveCameraPhoto(null);
    }
    render() {
        return (
            <>
                <AppSpinner />
                <AppModal
                    status={this.state.modal.status}
                    title={this.state.modal.title}
                    description={this.state.modal.description}
                    visible={this.state.modal.showModal}
                    onPress={() => {
                        let modal = { ...this.state.modal };
                        modal.showModal = false;
                        this.setState({ modal: modal });
                        if (this.state.modal.status === "success") {
                            this.props.Store.setMapPurpose(null);
                            this.props.Store.setIssueLocation(null);
                            this.props.navigation.replace('dashboard');
                        }
                    }}
                />
                <View style={styles.screenWrapperWithRadius}>
                    <View style={{ height: normalize(65), paddingRight: normalize(20) }}>
                        <Header
                            nvg={{ ...this.props.navigation }}
                            title="Create new Issue"
                            showNotifications
                        />
                    </View>
                    <ScrollView>
                        <View style={{
                            height: normalize(190),
                        }}>
                            <ScrollView
                                horizontal
                                scrollEventThrottle={1}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ flexGrow: 1 }}
                                style={styleSheet.horizontalScrollView}>
                                <TouchableOpacity
                                    style={[styleSheet.photoContainer, { marginLeft: normalize(20) }]}
                                    onPress={() => this.takePhoto(1)}>
                                    {!this.state.photo1 ? (
                                        <Icon name={'image'} size={normalize(30)} color={colors?.blue} />
                                    ) : (
                                            <ImageBackground
                                                source={{ uri: this.state.photo1 }}
                                                style={styleSheet.photo}
                                            />
                                        )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styleSheet.photoContainer}
                                    onPress={() => this.takePhoto(2)}>
                                    {!this.state.photo2 ? (
                                        <Icon name={'image'} size={normalize(30)} color={colors?.blue} />
                                    ) : (
                                            <ImageBackground
                                                source={{ uri: this.state.photo2 }}
                                                style={styleSheet.photo}
                                            />
                                        )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styleSheet.photoContainer}
                                    onPress={() => this.takePhoto(3)}>
                                    {!this.state.photo3 ? (
                                        <Icon name={'image'} size={normalize(30)} color={colors?.blue} />
                                    ) : (
                                            <ImageBackground
                                                source={{ uri: this.state.photo3 }}
                                                style={styleSheet.photo}
                                            />
                                        )}
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        <View style={{ marginHorizontal: normalize(20) }}>
                            <AppInput
                                label="Title"
                                value={this.state.title}
                                onChange={(val) => this.setState({ ...this.state, title: val })}
                            />
                            <AppInput
                                label="Description"
                                value={this.state.description}
                                onChange={(val) => this.setState({ ...this.state, description: val })}
                                style={{ height: normalize(170) }}
                                multiline={true}
                            />
                            <AppButton
                                title={this.props.Store.issueLocation ? "Submit" : "Next"}
                                onPress={() => {
                                    this.props.Store.issueLocation ?
                                        this.submitIssue() : this.goToMap()
                                }}
                                style={{ marginTop: normalize(30), marginBottom: normalize(30) }}
                                disabled={!this.state.title || !this.state.description}
                            />
                        </View>
                    </ScrollView>
                </View>
                <BottomNavigation navigation={this.props.navigation} />
            </>
        )
    }
}

const styleSheet = StyleSheet.create({
    photoContainer: {
        borderColor: Colors.blue,
        borderRadius: normalize(20),
        borderWidth: normalize(4),
        borderStyle: 'dashed',
        height: normalize(150),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: normalize(20),
    },
    photo: {
        height: '100%',
        width: '100%',
        opacity: 1,
        position: 'absolute',
        borderRadius: normalize(17),
        overflow: 'hidden',
    },
    horizontalScrollView: {
        paddingVertical: normalize(10),
    },
}
)
