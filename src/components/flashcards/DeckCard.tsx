import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Deck } from '../../data/mockData';
import { theme } from '../../theme/theme';

export function DeckCard({ deck }: { deck: Deck }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.pair}>{deck.languagePair}</Text>
      <Text style={styles.due}>{deck.dueToday} cards due today</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  pair: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  due: {
    color: theme.colors.success,
    marginTop: theme.spacing.sm,
    fontWeight: '700',
  },
});
