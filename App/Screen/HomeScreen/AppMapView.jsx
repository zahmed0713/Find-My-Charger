import { View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import MapViewStyle from './MapViewStyle.json';
import { UserLocationContext } from '@/app/Context/UserLocationContext';
import React from 'react'
import { Marker } from 'react-native-maps';
import Markers from './Markers'
import { useContext } from 'react'; // Make sure this is imported

export default function AppMapView({placeList}) {

const { location, setLocation } = useContext(UserLocationContext);

    return location?.latitude&&(
    <View>
       <MapView style={styles.map} 
       customMapStyle={MapViewStyle}
       region = {{latitude:location?.latitude,
        longitude:location?.longitude,
        latitudeDelta:0.0422,
        longitudeDelta:0.0421
       }}>
           {location? <Marker
            coordinate ={{latitude:location?.latitude,
        longitude:location?.longitude}}/>:null}

        {placeList&&placeList.map((item, index)=>(
            <Markers key = {index}
            index = {index}
            place = {item} />
        ))}
       </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
