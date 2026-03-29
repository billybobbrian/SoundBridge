import React, { useEffect, useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppState } from '../../state/AppStateContext';

type Props = NativeStackScreenProps<RootStackParamList, 'LoadingSongs'>;

export function LoadingSongsScreen({ navigation }: Props) {
  const { completeOnboarding } = useAppState();
  const [progress, setProgress] = useState(20);
  const widthPercent = useMemo(() => `${progress}%` as `${number}%`, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 1, 100);
        if (next === 100) {
          clearInterval(interval);
          setTimeout(() => {
            completeOnboarding();
            navigation.replace('MainTabs');
          }, 250);
        }
        return next;
      });
    }, 36);

    return () => clearInterval(interval);
  }, [completeOnboarding, navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.animationPlaceholder} />

        <Text style={styles.title}>Gathering Songs</Text>
        <Text style={styles.subtitle}>Finding songs in your genres...</Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: widthPercent }]} />
        </View>
        <Text style={styles.percentText}>{progress}%</Text>
      </View>

      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F111A',
    justifyContent: 'space-between',
    paddingBottom: 34,
  },
  content: {
    alignItems: 'center',
    marginTop: 130,
    paddingHorizontal: 36,
  },
  animationPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1D2232',
    marginBottom: 28,
  },
  title: {
    color: '#F3F5FF',
    fontSize: 42 / 2,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#A5ADC6',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  progressTrack: {
    width: '100%',
    height: 12,
    borderRadius: 7,
    backgroundColor: '#2A3145',
    marginTop: 26,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: '#7A6CFF',
  },
  percentText: {
    marginTop: 12,
    color: '#A5ADC6',
    fontSize: 17,
    fontWeight: '600',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3D4562',
  },
  activeDot: {
    width: 30,
    borderRadius: 8,
    backgroundColor: '#7A6CFF',
  },
});
