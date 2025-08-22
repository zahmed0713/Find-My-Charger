// PlaceListView.jsx
import { View, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useContext, useRef } from 'react';
import PlaceItem from './PlaceItem';
import { MarkerContext } from '@/app/Context/MarkerContext';

export default function PlaceListView({ location, placeList = [] }) {
  const flatListRef = useRef(null);
  const { selectedMarker } = useContext(MarkerContext);

  const itemWidth = Math.round(Dimensions.get('window').width ) + 10;

  const getItemLayout = (_, index) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  });

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  useEffect(() => {
    if (
      typeof selectedMarker === 'number' &&
      placeList.length > 0 &&
      selectedMarker >= 0 &&
      selectedMarker < placeList.length
    ) {
      scrollToIndex(selectedMarker);
    }
  }, [selectedMarker, placeList.length]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal
        data={placeList}
        
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        keyExtractor={(_, i) => String(i)}
        onScrollToIndexFailed={(info) => {
          // Wait for layout, then try again at the nearest possible index
          const wait = new Promise((resolve) => setTimeout(resolve, 100));
          wait.then(() => {
            const safeIndex = Math.min(info.index, placeList.length - 1);
            if (safeIndex >= 0) {
              flatListRef.current?.scrollToIndex({ index: safeIndex, animated: true });
            }
          });
        }}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth, marginRight: 0 }}>
            <PlaceItem place={item} location={location} />
          </View>
        )}
      />
    </View>
  );
}
