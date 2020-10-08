import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Colors from './constants/Colors';
import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

function Feed() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed Screen</Text>
      </View>
    );
}
  
function Article() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Article Screen</Text>
      </View>
    );
}

const Drawer = createDrawerNavigator();

function Router(props) {
    const isLoadingComplete = useCachedResources();
    if (!isLoadingComplete) {
        return (
            <View style={{ flex: 1, height: 500, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={"large"} />
                <StatusBar barStyle="dark-content" backgroundColor="#fefefe" />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
                <NavigationContainer linking={LinkingConfiguration}>
                    <Drawer.Navigator initialRouteName="Home"
                        drawerStyle={{ width: '100%', backgroundColor: Colors.menuActive }}
                        overlayColor={Colors.menuActive}//"transparent"
                        drawerContentOptions={{
                            activeBackgroundColor:'tomato',
                            inactiveTintColor: 'tomato',
                            activeTintColor: Colors.menuActive,
                        }}
                    >
                        <Drawer.Screen name="Feed" component={Feed} options={{ title: 'FEED'}} />
                        <Drawer.Screen name="Article" component={Article} options={{ title: 'ARTIKEL'}} />
                        {/* Default Pages */}
                        <Drawer.Screen name="Home" component={BottomTabNavigator} options={{ title: 'HOME' }}/>
                    </Drawer.Navigator>
                </NavigationContainer>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.menuActive} />
            </View>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Router);
