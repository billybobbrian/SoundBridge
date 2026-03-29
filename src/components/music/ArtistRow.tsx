import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Artist } from '../../data/mockData';
import { theme } from '../../theme/theme';

export function ArtistRow({ artist }: { artist: Artist }) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar} />
      <View>
        <Text style={styles.name}>{artist.name}</Text>
        <Text style={styles.meta}>{artist.subtitle ?? artist.monthlyListeners ?? ''}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accentSoft,
  },
  name: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
});
