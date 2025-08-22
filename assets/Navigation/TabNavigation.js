import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screen/HomeScreen/HomeScreen';
import FavoriteScreen from '../../Screen/FavoriteScreen/FavoriteScreen';
import ProfileScreen from '../../Screen/ProfileScreen/ProfileScreen';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react'

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
      console.log('hello');
  return ( <Tab.Navigator screenOptions = {{headerShown:false}}>
            
            <Tab.Screen name = 'home' component = {HomeScreen}
             options = {{tabBarLabel: 'search',
                tabBarIcon:({color,size})=>(
                   <Feather name="search" size={24} color="black" />
                )
            }}/>
            <Tab.Screen name = 'favorites' component = {FavoriteScreen}
            options = {{tabBarLabel: 'saved',
                tabBarIcon:({color,size})=>(
                  <Fontisto name="favorite" size={24} color="black" />
                )
            }} />
    </Tab.Navigator>
  )
}