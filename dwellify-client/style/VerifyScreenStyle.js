import { StyleSheet, Dimensions, Platform } from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: 6,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: colors.card,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 8,
  },
  divider: {
    marginVertical: 20,
    backgroundColor: colors.border,
  },
  otpLabel: {
    marginBottom: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default styles;
