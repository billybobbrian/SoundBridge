import React, { useEffect, useMemo, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Animated,
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { phraseMeaningFromTokens, timedLyricsByTrackId, wordMeaningsByWord } from '../../data/mockData';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppState } from '../../state/AppStateContext';
import { WordMeaningCard } from '../../components/player/WordMeaningCard';

type Props = NativeStackScreenProps<RootStackParamList, 'LiveLyrics'>;

function formatSeconds(totalSec: number) {
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const phraseMeaningsByPhrase: Record<string, string> = {
  'ojitos lindos': 'pretty little eyes',
  'no me canso de ver': 'I do not get tired of looking',
  'sin ti no viviria': 'without you I would not live',
  'te quiero tener': 'I want to have you close',
  'baila conmigo': 'dance with me',
  'ojitos lindos quedate aqui': 'pretty little eyes, stay here',
};

export function LiveLyricsScreen({ navigation }: Props) {
  const {
    state: { player, vocabDecks },
    togglePlayback,
    seekTo,
    openWordMeaning,
    closeWordMeaning,
    addWordToFlashcards,
  } = useAppState();

  const track = player.activeTrack;

  const lyrics = useMemo(() => {
    if (!track) return [];
    return timedLyricsByTrackId[track.id] ?? [];
  }, [track]);

  const progress = track ? Math.min(1, player.positionSec / track.durationSec) : 0;
  const selectedWord = player.selectedWord;
  const [lyricsScrolled, setLyricsScrolled] = useState(false);
  const [selectedWordKey, setSelectedWordKey] = useState<string | null>(null);
  const [phraseSelection, setPhraseSelection] = useState<{
    lineId: string;
    anchorIdx: number;
    endIdx: number;
  } | null>(null);
  const [selectedDeckId, setSelectedDeckId] = useState<string>('');
  const [showDeckPicker, setShowDeckPicker] = useState(false);
  const [addToastMessage, setAddToastMessage] = useState<string | null>(null);
  const addToastOpacity = useState(() => new Animated.Value(0))[0];
  const addToastTranslateY = useState(() => new Animated.Value(12))[0];
  const [progressTrackWidth, setProgressTrackWidth] = useState(0);

  useEffect(() => {
    if (selectedDeckId) return;
    const beginnerDeck = vocabDecks.find((deck) => deck.title === 'Beginner Phrases');
    const fallbackDeck = vocabDecks[0];
    if (beginnerDeck) {
      setSelectedDeckId(beginnerDeck.id);
      return;
    }
    if (fallbackDeck) {
      setSelectedDeckId(fallbackDeck.id);
    }
  }, [selectedDeckId, vocabDecks]);

  const selectedDeckTitle = useMemo(() => {
    return vocabDecks.find((deck) => deck.id === selectedDeckId)?.title ?? 'Beginner Phrases';
  }, [selectedDeckId, vocabDecks]);

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const showAddToast = (deckTitle: string) => {
    setAddToastMessage(`Added to '${deckTitle}'`);
    addToastOpacity.setValue(0);
    addToastTranslateY.setValue(12);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(addToastOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(addToastTranslateY, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1150),
      Animated.parallel([
        Animated.timing(addToastOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(addToastTranslateY, {
          toValue: 8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => setAddToastMessage(null));
  };

  const seekFromPosition = (locationX: number) => {
    if (!track || progressTrackWidth <= 0) return;
    const ratio = Math.max(0, Math.min(1, locationX / progressTrackWidth));
    seekTo(Math.round(ratio * track.durationSec));
  };
  const progressThumbLeft =
    progressTrackWidth > 0 ? Math.max(0, Math.min(progressTrackWidth - 14, progressTrackWidth * progress - 7)) : 0;

  const handleCloseWordMeaning = () => {
    closeWordMeaning();
    setSelectedWordKey(null);
    setPhraseSelection(null);
    setShowDeckPicker(false);
  };

  if (!track) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>No song currently playing</Text>
          <Pressable style={styles.emptyButton} onPress={() => navigation.goBack()}>
            <Text style={styles.emptyButtonText}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
            <Ionicons name="chevron-down" size={24} color="#DDE2F7" />
          </Pressable>
          <View style={styles.playingFromWrap}>
            <Text style={styles.playingFromLabel}>PLAYING FROM</Text>
            <Text style={styles.playingFromValue}>{track.sourceLabel}</Text>
          </View>
          <Pressable hitSlop={8}>
            <Ionicons name="heart-outline" size={24} color="#DDE2F7" />
          </Pressable>
        </View>

        <Image
          source={{ uri: track.coverUrl }}
          style={[styles.coverArt, lyricsScrolled && styles.coverArtCollapsed]}
          resizeMode="cover"
        />

        {!lyricsScrolled ? (
          <>
            <Text style={styles.trackTitle}>{track.title}</Text>
            <Text style={styles.trackArtist}>{track.artist}</Text>

            <View style={styles.tapHintRow}>
              <Ionicons name="book-outline" size={16} color="#6E5BE3" />
              <Text style={styles.tapHint}>TAP WORDS TO TRANSLATE</Text>
            </View>
          </>
        ) : null}

        <ScrollView
          style={styles.lyricsArea}
          contentContainerStyle={styles.lyricsContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          directionalLockEnabled
          canCancelContentTouches
          keyboardShouldPersistTaps="handled"
          onScroll={(event) => {
            const y = event.nativeEvent.contentOffset.y;
            if (y > 24 && !lyricsScrolled) {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setLyricsScrolled(true);
            } else if (y <= 12 && lyricsScrolled) {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setLyricsScrolled(false);
            }
          }}
        >
          {lyrics.map((line) => {
            const active = player.positionSec >= line.startSec && player.positionSec < line.endSec;
            const lineEnded = player.positionSec >= line.endSec;
            const lineDuration = Math.max(0.001, line.endSec - line.startSec);
            const lineProgress = Math.max(0, Math.min(1, (player.positionSec - line.startSec) / lineDuration));
            const currentWordIndex = Math.min(line.words.length - 1, Math.floor(lineProgress * line.words.length));
            return (
              <View key={line.id} style={styles.lyricLineBlock}>
                <View style={styles.wordRow}>
                  {line.words.map((word, idx) => (
                    <Pressable
                      key={word.id}
                      delayLongPress={260}
                      onLongPress={() => {
                        setPhraseSelection({
                          lineId: line.id,
                          anchorIdx: idx,
                          endIdx: idx,
                        });
                        setSelectedWordKey(null);
                      }}
                      onPress={() => {
                        const wordKey = `${line.id}-${idx}`;

                        if (phraseSelection) {
                          const nextSelection =
                            phraseSelection.lineId === line.id
                              ? {
                                  ...phraseSelection,
                                  endIdx: idx,
                                }
                              : {
                                  lineId: line.id,
                                  anchorIdx: idx,
                                  endIdx: idx,
                                };

                          setPhraseSelection(nextSelection);
                          setSelectedWordKey(null);
                          setShowDeckPicker(false);

                          const phraseStart = Math.min(nextSelection.anchorIdx, nextSelection.endIdx);
                          const phraseEnd = Math.max(nextSelection.anchorIdx, nextSelection.endIdx);
                          const phraseText = line.words
                            .slice(phraseStart, phraseEnd + 1)
                            .map((token) => token.text)
                            .join(' ');
                          const normalizedPhrase = phraseText.toLowerCase();
                          openWordMeaning({
                            word: phraseText,
                            meaning:
                              phraseMeaningsByPhrase[normalizedPhrase] ??
                              phraseMeaningFromTokens(normalizedPhrase) ??
                              'Phrase translation coming soon',
                          });
                          return;
                        }

                        setSelectedWordKey(wordKey);
                        setShowDeckPicker(false);
                        const meaning = wordMeaningsByWord[word.normalized] ?? {
                          word: word.text.toLowerCase(),
                          meaning: 'Meaning coming soon',
                        };
                        openWordMeaning(meaning);
                      }}
                    >
                      {(() => {
                        const inPhraseSelection =
                          phraseSelection?.lineId === line.id &&
                          idx >= Math.min(phraseSelection.anchorIdx, phraseSelection.endIdx) &&
                          idx <= Math.max(phraseSelection.anchorIdx, phraseSelection.endIdx);
                        const singleWordSelected = selectedWordKey === `${line.id}-${idx}`;

                        return (
                      <Text
                        style={[
                          styles.lyricWord,
                          active && idx < currentWordIndex && styles.lyricWordSung,
                          active && idx === currentWordIndex && styles.lyricWordCurrent,
                          active && idx > currentWordIndex && styles.lyricWordUpcoming,
                          !active && lineEnded && styles.lyricWordCompleted,
                          !active && !lineEnded && styles.lyricWordDim,
                          (singleWordSelected || inPhraseSelection) && styles.lyricWordMarkerHighlight,
                        ]}
                      >
                        {word.text}
                        {idx < line.words.length - 1 ? ' ' : ''}
                      </Text>
                        );
                      })()}
                    </Pressable>
                  ))}
                </View>
                {active && line.translatedLine ? <Text style={styles.translationText}>{line.translatedLine}</Text> : null}
              </View>
            );
          })}
        </ScrollView>

        <View
          style={styles.progressTouchArea}
          onLayout={(event) => setProgressTrackWidth(event.nativeEvent.layout.width)}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={(event) => seekFromPosition(event.nativeEvent.locationX)}
          onResponderMove={(event) => seekFromPosition(event.nativeEvent.locationX)}
        >
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` as `${number}%` }]} />
          </View>
          <View style={[styles.progressThumb, { left: progressThumbLeft }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatSeconds(player.positionSec)}</Text>
          <Text style={styles.timeText}>{formatSeconds(track.durationSec)}</Text>
        </View>

        <View style={styles.transportRow}>
          <Pressable onPress={() => seekTo(Math.max(0, player.positionSec - 10))}>
            <Ionicons name="shuffle" size={22} color="#A5ADC6" />
          </Pressable>
          <Pressable onPress={() => seekTo(Math.max(0, player.positionSec - 10))}>
            <Ionicons name="play-skip-back" size={30} color="#DDE2F7" />
          </Pressable>
          <Pressable style={styles.centerPlayButton} onPress={togglePlayback}>
            <Ionicons name={player.isPlaying ? 'pause' : 'play'} size={28} color="#FFFFFF" />
          </Pressable>
          <Pressable onPress={() => seekTo(Math.min(track.durationSec, player.positionSec + 10))}>
            <Ionicons name="play-skip-forward" size={30} color="#DDE2F7" />
          </Pressable>
          <Pressable onPress={() => seekTo(0)}>
            <Ionicons name="repeat" size={22} color="#A5ADC6" />
          </Pressable>
        </View>
      </View>

      {selectedWord ? (
        <View style={styles.wordCardWrap}>
          <WordMeaningCard
            wordMeaning={selectedWord}
            selectedDeckTitle={selectedDeckTitle}
            deckOptions={vocabDecks.map((deck) => ({ id: deck.id, title: deck.title }))}
            isDeckPickerOpen={showDeckPicker}
            onToggleDeckPicker={() => setShowDeckPicker((prev) => !prev)}
            onSelectDeck={(deckId) => {
              setSelectedDeckId(deckId);
              setShowDeckPicker(false);
            }}
            onClose={handleCloseWordMeaning}
            onAddToFlashcards={() => {
              addWordToFlashcards(selectedWord);
              handleCloseWordMeaning();
              showAddToast(selectedDeckTitle);
            }}
          />
        </View>
      ) : null}
      {addToastMessage ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.addToastWrap,
            {
              opacity: addToastOpacity,
              transform: [{ translateY: addToastTranslateY }],
            },
          ]}
        >
          <View style={styles.addToast}>
            <Ionicons name="checkmark-circle" size={18} color="#9BE5AE" />
            <Text style={styles.addToastText}>{addToastMessage}</Text>
          </View>
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F111A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playingFromWrap: {
    alignItems: 'center',
  },
  playingFromLabel: {
    color: '#A5ADC6',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  playingFromValue: {
    color: '#F3F5FF',
    fontSize: 32 / 2,
    marginTop: 2,
    fontWeight: '600',
  },
  coverArt: {
    width: 210,
    height: 210,
    borderRadius: 24,
    marginTop: 14,
    alignSelf: 'center',
    backgroundColor: '#1D2232',
  },
  coverArtCollapsed: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  trackTitle: {
    color: '#F3F5FF',
    fontSize: 56 / 2,
    fontWeight: '800',
    marginTop: 14,
  },
  trackArtist: {
    color: '#A5ADC6',
    fontSize: 41 / 2,
    marginTop: 2,
  },
  tapHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  tapHint: {
    color: '#9B8EFF',
    fontSize: 14,
    letterSpacing: 0.7,
    fontWeight: '700',
  },
  lyricsArea: {
    marginTop: 10,
    flex: 1,
  },
  lyricsContent: {
    paddingBottom: 40,
  },
  lyricLineBlock: {
    marginBottom: 14,
  },
  wordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lyricWord: {
    fontSize: 40 / 2,
    lineHeight: 30,
  },
  lyricWordCurrent: {
    color: '#F9A94A',
    fontWeight: '800',
  },
  lyricWordSung: {
    color: '#F08D31',
    fontWeight: '700',
  },
  lyricWordUpcoming: {
    color: '#F3F5FF',
    fontWeight: '700',
  },
  lyricWordCompleted: {
    color: '#A38A6A',
    fontWeight: '600',
  },
  lyricWordDim: {
    color: '#7C859F',
    fontWeight: '500',
  },
  lyricWordMarkerHighlight: {
    backgroundColor: '#F8E46A',
    color: '#151824',
    borderRadius: 4,
    overflow: 'hidden',
    paddingHorizontal: 3,
  },
  translationText: {
    color: '#A5ADC6',
    fontSize: 36 / 2,
    fontStyle: 'italic',
    marginTop: 2,
  },
  progressTrack: {
    height: 8,
    borderRadius: 5,
    backgroundColor: '#2A3145',
    overflow: 'hidden',
  },
  progressTouchArea: {
    marginTop: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#7A6CFF',
  },
  progressThumb: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E7E9F7',
    borderWidth: 1,
    borderColor: '#AEB7D6',
    top: 5,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: '#A5ADC6',
    fontSize: 14,
  },
  transportRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  centerPlayButton: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#F08D31',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordCardWrap: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 24,
  },
  addToastWrap: {
    position: 'absolute',
    left: 28,
    right: 28,
    bottom: 134,
    alignItems: 'center',
  },
  addToast: {
    backgroundColor: 'rgba(21, 30, 45, 0.95)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A3145',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addToastText: {
    color: '#DDE5FA',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#F3F5FF',
    fontSize: 22,
    fontWeight: '700',
  },
  emptyButton: {
    borderRadius: 14,
    backgroundColor: '#7A6CFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
