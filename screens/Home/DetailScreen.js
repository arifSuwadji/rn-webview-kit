import React from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import Browser from '../../components/Browser';
import { getState } from '../../constants/CofigureStore';
import pagesTypeAction from '../../constants/reducers/pages/pagesTypeAction';

function DetailScreen(props) {
    const state = getState();

    const myScript=`
        // menu utama
        // document.body.style.backgroundColor = 'red';
        // setTimeout(function() { window.alert('hi') }, 2000);
        document.querySelector("body > footer").style.display="none";
        document.querySelector("body > header.header.header--mobile.header--mobile-product").style.display="none";
        document.querySelector("body > div.ps-breadcrumb").style.display="none";
        document.querySelector("body > form > nav > button.ps-btn.ps-btn--black.rounded-0").addEventListener("click", function(){
            window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message: "ok", icon:"Masuk Keranjang", href:"#MasukKeranjang"}))
        })
        true;
    `;

    const _onMessage = event => {
        console.log('_onMessage', JSON.parse(event.nativeEvent.data));
        const res = JSON.parse(event.nativeEvent.data);
        if (res.message === 'ok') {
            Alert.alert(
                res.icon,
                `button clicked ${res.href}`
            );
        }
    }

    const _onLoadEnd = syntheticEvent => {
        const { nativeEvent } = syntheticEvent;
        // console.log(`load end ${nativeEvent.loading}`);
    }

    const _onLoadStart = syntheticEvent => {
        const { nativeEvent } = syntheticEvent;
        // console.log(`load start ${nativeEvent.loading}`);
    }

    const _onLoadProgress = ({nativeEvent}) => {
        // console.log(`progress ${nativeEvent.progress}`);
    }

    const _onHttpError= (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn(
            'WebView received error status code: ',
            nativeEvent.statusCode,
        );
        Alert.alert(
            'Tokoummat',
            `Ooops.. ${nativeEvent.statusCode}`
        );
    }
    const _onLoadOtherPage = (request) => {
        console.log(JSON.stringify(request));
        props._onLoadChild(props, request);
    }

    return (
            <View style={{flex:1}}>
                <Browser link={state.pages.nextPage} originPage={state.pages.nextPage} myScript={myScript} _onMessage={_onMessage} _onNavigationChange={(next) => props._onNavigationChange(props, next)} _onLoadStart={_onLoadStart} _onLoadEnd={_onLoadEnd} _onLoadProgress={_onLoadProgress} _onHttpError={_onHttpError} _onLoadOtherPage={_onLoadOtherPage} />
            </View>
    );
}

DetailScreen.navigationOptions={
    headerTitle: 'Arif Suwadji'
}


const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _onNavigationChange: async (props, next) => {
            // console.log(`new next child mas ${JSON.stringify(next)}`);
        },
        _onLoadChild: async(props, next) => {
            const state = getState();
            await dispatch({ type: pagesTypeAction.PAGE_TITLE, pageTitle: next.title });
            await dispatch({type: pagesTypeAction.NEXT_PAGE, nextPage: next.url});
            // Go back to first screen in stack
            // navigation.propToTop()
            let url = next.url;
            let arrTitle = url.split("/");
            let titleFirst = arrTitle[arrTitle.length-1];
            let arrLastTitle = titleFirst.split('-');
            let title = '';
            for(let titleItem of arrLastTitle){
                title += `${titleItem.charAt(0).toUpperCase()}${titleItem.slice(1)} `;
            }
            if(url === state.server.host){
                await props.navigation.navigate('Home', {title: title, link: next.url});
            }else{
                await props.navigation.push("Detail", {title: title, link: next.url});
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
