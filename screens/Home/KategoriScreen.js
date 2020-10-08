import React from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import Browser from '../../components/Browser';
import { getState } from '../../constants/CofigureStore';
import pagesTypeAction from '../../constants/reducers/pages/pagesTypeAction';

function KategoriScreen(props) {
    const state = getState();

    const myScript=`
        // menu utama
        // document.body.style.backgroundColor = 'red';
        // setTimeout(function() { window.alert('hi') }, 2000);
        document.querySelector('body > div.navigation--list > div > a:nth-child(1) > i').addEventListener("click", function(){
            window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message: "ok", icon:"Menu", href:"#menu-mobile"}))
        });
        document.querySelector('body > div.navigation--list > div > a:nth-child(2) > i').addEventListener("click", function(){
            window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message: "ok", icon:"Kategori", href:"#navigation-mobile"}))
        });
        document.querySelector('body > div.navigation--list > div > a:nth-child(3) > i').addEventListener("click", function(){
            window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message: "ok", icon:"Cari", href:"#search-sidebar"}))
        });
        document.querySelector('body > div.navigation--list > div > a:nth-child(4) > i').addEventListener("click", function(){
            window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message: "ok", icon:"Keranjang", href:"#cart-mobile"}))
        });
        document.querySelector('div.navigation--list').style.display="none";
        document.querySelector("body > footer").style.display="none";
        document.querySelector("body > header.header.header--mobile").style.display="none";
        document.querySelector("body > div.ps-breadcrumb").style.display="none";
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

export default connect(mapStateToProps, mapDispatchToProps)(KategoriScreen);
