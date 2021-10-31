import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline } from 'react-native-paper';
import Header from '../../components/Header';
import Subheader from '../../components/Subheader';
import LinkButton from '../../components/LinkButton';
import ContainedButton from '../../components/ContainedButton';

export default function SignIn({ navigation }) {
  const [secure, setSecure] = React.useState(true);

  const createAccount = () => {
    navigation.navigate("CreateAccount");
  }

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
      <View style={styles.container}>
        <View>
          <Header>
            Sign In
          </Header>
          <Subheader>
            And start deciding
          </Subheader>
        </View>
        <View>
          <TextInput
            mode="outlined"
            placeholder="Enter your email"
            style={styles.input}
            selectionColor="white"
            keyboardType="email-address"
            theme={{ colors: { text: "white", placeholder: 'rgba(255, 255, 255, 0.5);' } }}
          />
          <TextInput
            mode="outlined"
            placeholder="Create a password"
            style={styles.input}
            selectionColor="white"
            secureTextEntry={secure}
            theme={{ colors: { text: "white", placeholder: 'rgba(255, 255, 255, 0.5);' } }}
            right={
              <TextInput.Icon style={{ marginRight: 30 }} name={secure ? "eye" : "eye-off"} color="white"
                onPress={() => setSecure(!secure)}
              />
            }
          />
          <LinkButton onPress={() => createAccount()}>
            already have an account?
          </LinkButton>
        </View>
        <View style={styles.buttonContain}>
          <ContainedButton onPress={() => goHome()}>
            Continue
          </ContainedButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  input: {
    backgroundColor: '#263238',
    marginVertical: 10,
    justifyContent: 'center',
    fontSize: 20,
  },
  buttonContain: {
    paddingBottom: 48,
  },
});
