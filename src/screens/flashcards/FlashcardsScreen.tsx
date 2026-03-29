import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { flashcardMastery } from '../../data/mockData';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppState } from '../../state/AppStateContext';

type FlashcardsNav = NativeStackNavigationProp<RootStackParamList>;

export function FlashcardsScreen() {
  const navigation = useNavigation<FlashcardsNav>();
  const {
    state: {
      onboarding: { language },
      vocabDecks,
    },
  } = useAppState();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Flashcards</Text>
          <View style={styles.languagePill}>
            <Text style={styles.languageText}>{language ?? 'Spanish'}</Text>
            <Ionicons name="chevron-down" size={14} color="#EFEAFF" />
          </View>
        </View>

        <View style={styles.masteryCard}>
          <View>
            <Text style={styles.masteryLabel}>Overall Mastery</Text>
            <Text style={styles.masteryPercent}>{flashcardMastery.masteryPercent}%</Text>
            <View style={styles.masteryStatsRow}>
              <Text style={styles.masteryStatPrimary}>{flashcardMastery.totalCards} total cards</Text>
              <Text style={styles.masteryStatAccent}>{flashcardMastery.masteredCards} mastered</Text>
            </View>
          </View>
          <View style={styles.masteryIconCircle}>
            <Ionicons name="layers-outline" size={30} color="#6E5BE3" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>YOUR DECKS</Text>

        {vocabDecks.map((deck) => {
          const total = deck.total ?? 24;
          const progress = Math.max(0, Math.min(1, deck.dueToday / total));
          const iconName =
            deck.icon === 'bolt' ? 'flash-outline' : deck.icon === 'chatbubble' ? 'chatbubble-outline' : 'book-outline';

          return (
            <Pressable
              key={deck.id}
              style={styles.deckRow}
              onPress={() =>
                navigation.navigate('FlashcardStudy', {
                  deckId: deck.id,
                  deckTitle: deck.title,
                })
              }
            >
              <View style={styles.deckIcon}>
                <Ionicons name={iconName} size={20} color="#6E5BE3" />
              </View>
              <View style={styles.deckBody}>
                <View style={styles.deckTopRow}>
                  <Text style={styles.deckTitle}>{deck.title}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#807D93" />
                </View>
                <View style={styles.deckProgressTrack}>
                  <View style={[styles.deckProgressFill, { width: `${Math.round(progress * 100)}%` }]} />
                </View>
              </View>
              <Text style={styles.deckCount}>
                {deck.dueToday}/{total}
              </Text>
            </Pressable>
          );
        })}

        <Pressable style={styles.createDeckButton}>
          <Ionicons name="add" size={20} color="#6E5BE3" />
          <Text style={styles.createDeckText}>Create New Deck</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F111A',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    color: '#F3F5FF',
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
  },
  languagePill: {
    backgroundColor: '#3A3368',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  languageText: {
    color: '#F3F5FF',
    fontSize: 15,
    fontWeight: '600',
  },
  masteryCard: {
    backgroundColor: '#171C2A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A3145',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masteryLabel: {
    color: '#A5ADC6',
    fontSize: 15,
  },
  masteryPercent: {
    color: '#F3F5FF',
    fontSize: 48 / 2,
    fontWeight: '800',
    marginTop: 2,
  },
  masteryStatsRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 14,
  },
  masteryStatPrimary: {
    color: '#F3F5FF',
    fontSize: 16,
    fontWeight: '600',
  },
  masteryStatAccent: {
    color: '#9B8EFF',
    fontSize: 16,
    fontWeight: '700',
  },
  masteryIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: '#7A6CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#A5ADC6',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginTop: 6,
  },
  deckRow: {
    backgroundColor: '#171C2A',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2A3145',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deckIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#232A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckBody: {
    flex: 1,
  },
  deckTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deckTitle: {
    color: '#F3F5FF',
    fontSize: 33 / 2,
    fontWeight: '700',
  },
  deckProgressTrack: {
    marginTop: 10,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#2A3145',
    overflow: 'hidden',
  },
  deckProgressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#7A6CFF',
  },
  deckCount: {
    color: '#A5ADC6',
    fontSize: 14,
    marginTop: 22,
  },
  createDeckButton: {
    marginTop: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#3A4260',
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createDeckText: {
    color: '#9B8EFF',
    fontSize: 33 / 2,
    fontWeight: '600',
  },
});
