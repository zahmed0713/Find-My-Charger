import { View, Text,FlatList, Dimensions } from 'react-native'
import { useCallback, useState,useEffect } from "react";
import { useUser } from '@clerk/clerk-expo';
import SavedItem from './SavedItem.jsx'
import axios from "axios"
import React from 'react'

export default function FavoriteScreen() {
   const{user} = useUser();
    const [items, setItems] = useState([]);
    const fetch = useCallback(async ()=> {
      try {
        const response = await axios.get(`http://192.168.12.248:5001/api/SavedItems/${user.id}`);
    setItems(response.data); 
      } catch (error) {
        console.log("error");
      }
    })
    useEffect(() => {
    if (user?.id) {
      fetch();
    }
  }, [fetch, user?.id]);
    const itemWidth = Math.round(Dimensions.get('window').width ) + 10;
  
  return (
    <View style ={{marginTop:25}}>
         <FlatList
           
           data={items}
           
           
           renderItem={({ item }) => (
             <View style={{ width: itemWidth, marginRight: 0 }}>
              <SavedItem place = {item} refreshItems={fetch} />

             </View>
           )}
         />
       </View>
  )
}