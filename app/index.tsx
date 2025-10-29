import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SplashScreen() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (!navigationState?.key || hasNavigated) return;

    const timer = setTimeout(() => {
      setHasNavigated(true);
      router.push('/welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigationState?.key, hasNavigated]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logo}>
          <MaterialCommunityIcons name="clipboard-text" size={64} color="#007AFF" />
        </View>
        <Text style={styles.appName}>Survey</Text>
        <Text style={styles.tagline}>Your voice matters</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 42,
    fontWeight: '700',
    color: '#007AFF',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 17,
    fontWeight: '400',
    color: '#4A5568',
    letterSpacing: 0.2,
  },
});
