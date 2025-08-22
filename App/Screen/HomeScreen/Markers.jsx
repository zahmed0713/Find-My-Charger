import { MarkerContext } from '@/app/Context/MarkerContext';
import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';

export default function Markers({index, place }) {
    const {selectedMarker, setSelectedMarker} = useContext(MarkerContext);
  return (
    <Marker
      coordinate={{
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }}
      onPress={()=>setSelectedMarker(index)}
      image={require('./../../assets/images/markerNewest.png')}
    />
  );
}
