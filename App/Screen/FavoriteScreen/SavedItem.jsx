import { View, Text, Button, Linking } from 'react-native';
import { useCallback } from "react";
import React from 'react';
import axios from "axios";

export default function SavedItem({ place, refreshItems }) {
  const deletion = useCallback(async () => {
    try {
      await axios.delete(`http://192.168.12.248:5001/api/SavedItems/${place.id}`);
      if (refreshItems) refreshItems();
    } catch (error) {
      console.log("error", error);
    }
  }, [place.id, refreshItems]);

  const openInMaps = () => {
    if (place.latitude && place.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
      Linking.openURL(url);
    } else if (place.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`;
      Linking.openURL(url);
    } else {
      console.log("No location info available");
    }
  };

  return (
    <View style={{ height: 150 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#333' }}>
        {place?.name || 'No Name Available'}
      </Text>
      <Text style={{ marginBottom: 4 }}>{place?.address}</Text>
      <Button title="Go to Destination" onPress={openInMaps} />
      <Button title="Delete Destination" onPress={deletion} />
    </View>
  );
}
