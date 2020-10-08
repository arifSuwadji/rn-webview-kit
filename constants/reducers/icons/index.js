import iconsTypeAction from './iconsTypeAction';
import Colors from '../../../constants/Colors';

const initialState = {
    iconHidePassword: 'ios-eye',
    iconShowPassword: 'ios-eye-off',
    securePassword: true,
    secureFalsePassword : false,
    iconHideKonfPassword: 'ios-eye',
    iconShowKonfPassword: 'ios-eye-off',
    secureKonfPassword: true,
    secureFalseKonfPassword: false,
    colorIconPassword: Colors.bodyColor,
    colorIconKonfPassword: Colors.bodyColor,
}

const icons = (state = initialState, action) => {
    switch(action.type){
        case iconsTypeAction.HIDE_TEXT:
            return {
                ...state,
                iconHidePassword: action.hideText,
            }
        case iconsTypeAction.SHOW_TEXT:
            return {
                ...state,
                iconHidePassword: action.showText,
            }
        case iconsTypeAction.SECURE_TEXT:
            return{
                ...state,
                securePassword: action.secureText
            }
        case iconsTypeAction.HIDE_KONF_TEXT:
            return {
                ...state,
                iconHideKonfPassword: action.hideKonfText
            }
        case iconsTypeAction.SHOW_KONF_TEXT:
            return {
                ...state,
                iconShowKonfPassword: action.showKonfText,
            }
        case iconsTypeAction.SECURE_KONF_TEXT:
            return {
                ...state,
                secureKonfPassword: action.secureKonfText
            }
        case iconsTypeAction.COLOR_TEXT:
            return {
                ...state,
                colorIconPassword: action.colorText
            }
        case iconsTypeAction.COLOR_KONF_TEXT:
            return {
                ...state,
                colorIconKonfPassword: action.colorKonfText
            }
        default:
            return {
                ...state
            }
    }
}
export default icons;