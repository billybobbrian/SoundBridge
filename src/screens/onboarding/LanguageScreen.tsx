import React, { useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Animated, Easing, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { languages } from '../../data/mockData';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppState } from '../../state/AppStateContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;

const languageCodes: Record<string, string> = {
  Spanish: 'ES',
  Chinese: 'ZH',
  Korean: 'KO',
  Portuguese: 'PT',
  French: 'FR',
  Japanese: 'JA',
};

function SpanishDemoGlow({ children }: { children: React.ReactNode }) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  const shadowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.98] });
  const shadowRadius = pulse.interpolate({ inputRange: [0, 1], outputRange: [5, 18] });

  return (
    <Animated.View
      style={[
        styles.demoGlowOuter,
        {
          shadowOpacity,
          shadowRadius,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

export function LanguageScreen({ navigation }: Props) {
  const {
    state: {
      onboarding: { language },
    },
    setLanguage,
  } = useAppState();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.iconTile}>
          <Ionicons name="globe-outline" size={34} color="#6E5BE3" />
        </View>

        <Text style={styles.title}>Select Your{'\n'}Target Language</Text>
        <Text style={styles.subtitle}>Choose the language you want to learn</Text>
        {language !== 'Spanish' ? (
          <Text style={styles.demoHint}>For this demo, tap Spanish below.</Text>
        ) : null}

        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={20} color="#7A7891" />
          <Text style={styles.searchText}>Search languages...</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.listWrap}>
          {languages.map((item) => {
            const selected = item === language;
            const showSpanishDemoGlow = item === 'Spanish' && language !== 'Spanish';

            const row = (
              <Pressable
                style={[styles.option, selected && styles.optionSelected]}
                onPress={() => setLanguage(item)}
              >
                <View style={styles.codePill}>
                  <Text style={styles.codeText}>{languageCodes[item] ?? 'LG'}</Text>
                </View>
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            );

            return (
              <View key={item} style={styles.optionRowWrap}>
                {showSpanishDemoGlow ? <SpanishDemoGlow>{row}</SpanishDemoGlow> : row}
              </View>
            );
          })}
        </View>

        <Pressable
          style={[styles.buttonBase, language ? styles.buttonEnabled : styles.buttonDisabled]}
          disabled={!language}
          onPress={() => navigation.navigate('Region')}
        >
          <Text style={[styles.buttonText, language ? styles.buttonTextEnabled : styles.buttonTextDisabled]}>
            Next
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <View style={styles.spacer} />
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          <View style={styles.spacer} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F111A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 12,
    alignItems: 'center',
  },
  iconTile: {
    width: 76,
    height: 76,
    borderRadius: 18,
    backgroundColor: '#1D2232',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 14,
  },
  title: {
    textAlign: 'center',
    fontSize: 21,
    lineHeight: 25,
    fontWeight: '800',
    color: '#F3F5FF',
    marginBottom: 6,
  },
  subtitle: {
    color: '#A5ADC6',
    fontSize: 15,
    marginBottom: 6,
    textAlign: 'center',
  },
  demoHint: {
    color: '#F08D31',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchRow: {
    width: '100%',
    borderRadius: 14,
    backgroundColor: '#1A2030',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchText: {
    color: '#9EA7C1',
    fontSize: 16,
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2A3145',
    marginTop: 8,
    marginBottom: 8,
  },
  listWrap: {
    width: '100%',
    gap: 8,
    flex: 1,
  },
  optionRowWrap: {
    width: '100%',
  },
  demoGlowOuter: {
    width: '100%',
    borderRadius: 18,
    shadowColor: '#F08D31',
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  option: {
    width: '100%',
    backgroundColor: '#171C2A',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#2A3145',
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  optionSelected: {
    borderColor: '#7A6CFF',
    shadowColor: '#7A6CFF',
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  codePill: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#232A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    color: '#C1C8DF',
    fontWeight: '700',
    fontSize: 14,
  },
  optionText: {
    color: '#F3F5FF',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonBase: {
    marginTop: 10,
    width: '100%',
    borderRadius: 19,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#7A6CFF',
  },
  buttonDisabled: {
    backgroundColor: '#4B4869',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  buttonTextEnabled: {
    color: '#FFFFFF',
  },
  buttonTextDisabled: {
    color: '#CBC5E4',
  },
  footer: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacer: {
    width: 48,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3D4562',
  },
  dotActive: {
    width: 30,
    borderRadius: 8,
    backgroundColor: '#7A6CFF',
  },
});
