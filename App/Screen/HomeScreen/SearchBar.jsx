import { View } from 'react-native';
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import React, { useEffect, useContext, useState } from 'react';
import UserLocationContext from '@/app/Context/UserLocationContext.jsx';

export default function SearchBar() {
  const { location, setLocation } = useContext(UserLocationContext);

  return (
    <View>
      
      <GooglePlacesTextInput
        placeHolderText= 'Search Chargers'
        apiKey="AIzaSyAooBfMOhOijTPqRo-LsulE9zVDv7JZskk"
        fetchDetails={true}
        detailsFields={['formattedAddress', 'location', 'viewport', 'photos']}
        onPlaceSelect={(place) => {
        const lat = place.details?.location?.latitude;
        const lng = place.details?.location?.longitude;

        if (lat && lng) {
            setLocation({ latitude: lat, longitude: lng });
        } else {
            console.warn("No geometry.location in selected place:", place);
        }
        }}

        />
    </View>
  );
}
