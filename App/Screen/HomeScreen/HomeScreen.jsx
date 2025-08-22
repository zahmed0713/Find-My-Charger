import { View, StyleSheet } from 'react-native';
import AppMapView from './AppMapView.jsx';
import SearchBar from './SearchBar.jsx';
import React, { useEffect, useContext, useState } from 'react';
import GlobalApi from './../../GlobalApi.js';
import { useUser } from '@clerk/clerk-expo';
import UserLocationContext from '@/app/Context/UserLocationContext.jsx';
import PlaceListView from './PlaceListView.jsx';

 import { MarkerContext } from './../../Context/MarkerContext.jsx'
export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
  if (location) {
    console.log('Fetching nearby places for:', location);
    GetNearByPlace();
  }
}, [location]);

const GetNearByPlace = () => {
  GlobalApi.NewNearByPlace(location, 'Charger')
    .then((resp) => {
     // console.log('API response:', JSON.stringify(resp.data, null, 2));
     console.log('my response:', JSON.stringify(resp.data.results[1], null, 2));
      const filtered = resp.data?.results || [];
      setPlaceList(filtered);
    });
};
  const {user} = useUser();
console.log(user.id);
  return (
    <MarkerContext.Provider value = {{selectedMarker, setSelectedMarker}}>
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <View style={styles.mapContainer}>
        <AppMapView placeList = {placeList}/>
        <View style={styles.placeListContainer}>
          <PlaceListView location = {location} placeList={placeList} />
        </View>
      </View>
    </View>
    </MarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  mapContainer: {
    flex: 1,
  },
  placeListContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    maxHeight: 300, // recommended for visibility
  },
});

