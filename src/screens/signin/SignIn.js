import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, HelperText } from 'react-native-paper';
import Header from '../../components/Header';
import Subheader from '../../components/Subheader';
import LinkButton from '../../components/LinkButton';
import ContainedButton from '../../components/ContainedButton';
import { invalidEmail, invalidPassword, isLoggedIn, signInWithEmail } from '../../api/firebase';

export default function SignIn({ navigation }) {
  const [secure, setSecure] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailErr, setEmailErr] = React.useState(false);
  const [passwordErr, setPasswordErr] = React.useState(false);

  const createAccount = () => {
    navigation.navigate("CreateAccount");
  }

  const goHome = async () => {
    setEmailErr(false);
    setPasswordErr(false);
    setDisabled(true);
    const error = await signInWithEmail(email, password);
    if (!error) {
      navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      if (invalidEmail.indexOf(error.code) > -1) {
        setEmailErr(true);
      }
      if (invalidPassword.indexOf(error.code) > -1) {
        setPasswordErr(true);
      }
      setDisabled(false);
    }
  }

  const forgotPassword = () => {

  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
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
            style={[styles.input, emailErr && styles.error]}
            value={email}
            onChangeText={(text) => setEmail(text)}
            selectionColor="white"
            keyboardType="email-address"
            theme={{ colors: { text: "white", placeholder: 'rgba(255, 255, 255, 0.5);' } }}
          />
          <HelperText type="error" visible={emailErr}>
            Please enter a valid email
          </HelperText>
          <TextInput
            mode="outlined"
            placeholder="Create a password"
            style={[styles.input, passwordErr && styles.error]}
            value={password}
            onChangeText={(text) => setPassword(text)}
            selectionColor="white"
            secureTextEntry={secure}
            theme={{ colors: { text: "white", placeholder: 'rgba(255, 255, 255, 0.5);' } }}
            right={
              <TextInput.Icon style={{ marginRight: 30 }} name={secure ? "eye" : "eye-off"} color="white"
                onPress={() => setSecure(!secure)}
              />
            }
          />
          <HelperText type="error" visible={passwordErr}>
            Please enter a valid password
          </HelperText>
          <LinkButton onPress={() => forgotPassword()} normal style={{ alignItems: 'flex-start' }}>
            Forgot Password?
          </LinkButton>
        </View>
        <View style={styles.buttonContain}>
          <ContainedButton disabled={disabled} onPress={() => goHome()}>
            Continue
          </ContainedButton>
          <LinkButton onPress={() => createAccount()} style={{ marginTop: 32 }}>
            Create an Account
          </LinkButton>
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
    marginTop: 13,
    justifyContent: 'center',
    fontSize: 20,
  },
  error: {
    backgroundColor: '#CE4141',
  },
  buttonContain: {
    paddingTop: 104,
    paddingBottom: 20,
  },
});
