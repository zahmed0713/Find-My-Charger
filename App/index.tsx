import { View } from "react-native";
import LoginScreen from './Screen/LoginScreen/LoginScreen.jsx'
import { ClerkProvider } from '@clerk/clerk-expo'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from "react";
//import { tokenCache } from '@clerk/clerk-expo/token-cache'
//import { NavigationContainer } from "@react-navigation/native";
import { UserLocationContext } from './Context/UserLocationContext.jsx';

import TabNavigation from './assets/Navigation/TabNavigation.js'
import { NavigationContainer } from "@react-navigation/native";
import * as Location from 'expo-location';

// import { useFonts } from 'expo-font';

// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();
     // tokenCache={tokenCache}

export default function Index() {
 // const [location, setLocation] = useState<Location.LocationObject | null>(null);
 const [location, setLocation] = useState<Location.LocationObject['coords'] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
     console.log(location.coords);

    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

return (
<ClerkProvider publishableKey= {'pk_test_ZW1pbmVudC1zZXJ2YWwtNDcuY2xlcmsuYWNjb3VudHMuZGV2JA'} >
  <UserLocationContext.Provider
  value = {{location, setLocation}}>
    <View
      style={{
        flex: 1,
        paddingTop:25
      }}>  
      <SignedIn>
        <TabNavigation/>     
      </SignedIn>
      <SignedOut> 
        <LoginScreen/>
      </SignedOut> 
    </View>
  </UserLocationContext.Provider>               

</ClerkProvider>
  );
}


