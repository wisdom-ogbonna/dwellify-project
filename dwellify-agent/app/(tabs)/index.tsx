import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Snackbar, useTheme, Card } from 'react-native-paper';

const API_BASE = 'https://dwellify-project-backend.onrender.com/api/auth';

const VerifyScreen = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [codeSent, setCodeSent] = useState(false); // New state to control visibility

  const theme = useTheme();

  const handleSendCode = async () => {
    if (!phone.startsWith('+')) {
      setMessage('Phone number must start with + and country code');
      setVisible(true);
      return;
    }

    setLoadingSend(true);
    try {
      const res = await fetch(`${API_BASE}/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      setMessage(data.message || 'Code sent');
      setCodeSent(true); // Show verify section
    } catch (error) {
      setMessage('Error sending code');
    } finally {
      setVisible(true);
      setLoadingSend(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoadingVerify(true);
    try {
      const res = await fetch(`${API_BASE}/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      setMessage(data.message || 'Verification success');
    } catch (error) {
      setMessage('Error verifying code');
    } finally {
      setVisible(true);
      setLoadingVerify(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            📱 Phone Verification
          </Text>

          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+12345678900"
            style={styles.input}
            mode="outlined"
            left={<TextInput.Icon icon="phone" />}
          />

          <Button
            mode="contained"
            onPress={handleSendCode}
            loading={loadingSend}
            style={styles.button}
          >
            Send Code
          </Button>

          {codeSent && (
            <>
              <TextInput
                label="Verification Code"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                placeholder="Enter 6-digit code"
                style={styles.input}
                mode="outlined"
                left={<TextInput.Icon icon="shield-key" />}
              />

              <Button
                mode="contained"
                onPress={handleVerifyCode}
                loading={loadingVerify}
                style={styles.button}
              >
                Verify Code
              </Button>
            </>
          )}
        </Card.Content>
      </Card>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={{ backgroundColor: theme.colors.primary }}
      >
        {message}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1F5',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    elevation: 4,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    borderRadius: 12,
    paddingVertical: 6,
  },
});
