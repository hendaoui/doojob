import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { inject, observer } from 'mobx-react';

@inject('Store')
@observer
export default class AppSpinner extends Component {

    render() {
        return (
            <Spinner
                visible={this.props.Store.showSpinner}
                color={Colors.blue}
                cancelable={false}
                animation={"fade"}
            />
        );
    }
}
