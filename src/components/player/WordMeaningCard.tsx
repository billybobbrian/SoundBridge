import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { WordMeaning } from '../../data/mockData';

type DeckOption = {
  id: string;
  title: string;
};

type Props = {
  wordMeaning: WordMeaning;
  selectedDeckTitle: string;
  deckOptions: DeckOption[];
  isDeckPickerOpen: boolean;
  onToggleDeckPicker: () => void;
  onSelectDeck: (deckId: string) => void;
  onClose: () => void;
  onAddToFlashcards: () => void;
};

export function WordMeaningCard({
  wordMeaning,
  selectedDeckTitle,
  deckOptions,
  isDeckPickerOpen,
  onToggleDeckPicker,
  onSelectDeck,
  onClose,
  onAddToFlashcards,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.word}>{wordMeaning.word}</Text>
        <Pressable onPress={onClose} hitSlop={8}>
          <Ionicons name="close" size={30} color="#7A8198" />
        </Pressable>
      </View>

      <Text style={styles.meaning}>{wordMeaning.meaning}</Text>

      <Pressable style={styles.addButton} onPress={onAddToFlashcards}>
        <Ionicons name="add" size={24} color="#6E5BE3" />
        <Text style={styles.addText}>Add to '{selectedDeckTitle}'</Text>
      </Pressable>

      <Pressable style={styles.chooseDeckButton} onPress={onToggleDeckPicker}>
        <Text style={styles.chooseDeckText}>Choose other deck</Text>
        <Ionicons name={isDeckPickerOpen ? 'chevron-up' : 'chevron-down'} size={18} color="#A5ADC6" />
      </Pressable>

      {isDeckPickerOpen ? (
        <View style={styles.deckList}>
          {deckOptions.map((deck) => {
            const selected = deck.title === selectedDeckTitle;
            return (
              <Pressable key={deck.id} style={styles.deckRow} onPress={() => onSelectDeck(deck.id)}>
                <Text style={[styles.deckRowText, selected && styles.deckRowTextSelected]}>{deck.title}</Text>
                {selected ? <Ionicons name="checkmark-circle" size={20} color="#9B8EFF" /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171C2A',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#2A3145',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 22,
    gap: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  word: {
    color: '#F3F5FF',
    fontSize: 43 / 2,
    fontWeight: '700',
  },
  meaning: {
    color: '#A5ADC6',
    fontSize: 42 / 2,
    lineHeight: 26,
  },
  addButton: {
    backgroundColor: '#232A3D',
    borderRadius: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addText: {
    color: '#9B8EFF',
    fontWeight: '700',
    fontSize: 18 * 2 / 2,
  },
  chooseDeckButton: {
    borderWidth: 1,
    borderColor: '#2A3145',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chooseDeckText: {
    color: '#CDD4EA',
    fontWeight: '600',
    fontSize: 15,
  },
  deckList: {
    marginTop: -2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A3145',
    overflow: 'hidden',
  },
  deckRow: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: '#1B2130',
    borderBottomWidth: 1,
    borderBottomColor: '#2A3145',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deckRowText: {
    color: '#A5ADC6',
    fontSize: 15,
    fontWeight: '600',
  },
  deckRowTextSelected: {
    color: '#F3F5FF',
  },
});
