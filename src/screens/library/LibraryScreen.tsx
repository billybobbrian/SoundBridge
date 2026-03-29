import React, { useMemo, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../../state/AppStateContext';

export function LibraryScreen() {
  const {
    state: {
      onboarding: { language },
      likedSongs,
      listeningHistory,
      playlists,
    },
  } = useAppState();
  const [likedExpanded, setLikedExpanded] = useState(false);
  const [likedStatus, setLikedStatus] = useState<Record<string, boolean>>(
    Object.fromEntries(likedSongs.map((song) => [song.id, true])),
  );
  const likedCount = useMemo(
    () => likedSongs.filter((song) => likedStatus[song.id] !== false).length,
    [likedSongs, likedStatus],
  );

  const toggleLiked = (songId: string) => {
    setLikedStatus((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Library</Text>
          <View style={styles.languagePill}>
            <Text style={styles.languageText}>{language ?? 'Spanish'}</Text>
            <Ionicons name="chevron-down" size={14} color="#EFEAFF" />
          </View>
        </View>

        <Pressable style={styles.likedCard} onPress={() => setLikedExpanded((prev) => !prev)}>
          <View style={styles.iconPill}>
            <Ionicons name="heart" size={18} color="#6E5BE3" />
          </View>
          <View style={styles.likedTextWrap}>
            <Text style={styles.likedTitle}>Liked Songs</Text>
            <Text style={styles.likedMeta}>{likedCount} songs</Text>
          </View>
          <Ionicons name={likedExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="#A5ADC6" />
        </Pressable>

        {likedExpanded ? (
          <View style={styles.likedDropdown}>
            {likedSongs.map((song) => (
              <View key={song.id} style={styles.likedSongRow}>
                <View style={styles.historyIcon}>
                  {song.coverUrl ? (
                    <Image source={{ uri: song.coverUrl }} style={styles.songThumbImage} resizeMode="cover" />
                  ) : (
                    <Ionicons name="musical-note-outline" size={18} color="#A5ADC6" />
                  )}
                </View>
                <View style={styles.historyTextWrap}>
                  <Text style={styles.historyTitle}>{song.title}</Text>
                  <Text style={styles.historyArtist}>{song.artist}</Text>
                </View>
                <View style={styles.songRowActions}>
                  <Text style={styles.historyTime}>{song.duration}</Text>
                  <Pressable onPress={() => toggleLiked(song.id)} hitSlop={8}>
                    <Ionicons
                      name={likedStatus[song.id] ? 'heart' : 'heart-outline'}
                      size={18}
                      color={likedStatus[song.id] ? '#FF5D6E' : '#A5ADC6'}
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.sectionHeader}>
          <Ionicons name="time-outline" size={22} color="#A5ADC6" />
          <Text style={styles.sectionTitle}>History</Text>
        </View>

        {listeningHistory.map((song) => (
          <View key={song.id} style={styles.historyRow}>
            <View style={styles.historyIcon}>
              {song.coverUrl ? (
                <Image source={{ uri: song.coverUrl }} style={styles.songThumbImage} resizeMode="cover" />
              ) : (
                <Ionicons name="musical-note-outline" size={18} color="#A5ADC6" />
              )}
            </View>
            <View style={styles.historyTextWrap}>
              <Text style={styles.historyTitle}>{song.title}</Text>
              <Text style={styles.historyArtist}>{song.artist}</Text>
            </View>
            <Text style={styles.historyTime}>{song.playedAt ?? 'now'}</Text>
          </View>
        ))}

        <Pressable style={styles.viewAllLink}>
          <Text style={styles.viewAllText}>View all history</Text>
          <Ionicons name="chevron-forward" size={16} color="#6E5BE3" />
        </Pressable>

        <View style={styles.sectionHeaderRowBetween}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list-outline" size={22} color="#A5ADC6" />
            <Text style={styles.sectionTitle}>Playlists</Text>
          </View>
          <Pressable style={styles.newPill}>
            <Ionicons name="add" size={16} color="#6E5BE3" />
            <Text style={styles.newPillText}>New</Text>
          </Pressable>
        </View>

        {playlists.map((playlist) => (
          <View key={playlist.id} style={styles.playlistRow}>
            <View style={styles.iconPill}>
              {playlist.coverUrl ? (
                <Image source={{ uri: playlist.coverUrl }} style={styles.songThumbImage} resizeMode="cover" />
              ) : (
                <Ionicons name="list-outline" size={18} color="#6E5BE3" />
              )}
            </View>
            <View style={styles.playlistTextWrap}>
              <Text style={styles.playlistTitle}>{playlist.title}</Text>
              <Text style={styles.playlistMeta}>{playlist.trackCount} songs</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A5ADC6" />
          </View>
        ))}
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
    paddingBottom: 20,
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
  likedCard: {
    backgroundColor: '#171C2A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A3145',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  likedDropdown: {
    marginTop: -4,
    backgroundColor: '#171C2A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A3145',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  likedSongRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  songRowActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconPill: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#232A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likedTextWrap: {
    flex: 1,
  },
  likedTitle: {
    color: '#F3F5FF',
    fontSize: 33 / 2,
    fontWeight: '700',
  },
  likedMeta: {
    color: '#A5ADC6',
    marginTop: 2,
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionHeaderRowBetween: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#F3F5FF',
    fontSize: 34 / 2,
    fontWeight: '700',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#232A3D',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  songThumbImage: {
    width: '100%',
    height: '100%',
  },
  historyTextWrap: {
    flex: 1,
  },
  historyTitle: {
    color: '#F3F5FF',
    fontSize: 33 / 2,
    fontWeight: '600',
  },
  historyArtist: {
    color: '#A5ADC6',
    marginTop: 2,
    fontSize: 15,
  },
  historyTime: {
    color: '#A5ADC6',
    fontSize: 14,
  },
  viewAllLink: {
    alignSelf: 'center',
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: '#9B8EFF',
    fontSize: 16,
    fontWeight: '500',
  },
  newPill: {
    borderRadius: 18,
    backgroundColor: '#232A3D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  newPillText: {
    color: '#9B8EFF',
    fontSize: 16,
    fontWeight: '600',
  },
  playlistRow: {
    backgroundColor: '#171C2A',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2A3145',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playlistTextWrap: {
    flex: 1,
  },
  playlistTitle: {
    color: '#F3F5FF',
    fontSize: 33 / 2,
    fontWeight: '700',
  },
  playlistMeta: {
    color: '#A5ADC6',
    marginTop: 2,
    fontSize: 15,
  },
});
