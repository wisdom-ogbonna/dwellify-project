import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Centralized color palette for consistency
const colors = {
  background: '#F9FAFB',
  primary: '#007AFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  white: '#FFFFFF',
  shadow: 'rgba(0, 122, 255, 0.3)',
};

const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  image: {
    width: width * 0.7,
    height: height * 0.35,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 28,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 5,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  skipButton: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default onboardingStyles;
