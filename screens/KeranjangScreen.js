import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { BackHandler, Text, ToastAndroid, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getState } from '../constants/CofigureStore';
import pagesTypeAction from '../constants/reducers/pages/pagesTypeAction';
import userTypeAction from '../constants/reducers/user/userTypeAction';

function KeranjangScreen(props) {
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
    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tampilan Keranjang!</Text>
            <Text>Update Profile!</Text>
        </View>
    );
}

KeranjangScreen.navigationOptions = {
    header: null,
};

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
        Logout: async (props) => {
            await dispatch({ type: pagesTypeAction.IS_LOADING, isLoading: true});
            await dispatch({ type: userTypeAction.IS_LOGED, isLoged: 0});
            props.navigation.navigate('Login');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeranjangScreen);