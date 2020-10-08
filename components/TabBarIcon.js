import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  if(props.typeIcon === 'Ionicons'){
    return (
      <TouchableOpacity >
        <Ionicons
          name={props.name}
          size={props.size}
          color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </TouchableOpacity>
    );
  }else if(props.typeIcon === 'Entypo'){
    return (
      <TouchableOpacity>
        <Entypo
          name={props.name}
          size={props.size}
          color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </TouchableOpacity>
    );
  }else if(props.typeIcon === 'MaterialCommunityIcons'){
    return(
      <TouchableOpacity>
        <MaterialCommunityIcons
          name={props.name}
          size={props.size}
          color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </TouchableOpacity>
    );
  }else if(props.typeIcon === 'MaterialIcons'){
    return (
      <TouchableOpacity>
        <MaterialIcons
          name={props.name}
          size={props.size}
          color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </TouchableOpacity>
    );
  }else if(props.typeIcon === 'FontAwesome5'){
    return(
      <TouchableOpacity>
        <FontAwesome5
          name={props.name}
          size={props.size}
          color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </TouchableOpacity>
    );
  }else if(props.typeIcon === 'Feather'){
    return(
      <TouchableOpacity>
        <Feather
          name={props.name}
          size={props.size}
          color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </TouchableOpacity>
    );
  }
}
