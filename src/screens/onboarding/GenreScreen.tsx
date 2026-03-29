import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppState } from '../../state/AppStateContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Genre'>;

const popularGenres = ['Reggaeton', 'Latin Pop', 'Bachata', 'Salsa'];
const moreGenres = ['Rap', 'Indie Pop', 'Rock', 'Alternative', 'R&B', 'Electronic'];

export function GenreScreen({ navigation }: Props) {
  const {
    state: {
      onboarding: { genres },
    },
    toggleGenre,
  } = useAppState();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <Pressable style={styles.backArrowButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#A5ADC6" />
          </Pressable>
        </View>

        <View style={styles.iconTile}>
          <Ionicons name="musical-note-outline" size={34} color="#6E5BE3" />
        </View>

        <Text style={styles.title}>Pick Your Genres</Text>
        <Text style={styles.subtitle}>Select genres to personalize your experience</Text>

        <Text style={styles.sectionLabel}>POPULAR GENRES</Text>
        <View style={styles.chipsWrap}>
          {popularGenres.map((item) => {
            const selected = genres.includes(item);
            return (
              <Pressable
                key={item}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => toggleGenre(item)}
              >
                {selected ? (
                  <Ionicons name="checkmark" size={14} color="#6E5BE3" />
                ) : (
                  <Text style={styles.plus}>+</Text>
                )}
                <Text style={styles.chipText}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.sectionLabel, styles.moreGenresLabel]}>MORE GENRES</Text>
        <View style={styles.chipsWrap}>
          {moreGenres.map((item) => {
            const selected = genres.includes(item);
            return (
              <Pressable
                key={item}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => toggleGenre(item)}
              >
                {selected ? (
                  <Ionicons name="checkmark" size={14} color="#6E5BE3" />
                ) : (
                  <Text style={styles.plus}>+</Text>
                )}
                <Text style={styles.chipText}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[styles.buttonBase, genres.length > 0 ? styles.buttonEnabled : styles.buttonDisabled]}
            disabled={genres.length === 0}
            onPress={() => navigation.navigate('LoadingSongs')}
          >
            <Text style={[styles.buttonText, genres.length > 0 ? styles.buttonTextEnabled : styles.buttonTextDisabled]}>
              Next
            </Text>
          </Pressable>

          <View style={styles.footer}>
            <View style={styles.dots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
            </View>
          </View>
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
    paddingTop: 6,
    paddingBottom: 12,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    alignItems: 'flex-start',
  },
  backArrowButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#F3F5FF',
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#A5ADC6',
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionLabel: {
    width: '100%',
    color: '#A5ADC6',
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 8,
  },
  moreGenresLabel: {
    marginTop: 12,
  },
  chipsWrap: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#171C2A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A3145',
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chipSelected: {
    borderColor: '#7A6CFF',
    backgroundColor: '#1C2040',
  },
  plus: {
    color: '#D7DEEF',
    fontSize: 12,
    fontWeight: '700',
  },
  chipText: {
    color: '#F3F5FF',
    fontSize: 16,
    fontWeight: '500',
  },
  actions: {
    width: '100%',
    marginTop: 'auto',
  },
  buttonBase: {
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
    alignItems: 'center',
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
