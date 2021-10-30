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

const Stack = createStackNavigator();

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

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <Provider theme={DecisionsTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{
            header: (props) => <NavigationBar {...props} />,
            headerShadowVisible: false,
          }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
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
