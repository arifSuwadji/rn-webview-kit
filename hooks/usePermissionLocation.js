import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Alert, View } from 'react-native';

export default function usePermissionLocation(){
    const [isLocationComplete, setLocationComplete] = useState(null);

    useEffect(() => {
        async function loadDataLocation(){
            try{
                const { status } = await Permissions.getAsync(Permissions.LOCATION);
                if(status !== 'granted'){
                    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
                    if(status === 'granted'){
                        let location = Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                        setLocationComplete((await location).coords);
                    }else{
                        Alert.alert('siWarga tidak dapat mengakses lokasi anda');
                    }
                }else{
                    let location = Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                    setLocationComplete((await location).coords);
                }
            }catch(e){
                console.warn(e);
            }
        }

        loadDataLocation();
    }, []);
    return isLocationComplete;
}