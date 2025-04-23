import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import styles from '../style/SignupAuthStyle'; // Import styles
import colors from '../constants/colors'; // Import colors

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      
      <TextInput
        label="Full Name"
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon name="account" />}
        placeholder="Enter your full name"
        placeholderTextColor={colors.textSecondary}
      />
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon name="email" />}
        placeholder="Enter your email"
        placeholderTextColor={colors.textSecondary}
      />
      <TextInput
        label="Password"
        mode="outlined"
        style={styles.input}
        secureTextEntry
        left={<TextInput.Icon name="lock" />}
        placeholder="Create a password"
        placeholderTextColor={colors.textSecondary}
      />

      <Button mode="contained" style={styles.button}>
        Sign Up
      </Button>

      <Text style={styles.orText}>OR</Text>
      
      <Button mode="outlined" icon="google" style={styles.socialButton}>
        Sign Up with Google
      </Button>
      <Button mode="outlined" icon="facebook" style={styles.socialButton}>
        Sign Up with Facebook
      </Button>

      <Text style={styles.footerText}>
        Already have an account? 
        <TouchableOpacity>
          <Text style={styles.link}> Login</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
