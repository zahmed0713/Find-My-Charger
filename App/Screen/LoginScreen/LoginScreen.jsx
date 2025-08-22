import React from 'react'
import { Text, TouchableOpacity, View, Button } from 'react-native'
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect } from 'react';
import { useWarmUpBrowser } from '@/app-example/hooks/warmUpBrowser';
import {useSSO} from '@clerk/clerk-expo';
import { useUser } from '@clerk/clerk-expo'
import * as AuthSession from 'expo-auth-session';
WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser();
//const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
   const { startSSOFlow } = useSSO();
   const onPress = useCallback(async () => {
  try {
    const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
      strategy: 'oauth_google',
      redirectUrl: AuthSession.makeRedirectUri(),
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });
      }
    } else {
      // Handle additional steps like MFA
    }
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
}, []);
  const {user} = useUser();
  return (
    <View style={styles.container}>
  <Image source={require('./../../../assets/images/evLogo.png')} style={styles.logoImage} />
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Login With Google</Text>
  </TouchableOpacity>
</View>
  )
}
// const styles = StyleSheet.create({
//   logoImage:{
//     width:200,
//     height:300,
//     objectFit:'contain'
//   },
//   button:{
//     backgroundColor: "#0000FF',
//     display: 'flex',
//     borderRadius: 97,
//     marginTop: 100,
//     padding: 16
//   }
// })
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  logoImage: {
    width: 200,
    height: 300,
    resizeMode: 'contain', // preferred over objectFit
  },
  button: {
    backgroundColor: '#0000FF',
    borderRadius: 97,
    marginTop: 100,
    padding: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 17,
  },
});
