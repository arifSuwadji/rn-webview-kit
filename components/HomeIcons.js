import * as React from 'react';
import {View, Image, Text, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default function HomeIcons(props) {
    return (
        <View style={{width: `${100/3}%`, alignItems:'center', marginBottom:18}}>
                <View style={{width: 80, height:80, borderWidth:1, borderRadius:34, justifyContent:'center', alignItems:'center', borderColor: Colors.bodyColor}}>
                    <TouchableOpacity onPress ={ props.onPress ? props.onPress : () => Alert.alert(`Menu ${props.title}`)}>
                        <Image source={props.img} style={{ height:80, width:80}} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize:11, fontWeight: 'bold', textAlign: 'center', marginTop: 6, color:'#efefef'}}>{props.title}</Text>
        </View>
    )
}