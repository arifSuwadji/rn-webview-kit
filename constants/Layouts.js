import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

const screen = Dimensions.get('screen');
const window = Dimensions.get('window');

export default {
    heigth : screen.height,
    width : screen.width,
    scale : screen.scale,
    fontScale : screen.fontScale,
    statusBarHeight : Constants.statusBarHeight,
    wHeight: window.height
}