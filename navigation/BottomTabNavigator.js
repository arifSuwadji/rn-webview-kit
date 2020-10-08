import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Alert, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { WorkSans } from '../components/StyledText';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import { HomeScreen, KeranjangScreen, ProfileScreen, TvScreen } from '../screens';
import { DetailScreen, KategoriScreen } from '../screens/Home';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const HomeScreenTab = () => {
    return (
        <Tab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let icon;
                    size = 30;
                        
                    if (route.name === 'Home') {
                        icon = "MaterialCommunityIcons";
                        iconName = focused
                        ? 'home-variant'
                        : 'home-variant-outline';
                    } else if (route.name === 'Tv') {
                        icon = "Ionicons";
                        iconName = focused ? 'ios-tv' : 'md-tv';
                    } else if (route.name === 'Keranjang'){
                        icon = focused ? "Entypo" : "Feather";
                        iconName = 'shopping-bag';
                    } else if (route.name === 'Profil'){
                        icon = "MaterialIcons";
                        iconName = focused ? 'person' : 'person-outline';
                    }
        
                    // You can return any component that you like here!
                    return <TabBarIcon typeIcon={icon} focused={focused} name={iconName} size={size} color={color} />
                },
            })}
            tabBarOptions={{
                activeTintColor: Colors.menuActive,
                inactiveTintColor: Colors.menuDefault,
                labelStyle: {
                    fontSize: 11,
                    fontWeight: 'bold',
                    height:15,
                    marginBottom:5,
                    flexWrap: "wrap",
                    flexDirection: "column",
                },
                // activeBackgroundColor: Colors.headerColor,
                // inactiveBackgroundColor: Colors.bodyColor,
                style:{
                    borderTopWidth:2,
                    borderTopColor: Colors.headerColor,
                    height:65,
                },
            }}
            animationEnabled={true}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'HOME' }} />
            <Tab.Screen name="Tv" component={TvScreen} options={{ title: 'TV ONLINE' }} />
            <Tab.Screen name="Keranjang" component={KeranjangScreen} options={{ title: 'KERANJANG' }}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        Alert.alert('Tampilkan slide menu shopping cart');
                    }
                }}
            />
            <Tab.Screen name="Profil" component={ProfileScreen} options={{ title: 'PROFIL' }} />
        </Tab.Navigator>
    )
}

function BottomTabNavigator(props) {
    return (
        <Stack.Navigator>
            {/* Child Pages Home */}
            <Stack.Screen name="Home" component={HomeScreenTab} options={{ headerShown: false }} />
            <Stack.Screen name="Kategori" component={KategoriScreen} options={({ route }) => ({ title: route.params.title })}/>
            <Stack.Screen name="Detail" component={DetailScreen} options={
                ({ navigation, route }) => ({
                    title: route.params.title,
                    headerTitle: () => (
                        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>{route.params.title}</Text>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', paddingHorizontal: 10}}>
                            <TouchableOpacity onPress={() => props._onBackHome(navigation)}>
                                <MaterialCommunityIcons name="home-variant-outline" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                    ),
                })
            }/>
        </Stack.Navigator>
    );
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _onBackHome : (navigation) => {
            console.log('I want to back home ');
            navigation.popToTop();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabNavigator);