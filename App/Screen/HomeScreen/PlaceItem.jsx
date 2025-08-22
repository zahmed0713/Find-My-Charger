import { View, Text, Image, Dimensions, Button, Linking} from 'react-native'
import DistanceApi from './../../DistanceApi.js';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import React from 'react'
import axios from "axios";

export default function PlaceItem({location, place}) {
    const {user} = useUser();
      const [distance, setDistance] = useState(null);

useEffect(() => {
  if (location) {
    console.log('Fetching nearby places for:', location);
    GetDistance();
  }
}, [location]);

const GetDistance = () => {
  DistanceApi.NewDistance(location, place.geometry.location )
    .then((resp) => {
      console.log('API response:', JSON.stringify(resp.data, null, 2));
      const distanceText = resp.data?.rows?.[0]?.elements?.[0]?.distance?.text;
        if (distanceText) {
          setDistance(distanceText);
        } else {
          setDistance("Distance not found");
        }
    });
};
const postData = async ()=>{
try {
const response = await axios.post(
`http://192.168.12.248:5001/api/SavedItems`, {
  user_id: user.id,
  address: place?.vicinity,
  name: place?.name,
  latitude: place.geometry.location.lat,
  longitude: place.geometry.location.lng
}, {
  headers: {
    "Content-Type": "application/json"
  }
}
)
} catch (error) {
  console.log("error");
}
}
const openInMaps = () => {
 if (place.vicinity) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.vicinity)}`;
      Linking.openURL(url);
    } else {
      console.log("No location info available");
    }
  };
  return (
    <View style = {{width:Dimensions.get("screen").width*0.9, marginLeft: 10}}>  
       
  
        <Image
  source={
   place?.photos?
       {
          uri:
            "https://maps.googleapis.com/maps/api/place/photo" +
            "?maxwidth=400" +
            "&photoreference=" +
            place.photos[0].photo_reference +
            "&key=AIzaSyAooBfMOhOijTPqRo-LsulE9zVDv7JZskk",
        }
      : require('./../../../assets/images/evLogo.png')
  }
  style = {{width: '100%', borderRadius:10, height:130, alignItems: 'center'}}
/>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#333' }}>{place?.name || 'No Name Available'}</Text>
      <Text  style= {{ marginBottom: 4}}>{place?.vicinity }</Text>
       <Text>{distance}</Text>
      <Button title="Go to Destination" onPress={openInMaps} />
    <Button title="Save Destination" onPress={postData} />

    </View>
  )
}
