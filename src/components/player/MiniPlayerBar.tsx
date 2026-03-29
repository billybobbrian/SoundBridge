import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import { useAppState } from '../../state/AppStateContext';

function formatSeconds(totalSec: number) {
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function MiniPlayerBar() {
  const navigation = useNavigation<any>();
  const {
    state: { player },
    togglePlayback,
  } = useAppState();

  if (!player.activeTrack) return null;
  const progress = Math.min(1, Math.max(0, player.positionSec / player.activeTrack.durationSec));
  const ringSize = 50;
  const ringStroke = 2.5;
  const ringRadius = (ringSize - ringStroke) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - progress);

  const openLyrics = () => {
    const parentNav = navigation.getParent();
    if (parentNav?.navigate) {
      parentNav.navigate('LiveLyrics');
      return;
    }
    navigation.navigate('LiveLyrics');
  };

  return (
    <View style={styles.wrapper}>
      <View pointerEvents="none" style={styles.glassLayer} />
      <View pointerEvents="none" style={styles.glassBlobLeft} />
      <View pointerEvents="none" style={styles.glassBlobRight} />
      <Pressable style={styles.leftArea} onPress={openLyrics}>
        <View style={styles.thumb}>
          {player.activeTrack.coverUrl ? (
            <Image source={{ uri: player.activeTrack.coverUrl }} style={styles.thumbImage} resizeMode="cover" />
          ) : (
            <Ionicons name="musical-note-outline" size={18} color="#CDD4EA" />
          )}
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title} numberOfLines={1}>
            {player.activeTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {player.activeTrack.artist} · {formatSeconds(player.positionSec)}
          </Text>
        </View>
      </Pressable>

      <View style={styles.playWrap}>
        <Svg width={ringSize} height={ringSize} style={styles.playRingSvg}>
          <Circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={ringRadius}
            stroke="rgba(196, 206, 238, 0.24)"
            strokeWidth={ringStroke}
            fill="none"
          />
          <Circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={ringRadius}
            stroke="#F08D31"
            strokeWidth={ringStroke}
            strokeLinecap="round"
            strokeDasharray={`${ringCircumference} ${ringCircumference}`}
            strokeDashoffset={ringOffset}
            fill="none"
            transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
          />
        </Svg>
        <Pressable style={styles.playPauseButton} onPress={togglePlayback}>
          <Ionicons name={player.isPlaying ? 'pause' : 'play'} size={22} color="#E6E9F5" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
    marginBottom: 6,
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(240, 246, 255, 0.32)',
    backgroundColor: 'rgba(28, 34, 52, 0.42)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    overflow: 'hidden',
  },
  glassLayer: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    height: 30,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  glassBlobLeft: {
    position: 'absolute',
    top: -12,
    left: 18,
    width: 110,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    transform: [{ rotate: '-8deg' }],
  },
  glassBlobRight: {
    position: 'absolute',
    bottom: -14,
    right: 26,
    width: 120,
    height: 42,
    borderRadius: 22,
    backgroundColor: 'rgba(165, 188, 255, 0.11)',
    transform: [{ rotate: '8deg' }],
  },
  leftArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  thumb: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(57, 66, 95, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#F3F5FF',
    fontSize: 16,
    fontWeight: '700',
  },
  artist: {
    color: '#A5ADC6',
    fontSize: 14,
    marginTop: 1,
  },
  playPauseButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(57, 66, 95, 0.42)',
  },
  playWrap: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playRingSvg: {
    position: 'absolute',
  },
});
