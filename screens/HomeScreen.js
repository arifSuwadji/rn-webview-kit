import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, BackHandler, StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Browser from '../components/Browser';
import { getState } from '../constants/CofigureStore';
import Layouts from '../constants/Layouts';
import pagesTypeAction from '../constants/reducers/pages/pagesTypeAction';

function HomeScreen(props) {
    const [slideMenu, setSlideMenu] = useState([]);
    const [slideKategori, setSlideKategori] = useState([]);
    let state = getState();
    let backPressed = 0;

    const backAction = () => {
        state = getState();
        if (!props.navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        }
        if(state.pages.exitApp > 0){
            backPressed = 0;
            props._onBackButtonExit(backPressed);
        }else{
            backPressed++;
            props._onBackButton(backPressed);
            setTimeout(async () => {
                backPressed = 0;
                props._onBackButton(backPressed);
            },2000);
        }
        return true;
    };
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const myScript=`
        (function(){
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

            //all link
            var attachEvent = function(elem, event, callback){
                if ( 'addEventListener' in window ) {
                    elem.addEventListener(event, callback, false);            
                } else if ( 'attachEvent' in window ) {
                    elem.attachEvent('on'+event, callback);            
                } else {
                    var registered = elem['on' + event];
                    elem['on' + event] = registered ? function(e) {
                        registered(e);
                        callback(e);
                    } : callback;
                }
                return callback(elem);
            }
            var menu = document.querySelectorAll('#menu-mobile a[href]');//menu
            if ( menu ) {
                for ( var i in menu ) {
                    if ( menu.hasOwnProperty(i) ) {
                        attachEvent(menu[i], 'click', function(e){
                            if(e.text){
                                window.ReactNativeWebView.postMessage(JSON.stringify({type: "href", message: "slide_menu", url: e.href, title: e.text}));
                            }
                        });
                    }
                }
            }
            var kategori = document.querySelectorAll("#navigation-mobile a[href]");//kategori
            if ( kategori ) {
                for ( var i in kategori ) {
                    if ( kategori.hasOwnProperty(i) ) {
                        attachEvent(kategori[i], 'click', function(e){
                            if(e.text){
                                window.ReactNativeWebView.postMessage(JSON.stringify({type: "href", message: "slide_kategori", url: e.href, title: e.text}));
                            }
                        });
                    }
                }
            }
        })();

        true;
    `;

    const _onMessage = event => {
        // retrieve event data
        var data = event.nativeEvent.data;
        // maybe parse stringified JSON
        try {
            data = JSON.parse(data)
            console.log(data);
        } catch ( e ) {
            console.warn(e);
        }
        // check if this message concerns us
        if ( 'object' == typeof data && data.url ) {
            console.log(data.message,' url ', data.url, ' title ', data.title);
            let title = data.title;
            let url = data.url;
            if(data.message === 'slide_menu'){
                slideMenu.push({title : title, url: url});
                props._loadSlide(data.message, JSON.stringify(slideMenu));
            }else if(data.message === 'slide_kategori'){
                slideKategori.push({title : title, url: url});
                props._loadSlide(data.message, JSON.stringify(slideKategori));
            }
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
        <SafeAreaView style={{flex:1}}>
            <Browser link={state.server.host} originPage={state.server.host} myScript={myScript} _onMessage={_onMessage} _onNavigationChange={(next) => props._onNavigationChange(props, next)} _onLoadStart={_onLoadStart} _onLoadEnd={_onLoadEnd} _onLoadProgress={_onLoadProgress} _onHttpError={_onHttpError} _onLoadOtherPage={_onLoadOtherPage} />
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _onBackButtonExit: async (backPressed) =>{
            await dispatch({ type: pagesTypeAction.EXIT_APP, exitApp: backPressed});
            BackHandler.exitApp();
        },
        _onBackButton: async (backPressed) => {
            ToastAndroid.show("Tekan sekali lagi untuk keluar", ToastAndroid.SHORT);
            await dispatch({ type: pagesTypeAction.EXIT_APP, exitApp: backPressed});
        },
        _loadSlide: async (type, data) => {
            if(type == 'slide_menu'){
                await dispatch({ type: pagesTypeAction.SLIDE_MENU, slideMenu: data});
            }else if(type == 'slide_kategori'){
                await dispatch({ type: pagesTypeAction.SLIDE_KATEGORI, slideKategori: data});
            }
            let state = getState();
            console.log('slide menu ',state.pages.slideMenu);
            console.log('slide kategori ',state.pages.slideKategori);
        },
        _onNavigationChange: async (props, next) => {
            // console.log(`new next mas ${JSON.stringify(next)}`);
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
            if(url.match(/\/kategori\//)){
                await props.navigation.navigate("Kategori", {title: title, link: next.url});
            }
            if(url.match(/\/detail\//)){
                await props.navigation.navigate("Detail", {title: title, link: next.url});
            }
            if(url === state.server.host){
                await props.navigation.push('Home');
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Layouts.statusBarHeight
    },
});
