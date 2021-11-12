import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from './src/components/NavigationBar';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, Provider } from 'react-native-paper';
import { DecisionsTheme } from './src/themes/themes';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import SignIn from './src/screens/signin/SignIn';
import CreateAccount from './src/screens/signin/CreateAccount';
import Home from './src/screens/Home';
import JoinRoom from './src/screens/JoinRoom';
import Room from './src/screens/Room';
import Instructions from './src/screens/Instructions';
import RoomSwipe from './src/screens/RoomSwipe';
import HostStreaming from './src/screens/HostStreaming';
import HostGenres from './src/screens/HostGenres';
import HostFilters from './src/screens/HostFilters';
import { auth, isLoggedIn } from './src/api/firebase';

const Stack = createStackNavigator();

const hostOptions = {
  header: (props) => <NavigationBar {...props} showRoomCode />
};

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const [isAuthReady, setAuthReady] = React.useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthReady(true);
    })
  }, [])
  
  if (!fontsLoaded || !isAuthReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <Provider theme={DecisionsTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={isLoggedIn() ? "Home" : "SignIn"} screenOptions={{
            header: (props) => <NavigationBar {...props} />,
            headerShadowVisible: false,
          }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="JoinRoom" component={JoinRoom} />
            <Stack.Screen name="Room" component={Room} />
            <Stack.Screen name="Instructions" component={Instructions} options={{ headerShown: false }} />
            <Stack.Screen name="RoomSwipe" component={RoomSwipe} />
            <Stack.Screen name="HostStreaming" component={HostStreaming} options={hostOptions} />
            <Stack.Screen name="HostGenres" component={HostGenres} options={hostOptions} />
            <Stack.Screen name="HostFilters" component={HostFilters} options={hostOptions} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
