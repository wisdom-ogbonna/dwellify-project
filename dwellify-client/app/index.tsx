import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useRouter } from 'expo-router';
import onboardingStyles from '../style/HomeScreenStyles';

const onboardingData = [
  {
    title: 'Welcome to Dwellify',
    description: 'Find homes, agents, and services around Choba & Port Harcourt with ease.',
    image: require('../assets/images/onboarding1.png'),
  },
  {
    title: 'Report ICE Raids Fast',
    description: 'Quickly alert people nearby when there’s a raid, so they can stay safe.',
    image: require('../assets/images/onboarding2.png'),
  },
  {
    title: 'Stay Safe, Stay Notified',
    description: 'Receive instant alerts and safety updates in your area.',
    image: require('../assets/images/onboarding3.png'),
  },
];

const OnboardingScreen = () => {
  const pagerRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (pageIndex < onboardingData.length - 1) {
      pagerRef.current.setPage(pageIndex + 1);
    } else {
      router.replace('/signin');
    }
  };

  const handleSkip = () => {
    router.replace('/signin');
  };

  const onPageSelected = (e) => {
    setPageIndex(e.nativeEvent.position);
  };

  return (
    <View style={onboardingStyles.container}>
      <PagerView
        style={onboardingStyles.pagerView}
        initialPage={0}
        onPageSelected={onPageSelected}
        ref={pagerRef}
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={onboardingStyles.page}>
            <Image source={item.image} style={onboardingStyles.image} />
            <Text style={onboardingStyles.title}>{item.title}</Text>
            <Text style={onboardingStyles.description}>{item.description}</Text>
          </View>
        ))}
      </PagerView>

      <View style={onboardingStyles.dotsContainer}>
        {onboardingData.map((_, i) => (
          <View
            key={i}
            style={[
              onboardingStyles.dot,
              {
                width: pageIndex === i ? 24 : 10,
                backgroundColor: pageIndex === i ? '#007AFF' : '#E5E7EB',
              },
            ]}
          />
        ))}
      </View>

      <View style={onboardingStyles.navContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={onboardingStyles.skipButton}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={onboardingStyles.nextButton}>
          <Text style={onboardingStyles.nextButtonText}>
            {pageIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
