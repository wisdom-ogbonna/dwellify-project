import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Snackbar, Card, Divider } from 'react-native-paper';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styles from '../style/VerifyScreenStyle';
import colors from '../constants/colors';

const PhoneVerificationScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', color: '' });

  const handleSendCode = () => {
    if (/^\+?\d{10,15}$/.test(phoneNumber)) {
      setCodeSent(true);
      setSnackbar({ visible: true, message: 'Verification code sent!', color: colors.success });
    } else {
      setSnackbar({ visible: true, message: 'Please enter a valid phone number.', color: colors.error });
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      setSnackbar({ visible: true, message: 'Phone verified successfully!', color: colors.success });
    } else {
      setSnackbar({ visible: true, message: 'Incorrect verification code.', color: colors.error });
    }
  };

  const handleEmailAuth = () => {
    setSnackbar({ visible: true, message: 'Email login clicked (not implemented)', color: colors.accent });
  };

  const handleGoogleAuth = () => {
    setSnackbar({ visible: true, message: 'Google login clicked (not implemented)', color: colors.accent });
  };

  const handleFacebookAuth = () => {
    setSnackbar({ visible: true, message: 'Facebook login clicked (not implemented)', color: colors.accent });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Card style={styles.card} elevation={5}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>Verify Your Account</Text>
          <Text style={styles.subtitle}>
            Choose a method to verify your identity.
          </Text>

          <TextInput
            label="Phone Number"
            placeholder="+1234567890"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
            mode="outlined"
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
          />

          <Button
            mode="contained"
            onPress={handleSendCode}
            style={styles.button}
            disabled={codeSent}
          >
            Continue with Phone
          </Button>

          {codeSent && (
            <>
              <Divider style={styles.divider} />
              <Text style={styles.otpLabel}>Enter the 6-digit code sent to your number:</Text>
              <TextInput
                label="Verification Code"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                style={styles.input}
                mode="outlined"
                outlineColor={colors.border}
                activeOutlineColor={colors.primary}
                maxLength={6}
              />
              <Button
                mode="contained"
                onPress={handleVerifyOtp}
                style={styles.button}
              >
                Verify Code
              </Button>
            </>
          )}

          <Divider style={styles.divider} />

          <Button
            mode="outlined"
            onPress={handleEmailAuth}
            style={styles.altButton}
            icon="email-outline"
            textColor={colors.textPrimary}
          >
            Continue with Email
          </Button>

          <Button
            mode="outlined"
            onPress={handleGoogleAuth}
            style={styles.altButton}
            icon={() => <MaterialCommunityIcons name="google" size={20} color={colors.textPrimary} />}
            textColor={colors.textPrimary}
          >
            Continue with Google
          </Button>

          <Button
            mode="outlined"
            onPress={handleFacebookAuth}
            style={styles.altButton}
            icon={() => <FontAwesome name="facebook" size={20} color="#1877F2" />}
            textColor={colors.textPrimary}
          >
            Continue with Facebook
          </Button>
        </Card.Content>
      </Card>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        style={{ backgroundColor: snackbar.color }}
        duration={3000}
      >
        {snackbar.message}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

export default PhoneVerificationScreen;
