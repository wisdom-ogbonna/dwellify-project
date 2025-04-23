import { StyleSheet } from 'react-native';
import colors from '../constants/colors'; // Import colors

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background, // Soft Gray background
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 50,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: colors.card, // White card for inputs
    borderRadius: 10, // Rounded corners for inputs
    borderColor: colors.border, // Light gray border
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
  },
  button: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.primary, // Vibrant Blue for the button
    borderRadius: 10,
    paddingVertical: 12,
    elevation: 2, // Slight shadow effect
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: colors.textSecondary, // Subtle gray for text
    fontWeight: '500',
    fontSize: 14,
  },
  socialButton: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 10,
    paddingVertical: 12,
    borderColor: colors.border, // Light gray border for social buttons
    borderWidth: 1,
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary, // Subtle gray for footer text
    fontSize: 14,
  },
  link: {
    color: colors.primary, // Vibrant blue for the link
    fontWeight: '600',
    fontSize: 14,
  },
});

export default styles;
