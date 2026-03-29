import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Song } from '../../data/mockData';
import { theme } from '../../theme/theme';

export function SongCard({ song }: { song: Song }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.subtitle}>{song.artist}</Text>
      </View>
      <Text style={styles.duration}>{song.duration}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  duration: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
});
