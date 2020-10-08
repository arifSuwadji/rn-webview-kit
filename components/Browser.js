import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import Colors from '../constants/Colors'

class Browser extends Component {
    LoadingIndicatorView() {
        return (
            <Modal
                transparent={true}
                animationType={'fade'}
                visible={true}
                onRequestClose={() => {console.log('close modal')}}>
                <View style={{flex: 1,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    backgroundColor: '#00000040'}}>
                    <View style={{backgroundColor: '#FFFFFF',
                        height: 100,
                        width: 100,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around'}}>
                        <ActivityIndicator size={"large"} color={Colors.headerColor}/>
                    </View>
                </View>
                <StatusBar barStyle="dark-content" backgroundColor="#00000040" />
            </Modal>
        )
    }

    render() {
        const runFirst=`
            window.isNativeApp = true;
            true;
        `;
        return (
            <WebView
                source={{ uri: this.props.link }}
                onShouldStartLoadWithRequest={(request) => {
                    // console.log(this.props.link, ' is stop or continue url');
                    if(request.url !== this.props.originPage){
                        // console.log(`other page to ${request.url} from ${this.props.originPage}`);
                        return this.props._onLoadOtherPage(request);
                    }else{
                        console.log('origin page');
                        return request.url.startsWith(this.props.link);
                    }
                }}
                renderLoading={this.LoadingIndicatorView}
                startInLoadingState={true}
                style={styles.container}
                javaScriptEnabled={true}
                injectedJavaScript={this.props.myScript}
                injectedJavaScriptBeforeContentLoaded={runFirst}
                onMessage={this.props._onMessage}
                onNavigationStateChange={this.props._onNavigationChange}
                onLoad={this.props._onLoad}
                onLoadStart={this.props._onLoadStart}
                onLoadEnd={this.props._onLoadEnd}
                onLoadProgress={this.props._onLoadProgress}
                onHttpError={this.props._onHttpError}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        )
    }
}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Browser