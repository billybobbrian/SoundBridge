import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import {
  Deck,
  PlayableTrack,
  Playlist,
  Song,
  WordMeaning,
  likedSongs,
  listeningHistory,
  playableTracksById,
  playlists,
  vocabDecks,
} from '../data/mockData';

type OnboardingState = {
  language: string | null;
  regions: string[];
  genres: string[];
  completed: boolean;
};

type AppState = {
  onboarding: OnboardingState;
  player: {
    activeTrack: PlayableTrack | null;
    isPlaying: boolean;
    positionSec: number;
    selectedWord: WordMeaning | null;
    addedWordCards: WordMeaning[];
  };
  likedSongs: Song[];
  listeningHistory: Song[];
  playlists: Playlist[];
  vocabDecks: Deck[];
};

type Action =
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'TOGGLE_REGION'; payload: string }
  | { type: 'SET_ALL_REGIONS'; payload: string[] }
  | { type: 'TOGGLE_GENRE'; payload: string }
  | { type: 'START_TRACK'; payload: PlayableTrack }
  | { type: 'TOGGLE_PLAYBACK' }
  | { type: 'SEEK_TO'; payload: number }
  | { type: 'TICK_PLAYBACK' }
  | { type: 'OPEN_WORD_MEANING'; payload: WordMeaning }
  | { type: 'CLOSE_WORD_MEANING' }
  | { type: 'ADD_WORD_TO_FLASHCARDS'; payload: WordMeaning }
  | { type: 'COMPLETE_ONBOARDING' };

type AppStateContextValue = {
  state: AppState;
  setLanguage: (language: string) => void;
  toggleRegion: (region: string) => void;
  setAllRegions: (regions: string[]) => void;
  toggleGenre: (genre: string) => void;
  startTrack: (trackId: string, sourceLabel?: string) => void;
  togglePlayback: () => void;
  seekTo: (positionSec: number) => void;
  openWordMeaning: (wordMeaning: WordMeaning) => void;
  closeWordMeaning: () => void;
  addWordToFlashcards: (wordMeaning: WordMeaning) => void;
  completeOnboarding: () => void;
};

const initialState: AppState = {
  onboarding: {
    language: null,
    regions: [],
    genres: [],
    completed: false,
  },
  player: {
    activeTrack: null,
    isPlaying: false,
    positionSec: 0,
    selectedWord: null,
    addedWordCards: [],
  },
  likedSongs,
  listeningHistory,
  playlists,
  vocabDecks,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          language: action.payload,
          regions: [],
          genres: [],
        },
      };
    case 'TOGGLE_REGION': {
      const isSelected = state.onboarding.regions.includes(action.payload);
      const nextRegions = isSelected
        ? state.onboarding.regions.filter((region) => region !== action.payload)
        : [...state.onboarding.regions, action.payload];

      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          regions: nextRegions,
        },
      };
    }
    case 'SET_ALL_REGIONS':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          regions: action.payload,
        },
      };
    case 'TOGGLE_GENRE': {
      const isSelected = state.onboarding.genres.includes(action.payload);
      const nextGenres = isSelected
        ? state.onboarding.genres.filter((genre) => genre !== action.payload)
        : [...state.onboarding.genres, action.payload];

      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          genres: nextGenres,
        },
      };
    }
    case 'START_TRACK':
      return {
        ...state,
        player: {
          ...state.player,
          activeTrack: action.payload,
          isPlaying: true,
          positionSec: 0,
          selectedWord: null,
        },
      };
    case 'TOGGLE_PLAYBACK':
      if (!state.player.activeTrack) return state;
      return {
        ...state,
        player: {
          ...state.player,
          isPlaying: !state.player.isPlaying,
        },
      };
    case 'SEEK_TO': {
      if (!state.player.activeTrack) return state;
      const clamped = Math.max(0, Math.min(action.payload, state.player.activeTrack.durationSec));
      return {
        ...state,
        player: {
          ...state.player,
          positionSec: clamped,
          isPlaying: clamped < state.player.activeTrack.durationSec ? state.player.isPlaying : false,
        },
      };
    }
    case 'TICK_PLAYBACK': {
      if (!state.player.isPlaying || !state.player.activeTrack) return state;
      const next = Math.min(state.player.positionSec + 1, state.player.activeTrack.durationSec);
      return {
        ...state,
        player: {
          ...state.player,
          positionSec: next,
          isPlaying: next < state.player.activeTrack.durationSec,
        },
      };
    }
    case 'OPEN_WORD_MEANING':
      return {
        ...state,
        player: {
          ...state.player,
          selectedWord: action.payload,
        },
      };
    case 'CLOSE_WORD_MEANING':
      return {
        ...state,
        player: {
          ...state.player,
          selectedWord: null,
        },
      };
    case 'ADD_WORD_TO_FLASHCARDS': {
      const alreadyAdded = state.player.addedWordCards.some(
        (word) => word.word.toLowerCase() === action.payload.word.toLowerCase(),
      );
      return {
        ...state,
        player: {
          ...state.player,
          addedWordCards: alreadyAdded ? state.player.addedWordCards : [...state.player.addedWordCards, action.payload],
        },
      };
    }
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          completed: true,
        },
      };
    default:
      return state;
  }
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.player.isPlaying || !state.player.activeTrack) return;
    const interval = setInterval(() => {
      dispatch({ type: 'TICK_PLAYBACK' });
    }, 1000);
    return () => clearInterval(interval);
  }, [state.player.isPlaying, state.player.activeTrack]);

  const value = useMemo(
    () => ({
      state,
      setLanguage: (language: string) => dispatch({ type: 'SET_LANGUAGE', payload: language }),
      toggleRegion: (region: string) => dispatch({ type: 'TOGGLE_REGION', payload: region }),
      setAllRegions: (regions: string[]) => dispatch({ type: 'SET_ALL_REGIONS', payload: regions }),
      toggleGenre: (genre: string) => dispatch({ type: 'TOGGLE_GENRE', payload: genre }),
      startTrack: (trackId: string, sourceLabel?: string) => {
        const track = playableTracksById[trackId];
        if (!track) return;
        dispatch({
          type: 'START_TRACK',
          payload: {
            ...track,
            sourceLabel: sourceLabel ?? track.sourceLabel,
          },
        });
      },
      togglePlayback: () => dispatch({ type: 'TOGGLE_PLAYBACK' }),
      seekTo: (positionSec: number) => dispatch({ type: 'SEEK_TO', payload: positionSec }),
      openWordMeaning: (wordMeaning: WordMeaning) => dispatch({ type: 'OPEN_WORD_MEANING', payload: wordMeaning }),
      closeWordMeaning: () => dispatch({ type: 'CLOSE_WORD_MEANING' }),
      addWordToFlashcards: (wordMeaning: WordMeaning) =>
        dispatch({ type: 'ADD_WORD_TO_FLASHCARDS', payload: wordMeaning }),
      completeOnboarding: () => dispatch({ type: 'COMPLETE_ONBOARDING' }),
    }),
    [state],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}
