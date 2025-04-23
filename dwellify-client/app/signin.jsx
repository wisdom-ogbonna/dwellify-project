import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import styles from '../style/SigninAuthStyle'; // Import external styles
import colors from '../constants/colors';


const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = () => {
    if (email && password) {
      router.replace('/home');
    } else {
      alert('Please enter your email and password');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Sign in to continue your Dwellify experience</Text>

      <View style={styles.card}>
        <TextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          theme={{ colors: { primary: colors.primary } }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          theme={{ colors: { primary: colors.primary } }}
        />

        <Button
          mode="contained"
          onPress={handleSignIn}
          style={styles.signInButton}
          contentStyle={styles.buttonContent}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </Button>
      </View>

      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
