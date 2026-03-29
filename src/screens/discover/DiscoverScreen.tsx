import React, { useEffect, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { discoverAlbums, featuredSong, recommendedArtists, recommendedSongs } from '../../data/mockData';
import { useAppState } from '../../state/AppStateContext';

function SongOfDayCardGlow({ children }: { children: React.ReactNode }) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  const shadowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.42, 0.92] });
  const shadowRadius = pulse.interpolate({ inputRange: [0, 1], outputRange: [10, 28] });

  return (
    <Animated.View
      style={[
        styles.songOfDayCardGlow,
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

export function DiscoverScreen() {
  const navigation = useNavigation<any>();
  const {
    state: {
      onboarding: { language },
      player: { activeTrack },
    },
    startTrack,
  } = useAppState();

  const showSongOfDayDemoHint = activeTrack?.id !== featuredSong.id;

  const playSongOfDay = () => {
    startTrack(featuredSong.id, 'Song of the Day');
    const rootNav = navigation.getParent();
    if (rootNav?.navigate) {
      rootNav.navigate('LiveLyrics');
      return;
    }
    navigation.navigate('LiveLyrics');
  };

  const heroCard = (
    <Pressable
      style={({ pressed }) => [styles.heroCard, pressed && styles.heroCardPressed]}
      onPress={playSongOfDay}
    >
      {featuredSong.coverUrl ? (
        <ImageBackground source={{ uri: featuredSong.coverUrl }} style={styles.heroImage} resizeMode="cover">
          <View style={styles.heroImageOverlay} />
        </ImageBackground>
      ) : null}
      <View style={styles.heroOverlay}>
        <Text style={styles.songOfDay}>SONG OF THE DAY</Text>
        <Text style={styles.heroTitle}>{featuredSong.title}</Text>
        <Text style={styles.heroArtist}>{featuredSong.artist}</Text>
      </View>
      <View style={styles.playButtonDecor}>
        <Ionicons name="play" size={18} color="#FFFFFF" />
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Discover</Text>
          <View style={styles.headerActions}>
            <View style={styles.languagePill}>
              <Text style={styles.languageText}>{language ?? 'Spanish'}</Text>
              <Ionicons name="chevron-down" size={14} color="#EFEAFF" />
            </View>
            <Pressable style={styles.searchButton}>
              <Ionicons name="search-outline" size={19} color="#A5ADC6" />
            </Pressable>
          </View>
        </View>

        {showSongOfDayDemoHint ? <SongOfDayCardGlow>{heroCard}</SongOfDayCardGlow> : heroCard}

        {showSongOfDayDemoHint ? (
          <Text style={styles.demoHintText}>Tap anywhere on Song of the Day to play the demo.</Text>
        ) : null}

        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionTitle}>Albums For You</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {discoverAlbums.map((album) => (
            <View key={album.id} style={styles.albumContainer}>
              <View style={[styles.albumArt, { backgroundColor: album.accentColor }]}>
                {album.coverUrl ? (
                  <Image source={{ uri: album.coverUrl }} style={styles.albumCoverImage} resizeMode="cover" />
                ) : null}
                <View style={styles.albumPlayButton}>
                  <Ionicons name="play" size={18} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.albumTitle}>{album.title}</Text>
              <Text style={styles.albumArtist}>{album.artist}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionTitle}>Recommended Artists</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        {recommendedArtists.map((artist) => (
          <View key={artist.id} style={styles.artistCard}>
            <View style={styles.artistLeft}>
              <View style={styles.artistAvatar}>
                {artist.avatarUrl ? (
                  <Image source={{ uri: artist.avatarUrl }} style={styles.artistAvatarImage} resizeMode="cover" />
                ) : null}
              </View>
              <View style={styles.artistTextBlock}>
                <Text style={styles.artistName}>{artist.name}</Text>
                <Text style={styles.artistMeta}>{artist.subtitle}</Text>
              </View>
            </View>
            <Pressable style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </Pressable>
          </View>
        ))}

        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionTitle}>Recommended Songs</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.songCardsRow}>
          {recommendedSongs.map((song) => (
            <View key={song.id} style={styles.songCard}>
              {song.coverUrl ? (
                <Image source={{ uri: song.coverUrl }} style={styles.songCardImage} resizeMode="cover" />
              ) : null}
              <View style={styles.songCardShade} />
              <View style={styles.songCardTextWrap}>
                <Text style={styles.songCardTitle}>{song.title.toUpperCase()}</Text>
                <Text style={styles.songCardArtist}>{song.artist.toUpperCase()}</Text>
              </View>
              <View style={styles.songCardPlayButtonDisabled}>
                <Ionicons name="play" size={18} color="#FFFFFF" />
              </View>
            </View>
          ))}
        </ScrollView>
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
    paddingBottom: 22,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#F3F5FF',
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  searchButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1A2030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    height: 210,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#171C2A',
    justifyContent: 'flex-end',
    padding: 16,
  },
  heroCardPressed: {
    opacity: 0.94,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000055',
  },
  heroOverlay: {
    gap: 4,
  },
  songOfDay: {
    color: '#E9E8EE',
    fontSize: 13,
    letterSpacing: 0.8,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 37 / 2,
    fontWeight: '700',
  },
  heroArtist: {
    color: '#E9E8EE',
    fontSize: 15,
  },
  songOfDayCardGlow: {
    width: '100%',
    borderRadius: 22,
    shadowColor: '#F08D31',
    shadowOffset: { width: 0, height: 0 },
    elevation: 18,
  },
  demoHintText: {
    color: '#9EA7C1',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: -6,
    marginBottom: 2,
  },
  playButtonDecor: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F66B5D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeadingRow: {
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
  seeAll: {
    color: '#9B8EFF',
    fontSize: 16,
    fontWeight: '600',
  },
  horizontalRow: {
    gap: 12,
    paddingRight: 6,
  },
  albumContainer: {
    width: 158,
  },
  albumArt: {
    height: 158,
    borderRadius: 18,
    overflow: 'hidden',
  },
  albumCoverImage: {
    ...StyleSheet.absoluteFillObject,
  },
  albumPlayButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F66B5D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumTitle: {
    marginTop: 8,
    color: '#F3F5FF',
    fontSize: 16,
    fontWeight: '600',
  },
  albumArtist: {
    color: '#A5ADC6',
    fontSize: 14,
    marginTop: 2,
  },
  artistCard: {
    backgroundColor: '#171C2A',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2A3145',
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  artistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  artistTextBlock: {
    flex: 1,
    paddingRight: 8,
  },
  artistAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#7D6DE8',
    overflow: 'hidden',
  },
  artistAvatarImage: {
    width: '100%',
    height: '100%',
  },
  artistName: {
    color: '#F3F5FF',
    fontSize: 31 / 2,
    fontWeight: '700',
  },
  artistMeta: {
    color: '#A5ADC6',
    fontSize: 14,
    lineHeight: 19,
    marginTop: 3,
  },
  followButton: {
    backgroundColor: '#7A6CFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 9,
    minWidth: 78,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  followText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  songCardsRow: {
    gap: 12,
    paddingRight: 10,
    paddingBottom: 4,
  },
  songCard: {
    width: 190,
    height: 185,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3A4260',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: '#1C2335',
  },
  songCardImage: {
    ...StyleSheet.absoluteFillObject,
  },
  songCardShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000066',
  },
  songCardTextWrap: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  songCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  songCardArtist: {
    marginTop: 2,
    color: '#DDE2F7',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  songCardPlayButtonDisabled: {
    position: 'absolute',
    right: 10,
    bottom: 12,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F66B5D',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.38,
  },
});
