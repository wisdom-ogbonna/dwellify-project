import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: colors.background,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  input: {
    marginBottom: 16,
    backgroundColor: colors.card,
  },
  signInButton: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  buttonContent: {
    paddingVertical: 10,
  },
  signInButtonText: {
    color: colors.card,
    fontSize: 16,
  },
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  signUpLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
