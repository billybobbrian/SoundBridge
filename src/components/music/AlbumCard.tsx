import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Album } from '../../data/mockData';
import { theme } from '../../theme/theme';

export function AlbumCard({ album }: { album: Album }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{album.title}</Text>
      <Text style={styles.subtitle}>{album.artist}</Text>
      <Text style={styles.meta}>{album.year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  meta: {
    marginTop: theme.spacing.sm,
    color: theme.colors.accent,
    fontWeight: '700',
  },
});
