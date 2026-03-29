import React, { useMemo, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Animated, PanResponder, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Speech from 'expo-speech';
import { flashcardsByDeckId } from '../../data/mockData';
import { RootStackParamList } from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'FlashcardStudy'>;

export function FlashcardStudyScreen({ navigation, route }: Props) {
  const { deckId, deckTitle } = route.params;
  const cards = useMemo(() => flashcardsByDeckId[deckId] ?? [], [deckId]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStatusById, setCardStatusById] = useState<Record<string, 'learning' | 'known'>>({});
  const [starredCardIds, setStarredCardIds] = useState<Record<string, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const swipeX = useRef(new Animated.Value(0)).current;
  const flipProgress = useRef(new Animated.Value(0)).current;

  const currentCard = cards[cardIndex];
  const nextCard = cards[cardIndex + 1];
  const afterNextCard = cards[cardIndex + 2];
  const total = cards.length;
  const learningCount = useMemo(
    () => Object.values(cardStatusById).filter((status) => status === 'learning').length,
    [cardStatusById],
  );
  const knownCount = useMemo(
    () => Object.values(cardStatusById).filter((status) => status === 'known').length,
    [cardStatusById],
  );

  const resetCardTransforms = (toIndex: number) => {
    swipeX.setValue(0);
    setIsFlipped(false);
    flipProgress.setValue(0);
    setCardIndex(toIndex);
  };

  const onPrev = () => {
    if (cardIndex <= 0) return;
    resetCardTransforms(cardIndex - 1);
  };

  const toggleFlip = () => {
    const nextFlip = !isFlipped;
    setIsFlipped(nextFlip);
    Animated.timing(flipProgress, {
      toValue: nextFlip ? 1 : 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  };

  const markCard = (status: 'learning' | 'known') => {
    setCardStatusById((prev) => ({
      ...prev,
      [currentCard.id]: status,
    }));
  };

  const toggleStar = () => {
    setStarredCardIds((prev) => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id],
    }));
  };

  const speakCurrentText = () => {
    const textToSpeak = isFlipped ? currentCard.back : currentCard.front;
    if (!textToSpeak?.trim()) return;
    Speech.stop();
    setIsSpeaking(true);
    Speech.speak(textToSpeak, {
      language: 'es-ES',
      rate: 0.95,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const commitSwipeGrade = (status: 'learning' | 'known') => {
    markCard(status);
    const targetX = status === 'known' ? 420 : -420;
    const hasNextCard = cardIndex < total - 1;
    Animated.timing(swipeX, {
      toValue: targetX,
      duration: 190,
      useNativeDriver: true,
    }).start(() => {
      if (hasNextCard) {
        resetCardTransforms(cardIndex + 1);
      } else {
        Animated.spring(swipeX, {
          toValue: 0,
          useNativeDriver: true,
          friction: 9,
          tension: 80,
        }).start();
      }
    });
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_, gestureState) =>
          Math.abs(gestureState.dx) > 4 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 8 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderMove: (_, gestureState) => {
          swipeX.setValue(gestureState.dx);
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx > 110) {
            commitSwipeGrade('known');
            return;
          }
          if (gestureState.dx < -110) {
            commitSwipeGrade('learning');
            return;
          }
          Animated.spring(swipeX, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
            tension: 90,
          }).start();
        },
      }),
    [cardIndex, total],
  );

  const cardAnimatedStyle = {
    transform: [
      { translateX: swipeX },
      {
        rotate: swipeX.interpolate({
          inputRange: [-240, 0, 240],
          outputRange: ['-10deg', '0deg', '10deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const stackRevealProgress = swipeX.interpolate({
    inputRange: [-180, 0, 180],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });

  const middleCardAnimatedStyle = {
    transform: [
      {
        translateY: stackRevealProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [9, 2],
        }),
      },
      {
        scale: stackRevealProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.985, 0.997],
        }),
      },
    ],
    opacity: stackRevealProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.88, 0.97],
    }),
  };

  const backCardAnimatedStyle = {
    transform: [
      {
        translateY: stackRevealProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 10],
        }),
      },
      {
        scale: stackRevealProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.97, 0.982],
        }),
      },
    ],
    opacity: stackRevealProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.72, 0.84],
    }),
  };

  const rightFeedbackOpacity = swipeX.interpolate({
    inputRange: [20, 140],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const rightFeedbackScale = swipeX.interpolate({
    inputRange: [20, 180],
    outputRange: [0.9, 1.1],
    extrapolate: 'clamp',
  });
  const leftFeedbackOpacity = swipeX.interpolate({
    inputRange: [-140, -20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const leftFeedbackScale = swipeX.interpolate({
    inputRange: [-180, -20],
    outputRange: [1.1, 0.9],
    extrapolate: 'clamp',
  });

  const frontAnimatedStyle = {
    transform: [
      { perspective: 1000 },
      {
        rotateY: flipProgress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
    opacity: flipProgress.interpolate({
      inputRange: [0, 0.49, 0.5, 1],
      outputRange: [1, 1, 0, 0],
    }),
  };

  const backAnimatedStyle = {
    transform: [
      { perspective: 1000 },
      {
        rotateY: flipProgress.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
    opacity: flipProgress.interpolate({
      inputRange: [0, 0.49, 0.5, 1],
      outputRange: [0, 0, 1, 1],
    }),
  };

  if (!currentCard) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>No flashcards yet</Text>
          <Text style={styles.emptySubtitle}>Try adding words from live lyrics first.</Text>
          <Pressable style={styles.doneButton} onPress={() => navigation.goBack()}>
            <Text style={styles.doneButtonText}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Pressable style={styles.circleButton} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={26} color="#DFE4F8" />
          </Pressable>
          <View style={styles.topCountersRow}>
            <View style={[styles.masteryChip, styles.learningChip]}>
              <Text style={styles.masteryChipText}>{learningCount}</Text>
            </View>
            <Text style={styles.counterText}>
              {cardIndex + 1} / {total}
            </Text>
            <View style={[styles.masteryChip, styles.knownChip]}>
              <Text style={styles.masteryChipText}>{knownCount}</Text>
            </View>
          </View>
          <Pressable style={styles.circleButton}>
            <Ionicons name="settings-outline" size={22} color="#DFE4F8" />
          </Pressable>
        </View>

        <Text style={styles.deckTitle}>{deckTitle}</Text>

        <View style={styles.cardWrap}>
          <Animated.View
            style={[
              styles.feedbackBadge,
              styles.feedbackBadgeLeft,
              { opacity: leftFeedbackOpacity, transform: [{ scale: leftFeedbackScale }] },
            ]}
          >
            <Ionicons name="close" size={22} color="#FFE3E3" />
          </Animated.View>
          <Animated.View
            style={[
              styles.feedbackBadge,
              styles.feedbackBadgeRight,
              { opacity: rightFeedbackOpacity, transform: [{ scale: rightFeedbackScale }] },
            ]}
          >
            <Ionicons name="checkmark" size={22} color="#E4FFE9" />
          </Animated.View>

          <View style={styles.cardTapArea} {...panResponder.panHandlers}>
            <Animated.View
              pointerEvents="none"
              style={[styles.stackPreviewCard, styles.stackPreviewCardBack, backCardAnimatedStyle]}
            >
              <Text style={styles.stackPreviewText}>{afterNextCard?.front ?? ''}</Text>
            </Animated.View>
            <Animated.View
              pointerEvents="none"
              style={[styles.stackPreviewCard, styles.stackPreviewCardMiddle, middleCardAnimatedStyle]}
            >
              <Text style={styles.stackPreviewText}>{nextCard?.front ?? ''}</Text>
            </Animated.View>
            <Pressable style={styles.cardTapAreaPressable} onPress={toggleFlip}>
              <Animated.View style={[styles.cardStack, cardAnimatedStyle]}>
              <Animated.View style={[styles.cardPaper, styles.cardFace, frontAnimatedStyle]}>
                <View style={styles.cardTopRow}>
                  <Pressable
                    style={styles.cardActionButton}
                    onPress={(event) => {
                      event.stopPropagation();
                      speakCurrentText();
                    }}
                  >
                    <Ionicons name={isSpeaking ? 'volume-high' : 'volume-medium-outline'} size={24} color="#8A93B8" />
                  </Pressable>
                  <Pressable
                    style={styles.cardActionButton}
                    onPress={(event) => {
                      event.stopPropagation();
                      toggleStar();
                    }}
                  >
                    <Ionicons
                      name={starredCardIds[currentCard.id] ? 'star' : 'star-outline'}
                      size={22}
                      color={starredCardIds[currentCard.id] ? '#F7C85E' : '#8A93B8'}
                    />
                  </Pressable>
                </View>
                <View style={styles.cardCenter}>
                  <Text style={styles.cardText}>{currentCard.front}</Text>
                </View>
              </Animated.View>

              <Animated.View style={[styles.cardPaper, styles.cardFace, styles.cardFaceBack, backAnimatedStyle]}>
                <View style={styles.cardTopRow}>
                  <Pressable
                    style={styles.cardActionButton}
                    onPress={(event) => {
                      event.stopPropagation();
                      speakCurrentText();
                    }}
                  >
                    <Ionicons name={isSpeaking ? 'volume-high' : 'volume-medium-outline'} size={23} color="#8A93B8" />
                  </Pressable>
                  <Pressable
                    style={styles.cardActionButton}
                    onPress={(event) => {
                      event.stopPropagation();
                      toggleStar();
                    }}
                  >
                    <Ionicons
                      name={starredCardIds[currentCard.id] ? 'star' : 'star-outline'}
                      size={21}
                      color={starredCardIds[currentCard.id] ? '#F7C85E' : '#8A93B8'}
                    />
                  </Pressable>
                </View>
                <View style={styles.cardCenter}>
                  <Text style={styles.cardText}>{currentCard.back}</Text>
                </View>
              </Animated.View>
              </Animated.View>
            </Pressable>
          </View>

          <Text style={styles.hintText}>Tap to flip · Swipe left/right to grade</Text>
        </View>

        <View style={styles.bottomControls}>
          <Pressable style={styles.navButton} onPress={onPrev} disabled={cardIndex === 0}>
            <Ionicons name="chevron-back" size={30} color={cardIndex === 0 ? '#515A78' : '#D8DEF6'} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090C2A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#2A315A',
    paddingBottom: 10,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1B1F4A',
    borderWidth: 1,
    borderColor: '#2B3260',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCountersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  masteryChip: {
    minWidth: 42,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  learningChip: {
    backgroundColor: '#371427',
    borderColor: '#A03B66',
  },
  knownChip: {
    backgroundColor: '#123227',
    borderColor: '#41A270',
  },
  masteryChipText: {
    color: '#F5F8FF',
    fontWeight: '700',
    fontSize: 15,
  },
  counterText: {
    color: '#F4F6FF',
    fontSize: 26 / 2,
    fontWeight: '700',
    minWidth: 72,
    textAlign: 'center',
  },
  deckTitle: {
    color: '#AEB7D6',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTapArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 470,
  },
  cardTapAreaPressable: {
    width: '100%',
    alignItems: 'center',
    zIndex: 3,
  },
  stackPreviewCard: {
    position: 'absolute',
    width: '95%',
    minHeight: 430,
    borderRadius: 24,
    backgroundColor: '#171C2D',
    borderWidth: 1,
    borderColor: '#2C3550',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  stackPreviewCardMiddle: {
    zIndex: 2,
    transform: [{ translateY: 9 }, { scale: 0.985 }],
    opacity: 0.88,
  },
  stackPreviewCardBack: {
    zIndex: 1,
    transform: [{ translateY: 18 }, { scale: 0.97 }],
    opacity: 0.72,
  },
  stackPreviewText: {
    color: '#6E789E',
    fontSize: 16,
    textAlign: 'center',
  },
  cardStack: {
    width: '100%',
    minHeight: 440,
  },
  cardFace: {
    width: '100%',
    minHeight: 440,
    backfaceVisibility: 'hidden',
  },
  cardFaceBack: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardPaper: {
    minHeight: 440,
    borderRadius: 26,
    backgroundColor: '#1C2133',
    borderWidth: 1,
    borderColor: '#343B57',
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardActionButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardText: {
    color: '#EEF1FF',
    fontSize: 44 / 2,
    lineHeight: 30,
    fontWeight: '500',
    textAlign: 'center',
  },
  feedbackBadge: {
    position: 'absolute',
    top: 110,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    zIndex: 10,
  },
  feedbackBadgeLeft: {
    left: 14,
    backgroundColor: '#5E2138',
    borderColor: '#B54E74',
  },
  feedbackBadgeRight: {
    right: 14,
    backgroundColor: '#214E3C',
    borderColor: '#4AB177',
  },
  hintText: {
    color: '#7E89B2',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 13,
  },
  bottomControls: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  navButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#1B1F4A',
    borderWidth: 1,
    borderColor: '#2B3260',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minWidth: 120,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F08D31',
    paddingHorizontal: 22,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#F4F6FF',
    fontSize: 24,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#AEB7D6',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
});
