import React, { useRef, useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Snackbar,
  Card,
  Divider,
} from "react-native-paper";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import styles from "../style/VerifyScreenStyle";
import colors from "../constants/colors";
import { useRouter } from "expo-router";


const PhoneVerificationScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    color: "",
  });
  const recaptchaVerifier = useRef(null);
  const [confirmation, setConfirmation] = useState(null);

  const handleSendCode = async () => {
    try {
      const confirmResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier.current
      );
      setConfirmation(confirmResult);
      setCodeSent(true);
      setSnackbar({ visible: true, message: 'Verification code sent!', color: colors.success });
    } catch (error) {
      console.error(error);
      setSnackbar({ visible: true, message: 'Failed to send code.', color: colors.error });
    }
  };
  const router = useRouter();

  

  const handleVerifyOtp = async () => {
    try {
      await confirmation.confirm(otp);
      setSnackbar({ visible: true, message: 'Phone verified!', color: colors.success });
      router.replace("/map");
    } catch (error) {
      setSnackbar({ visible: true, message: 'Invalid code.', color: colors.error });
    }
  };
  

  const handleEmailAuth = () => {
    setSnackbar({
      visible: true,
      message: "Email login clicked (not implemented)",
      color: colors.accent,
    });
  };

  const handleGoogleAuth = () => {
    setSnackbar({
      visible: true,
      message: "Google login clicked (not implemented)",
      color: colors.accent,
    });
  };

  const handleFacebookAuth = () => {
    setSnackbar({
      visible: true,
      message: "Facebook login clicked (not implemented)",
      color: colors.accent,
    });
  };




  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
          {/* ✅ MOVE THIS HERE */}
    <FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
      firebaseConfig={auth.app.options}
    />
      <Card style={styles.card} elevation={5}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Verify Your Account
          </Text>
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
              <Text style={styles.otpLabel}>
                Enter the 6-digit code sent to your number:
              </Text>
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
            icon={() => (
              <MaterialCommunityIcons
                name="google"
                size={20}
                color={colors.textPrimary}
              />
            )}
            textColor={colors.textPrimary}
          >
            Continue with Google
          </Button>

          <Button
            mode="outlined"
            onPress={handleFacebookAuth}
            style={styles.altButton}
            icon={() => (
              <FontAwesome name="facebook" size={20} color="#1877F2" />
            )}
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
