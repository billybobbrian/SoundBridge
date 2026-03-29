export type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  playedAt?: string;
  coverUrl?: string;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  year: string;
};

export type Artist = {
  id: string;
  name: string;
  subtitle?: string;
  monthlyListeners?: string;
  avatarUrl?: string;
};

export type Playlist = {
  id: string;
  title: string;
  trackCount: number;
  coverUrl?: string;
};

export type Deck = {
  id: string;
  title: string;
  languagePair: string;
  dueToday: number;
  total?: number;
  icon?: 'bolt' | 'chatbubble' | 'book';
};

export type DiscoverAlbum = {
  id: string;
  title: string;
  artist: string;
  accentColor: string;
  coverUrl?: string;
};

export type HistoryItem = {
  id: string;
  title: string;
  artist: string;
  playedAt: string;
};

export type MasteryStats = {
  totalCards: number;
  masteredCards: number;
  masteryPercent: number;
};

export type PlayableTrack = {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  durationSec: number;
  sourceLabel: string;
};

export type LyricWordToken = {
  id: string;
  text: string;
  normalized: string;
};

export type TimedLyricLine = {
  id: string;
  startSec: number;
  endSec: number;
  line: string;
  translatedLine?: string;
  words: LyricWordToken[];
};

export type WordMeaning = {
  word: string;
  meaning: string;
};

export type FlashcardItem = {
  id: string;
  front: string;
  back: string;
};

export const languages = ['Spanish', 'Chinese', 'Korean', 'Portuguese', 'French', 'Japanese'];

export const regionsByLanguage: Record<string, string[]> = {
  Spanish: ['Mexico', 'Costa Rica', 'Guatemala', 'Colombia', 'Puerto Rico', 'Spain'],
  Chinese: ['Mainland China', 'Taiwan', 'Singapore', 'Hong Kong'],
  Korean: ['Seoul', 'Busan', 'Jeju'],
  Portuguese: ['Brazil', 'Portugal', 'Angola'],
  French: ['France', 'Quebec', 'Belgium', 'Senegal'],
  Japanese: ['Kanto', 'Kansai', 'Kyushu'],
};

export const genres = [
  'Pop',
  'Hip-Hop',
  'R&B',
  'Electronic',
  'Rock',
  'Indie',
  'Latin',
];

export const featuredSong: Song = {
  id: 'song-0',
  title: 'Ojitos Lindos',
  artist: 'Bad Bunny ft. Bomba Estereo',
  duration: '4:18',
  coverUrl: 'file:///Users/briangay/.cursor/projects/Users-briangay-Desktop-BeatLingua/assets/image-eb41e30d-fcfe-40a5-8867-8b4a159cae05.png',
};

export const recommendedAlbums: Album[] = [
  { id: 'album-1', title: 'Noche de Playa', artist: 'Mar Azul', year: '2024' },
  { id: 'album-2', title: 'Ciudad Neon', artist: 'Los Reyes', year: '2023' },
  { id: 'album-3', title: 'Jardin de Luz', artist: 'Luna Sol', year: '2025' },
];

export const recommendedSongs: Song[] = [
  {
    id: 'rec-song-1',
    title: 'Baby G',
    artist: 'Bradd',
    duration: '3:05',
    coverUrl: 'https://picsum.photos/seed/recommended-song-babyg/700/900',
  },
  {
    id: 'rec-song-2',
    title: 'Volver',
    artist: 'Lia Norte',
    duration: '2:54',
    coverUrl: 'https://picsum.photos/seed/recommended-song-volver/700/900',
  },
  {
    id: 'rec-song-3',
    title: 'Medianoche',
    artist: 'Cruz M',
    duration: '3:21',
    coverUrl: 'https://picsum.photos/seed/recommended-song-medianoche/700/900',
  },
  {
    id: 'rec-song-4',
    title: 'Ritmo Azul',
    artist: 'Dario K',
    duration: '2:47',
    coverUrl: 'https://picsum.photos/seed/recommended-song-ritmoazul/700/900',
  },
];

export const playableTracksById: Record<string, PlayableTrack> = {
  [featuredSong.id]: {
    id: featuredSong.id,
    title: featuredSong.title,
    artist: featuredSong.artist,
    coverUrl: featuredSong.coverUrl,
    durationSec: 258,
    sourceLabel: 'Song of the Day',
  },
  'rec-song-1': {
    id: 'rec-song-1',
    title: 'Baby G',
    artist: 'Bradd',
    coverUrl: 'https://picsum.photos/seed/recommended-song-babyg/700/900',
    durationSec: 185,
    sourceLabel: 'Recommended Songs',
  },
  'rec-song-2': {
    id: 'rec-song-2',
    title: 'Volver',
    artist: 'Lia Norte',
    coverUrl: 'https://picsum.photos/seed/recommended-song-volver/700/900',
    durationSec: 174,
    sourceLabel: 'Recommended Songs',
  },
  'rec-song-3': {
    id: 'rec-song-3',
    title: 'Medianoche',
    artist: 'Cruz M',
    coverUrl: 'https://picsum.photos/seed/recommended-song-medianoche/700/900',
    durationSec: 201,
    sourceLabel: 'Recommended Songs',
  },
  'rec-song-4': {
    id: 'rec-song-4',
    title: 'Ritmo Azul',
    artist: 'Dario K',
    coverUrl: 'https://picsum.photos/seed/recommended-song-ritmoazul/700/900',
    durationSec: 167,
    sourceLabel: 'Recommended Songs',
  },
};

export const timedLyricsByTrackId: Record<string, TimedLyricLine[]> = {
  'song-0': [
    {
      id: 'l1',
      startSec: 0,
      endSec: 12,
      line: 'Ojitos lindos, ay',
      translatedLine: 'Pretty little eyes, oh',
      words: [
        { id: 'l1w1', text: 'Ojitos', normalized: 'ojitos' },
        { id: 'l1w2', text: 'lindos', normalized: 'lindos' },
        { id: 'l1w3', text: 'ay', normalized: 'ay' },
      ],
    },
    {
      id: 'l2',
      startSec: 12,
      endSec: 24,
      line: 'Ojitos lindos, los que tiene usted',
      words: [
        { id: 'l2w1', text: 'Ojitos', normalized: 'ojitos' },
        { id: 'l2w2', text: 'lindos', normalized: 'lindos' },
        { id: 'l2w3', text: 'los', normalized: 'los' },
        { id: 'l2w4', text: 'que', normalized: 'que' },
        { id: 'l2w5', text: 'tiene', normalized: 'tiene' },
        { id: 'l2w6', text: 'usted', normalized: 'usted' },
      ],
    },
    {
      id: 'l3',
      startSec: 24,
      endSec: 36,
      line: 'No me canso de ver',
      words: [
        { id: 'l3w1', text: 'No', normalized: 'no' },
        { id: 'l3w2', text: 'me', normalized: 'me' },
        { id: 'l3w3', text: 'canso', normalized: 'canso' },
        { id: 'l3w4', text: 'de', normalized: 'de' },
        { id: 'l3w5', text: 'ver', normalized: 'ver' },
      ],
    },
    {
      id: 'l4',
      startSec: 36,
      endSec: 48,
      line: 'Sin ti no viviria, te quiero tener',
      words: [
        { id: 'l4w1', text: 'Sin', normalized: 'sin' },
        { id: 'l4w2', text: 'ti', normalized: 'ti' },
        { id: 'l4w3', text: 'no', normalized: 'no' },
        { id: 'l4w4', text: 'viviria', normalized: 'viviria' },
        { id: 'l4w5', text: 'te', normalized: 'te' },
        { id: 'l4w6', text: 'quiero', normalized: 'quiero' },
        { id: 'l4w7', text: 'tener', normalized: 'tener' },
      ],
    },
    {
      id: 'l5',
      startSec: 48,
      endSec: 60,
      line: 'Mirando al cielo, yo te vuelvo a ver',
      translatedLine: 'Looking at the sky, I see you again',
      words: [
        { id: 'l5w1', text: 'Mirando', normalized: 'mirando' },
        { id: 'l5w2', text: 'al', normalized: 'al' },
        { id: 'l5w3', text: 'cielo', normalized: 'cielo' },
        { id: 'l5w4', text: 'yo', normalized: 'yo' },
        { id: 'l5w5', text: 'te', normalized: 'te' },
        { id: 'l5w6', text: 'vuelvo', normalized: 'vuelvo' },
        { id: 'l5w7', text: 'a', normalized: 'a' },
        { id: 'l5w8', text: 'ver', normalized: 'ver' },
      ],
    },
    {
      id: 'l6',
      startSec: 60,
      endSec: 72,
      line: 'Baila conmigo bajo la luna',
      words: [
        { id: 'l6w1', text: 'Baila', normalized: 'baila' },
        { id: 'l6w2', text: 'conmigo', normalized: 'conmigo' },
        { id: 'l6w3', text: 'bajo', normalized: 'bajo' },
        { id: 'l6w4', text: 'la', normalized: 'la' },
        { id: 'l6w5', text: 'luna', normalized: 'luna' },
      ],
    },
    {
      id: 'l7',
      startSec: 72,
      endSec: 84,
      line: 'Tus pasos suenan como fortuna',
      words: [
        { id: 'l7w1', text: 'Tus', normalized: 'tus' },
        { id: 'l7w2', text: 'pasos', normalized: 'pasos' },
        { id: 'l7w3', text: 'suenan', normalized: 'suenan' },
        { id: 'l7w4', text: 'como', normalized: 'como' },
        { id: 'l7w5', text: 'fortuna', normalized: 'fortuna' },
      ],
    },
    {
      id: 'l8',
      startSec: 84,
      endSec: 96,
      line: 'Cuando me miras no existe pena',
      translatedLine: 'When you look at me there is no sorrow',
      words: [
        { id: 'l8w1', text: 'Cuando', normalized: 'cuando' },
        { id: 'l8w2', text: 'me', normalized: 'me' },
        { id: 'l8w3', text: 'miras', normalized: 'miras' },
        { id: 'l8w4', text: 'no', normalized: 'no' },
        { id: 'l8w5', text: 'existe', normalized: 'existe' },
        { id: 'l8w6', text: 'pena', normalized: 'pena' },
      ],
    },
    {
      id: 'l9',
      startSec: 96,
      endSec: 108,
      line: 'Tu risa cura y todo suena',
      words: [
        { id: 'l9w1', text: 'Tu', normalized: 'tu' },
        { id: 'l9w2', text: 'risa', normalized: 'risa' },
        { id: 'l9w3', text: 'cura', normalized: 'cura' },
        { id: 'l9w4', text: 'y', normalized: 'y' },
        { id: 'l9w5', text: 'todo', normalized: 'todo' },
        { id: 'l9w6', text: 'suena', normalized: 'suena' },
      ],
    },
    {
      id: 'l10',
      startSec: 108,
      endSec: 120,
      line: 'Vente cerquita, no tengas miedo',
      words: [
        { id: 'l10w1', text: 'Vente', normalized: 'vente' },
        { id: 'l10w2', text: 'cerquita', normalized: 'cerquita' },
        { id: 'l10w3', text: 'no', normalized: 'no' },
        { id: 'l10w4', text: 'tengas', normalized: 'tengas' },
        { id: 'l10w5', text: 'miedo', normalized: 'miedo' },
      ],
    },
    {
      id: 'l11',
      startSec: 120,
      endSec: 132,
      line: 'Que yo te cuido en este enredo',
      words: [
        { id: 'l11w1', text: 'Que', normalized: 'que' },
        { id: 'l11w2', text: 'yo', normalized: 'yo' },
        { id: 'l11w3', text: 'te', normalized: 'te' },
        { id: 'l11w4', text: 'cuido', normalized: 'cuido' },
        { id: 'l11w5', text: 'en', normalized: 'en' },
        { id: 'l11w6', text: 'este', normalized: 'este' },
        { id: 'l11w7', text: 'enredo', normalized: 'enredo' },
      ],
    },
    {
      id: 'l12',
      startSec: 132,
      endSec: 144,
      line: 'Si cae la noche, sigo despierto',
      translatedLine: 'If night falls, I stay awake',
      words: [
        { id: 'l12w1', text: 'Si', normalized: 'si' },
        { id: 'l12w2', text: 'cae', normalized: 'cae' },
        { id: 'l12w3', text: 'la', normalized: 'la' },
        { id: 'l12w4', text: 'noche', normalized: 'noche' },
        { id: 'l12w5', text: 'sigo', normalized: 'sigo' },
        { id: 'l12w6', text: 'despierto', normalized: 'despierto' },
      ],
    },
    {
      id: 'l13',
      startSec: 144,
      endSec: 156,
      line: 'Pensando en ti cerca del puerto',
      words: [
        { id: 'l13w1', text: 'Pensando', normalized: 'pensando' },
        { id: 'l13w2', text: 'en', normalized: 'en' },
        { id: 'l13w3', text: 'ti', normalized: 'ti' },
        { id: 'l13w4', text: 'cerca', normalized: 'cerca' },
        { id: 'l13w5', text: 'del', normalized: 'del' },
        { id: 'l13w6', text: 'puerto', normalized: 'puerto' },
      ],
    },
    {
      id: 'l14',
      startSec: 156,
      endSec: 168,
      line: 'Dime tu nombre una vez mas',
      words: [
        { id: 'l14w1', text: 'Dime', normalized: 'dime' },
        { id: 'l14w2', text: 'tu', normalized: 'tu' },
        { id: 'l14w3', text: 'nombre', normalized: 'nombre' },
        { id: 'l14w4', text: 'una', normalized: 'una' },
        { id: 'l14w5', text: 'vez', normalized: 'vez' },
        { id: 'l14w6', text: 'mas', normalized: 'mas' },
      ],
    },
    {
      id: 'l15',
      startSec: 168,
      endSec: 180,
      line: 'Que yo te escucho y quiero mas',
      words: [
        { id: 'l15w1', text: 'Que', normalized: 'que' },
        { id: 'l15w2', text: 'yo', normalized: 'yo' },
        { id: 'l15w3', text: 'te', normalized: 'te' },
        { id: 'l15w4', text: 'escucho', normalized: 'escucho' },
        { id: 'l15w5', text: 'y', normalized: 'y' },
        { id: 'l15w6', text: 'quiero', normalized: 'quiero' },
        { id: 'l15w7', text: 'mas', normalized: 'mas' },
      ],
    },
    {
      id: 'l16',
      startSec: 180,
      endSec: 192,
      line: 'Con tus ojitos yo pierdo el norte',
      translatedLine: 'With your little eyes I lose my way',
      words: [
        { id: 'l16w1', text: 'Con', normalized: 'con' },
        { id: 'l16w2', text: 'tus', normalized: 'tus' },
        { id: 'l16w3', text: 'ojitos', normalized: 'ojitos' },
        { id: 'l16w4', text: 'yo', normalized: 'yo' },
        { id: 'l16w5', text: 'pierdo', normalized: 'pierdo' },
        { id: 'l16w6', text: 'el', normalized: 'el' },
        { id: 'l16w7', text: 'norte', normalized: 'norte' },
      ],
    },
    {
      id: 'l17',
      startSec: 192,
      endSec: 204,
      line: 'Tu me llevaste hacia otro horizonte',
      words: [
        { id: 'l17w1', text: 'Tu', normalized: 'tu' },
        { id: 'l17w2', text: 'me', normalized: 'me' },
        { id: 'l17w3', text: 'llevaste', normalized: 'llevaste' },
        { id: 'l17w4', text: 'hacia', normalized: 'hacia' },
        { id: 'l17w5', text: 'otro', normalized: 'otro' },
        { id: 'l17w6', text: 'horizonte', normalized: 'horizonte' },
      ],
    },
    {
      id: 'l18',
      startSec: 204,
      endSec: 216,
      line: 'Late mi pecho cuando te acercas',
      words: [
        { id: 'l18w1', text: 'Late', normalized: 'late' },
        { id: 'l18w2', text: 'mi', normalized: 'mi' },
        { id: 'l18w3', text: 'pecho', normalized: 'pecho' },
        { id: 'l18w4', text: 'cuando', normalized: 'cuando' },
        { id: 'l18w5', text: 'te', normalized: 'te' },
        { id: 'l18w6', text: 'acercas', normalized: 'acercas' },
      ],
    },
    {
      id: 'l19',
      startSec: 216,
      endSec: 228,
      line: 'Y se detiene cuando te alejas',
      words: [
        { id: 'l19w1', text: 'Y', normalized: 'y' },
        { id: 'l19w2', text: 'se', normalized: 'se' },
        { id: 'l19w3', text: 'detiene', normalized: 'detiene' },
        { id: 'l19w4', text: 'cuando', normalized: 'cuando' },
        { id: 'l19w5', text: 'te', normalized: 'te' },
        { id: 'l19w6', text: 'alejas', normalized: 'alejas' },
      ],
    },
    {
      id: 'l20',
      startSec: 228,
      endSec: 240,
      line: 'Ojitos lindos, quedate aqui',
      translatedLine: 'Pretty little eyes, stay here',
      words: [
        { id: 'l20w1', text: 'Ojitos', normalized: 'ojitos' },
        { id: 'l20w2', text: 'lindos', normalized: 'lindos' },
        { id: 'l20w3', text: 'quedate', normalized: 'quedate' },
        { id: 'l20w4', text: 'aqui', normalized: 'aqui' },
      ],
    },
  ],
};

/** Demo glossary for `song-0` lyrics — every token has an entry so taps never show “coming soon”. */
export const wordMeaningsByWord: Record<string, WordMeaning> = {
  a: { word: 'a', meaning: 'to / at (preposition)' },
  acercas: { word: 'acercas', meaning: 'you come closer / you approach' },
  al: { word: 'al', meaning: 'to the (a + el)' },
  alejas: { word: 'alejas', meaning: 'you move away / you distance yourself' },
  aqui: { word: 'aqui', meaning: 'here' },
  ay: { word: 'ay', meaning: 'oh / ah (interjection)' },
  bajo: { word: 'bajo', meaning: 'under / beneath' },
  baila: { word: 'baila', meaning: 'dance (command) / dances' },
  cae: { word: 'cae', meaning: 'falls / drops' },
  canso: { word: 'canso', meaning: 'I get tired (from cansarse)' },
  cerca: { word: 'cerca', meaning: 'close / near' },
  cerquita: { word: 'cerquita', meaning: 'nice and close (diminutive)' },
  cielo: { word: 'cielo', meaning: 'sky / heaven' },
  como: { word: 'como', meaning: 'like / as' },
  con: { word: 'con', meaning: 'with' },
  conmigo: { word: 'conmigo', meaning: 'with me' },
  cuido: { word: 'cuido', meaning: 'I take care (of) / I watch over' },
  cuando: { word: 'cuando', meaning: 'when' },
  cura: { word: 'cura', meaning: 'heals / cures' },
  de: { word: 'de', meaning: 'of / from' },
  del: { word: 'del', meaning: 'of the (de + el)' },
  despierto: { word: 'despierto', meaning: 'awake' },
  detiene: { word: 'detiene', meaning: 'stops / holds back' },
  dime: { word: 'dime', meaning: 'tell me' },
  el: { word: 'el', meaning: 'the (masculine singular)' },
  en: { word: 'en', meaning: 'in / on' },
  enredo: { word: 'enredo', meaning: 'mess / tangle / complicated situation' },
  escucho: { word: 'escucho', meaning: 'I listen' },
  este: { word: 'este', meaning: 'this (masculine)' },
  existe: { word: 'existe', meaning: 'exists / there is' },
  fortuna: { word: 'fortuna', meaning: 'fortune / luck' },
  hacia: { word: 'hacia', meaning: 'toward / towards' },
  horizonte: { word: 'horizonte', meaning: 'horizon' },
  la: { word: 'la', meaning: 'the (feminine singular) / her (object)' },
  late: { word: 'late', meaning: 'beats (heart)' },
  lindos: { word: 'lindos', meaning: 'beautiful / cute' },
  llevaste: { word: 'llevaste', meaning: 'you took / you carried (away)' },
  los: { word: 'los', meaning: 'the (masculine plural) / them (object)' },
  luna: { word: 'luna', meaning: 'moon' },
  mas: { word: 'mas', meaning: 'more' },
  me: { word: 'me', meaning: 'me / myself (object/reflexive)' },
  miedo: { word: 'miedo', meaning: 'fear' },
  mi: { word: 'mi', meaning: 'my' },
  mirando: { word: 'mirando', meaning: 'looking / watching' },
  miras: { word: 'miras', meaning: 'you look (at)' },
  no: { word: 'no', meaning: 'no / not' },
  nombre: { word: 'nombre', meaning: 'name' },
  noche: { word: 'noche', meaning: 'night' },
  norte: { word: 'norte', meaning: 'north / sense of direction (perder el norte: lose one’s way)' },
  ojitos: { word: 'ojitos', meaning: 'little eyes (diminutive of ojos)' },
  otro: { word: 'otro', meaning: 'other / another' },
  pasos: { word: 'pasos', meaning: 'steps' },
  pena: { word: 'pena', meaning: 'sorrow / pity / shame' },
  pecho: { word: 'pecho', meaning: 'chest' },
  pensando: { word: 'pensando', meaning: 'thinking' },
  pierdo: { word: 'pierdo', meaning: 'I lose' },
  puerto: { word: 'puerto', meaning: 'port / harbor' },
  que: { word: 'que', meaning: 'that / which / than' },
  quedate: { word: 'quedate', meaning: 'stay (informal command)' },
  quiero: { word: 'quiero', meaning: 'I want / I love' },
  risa: { word: 'risa', meaning: 'laughter' },
  se: { word: 'se', meaning: 'reflexive / passive “se”' },
  si: { word: 'si', meaning: 'if / whether' },
  sigo: { word: 'sigo', meaning: 'I keep on / I follow' },
  sin: { word: 'sin', meaning: 'without' },
  suena: { word: 'suena', meaning: 'sounds / rings' },
  suenan: { word: 'suenan', meaning: 'they sound / ring out' },
  te: { word: 'te', meaning: 'you (object) / yourself (reflexive)' },
  tener: { word: 'tener', meaning: 'to have / to hold' },
  tiene: { word: 'tiene', meaning: 'has / holds (he/she/you formal)' },
  tengas: { word: 'tengas', meaning: 'you have (subjunctive)' },
  ti: { word: 'ti', meaning: 'you (after preposition)' },
  todo: { word: 'todo', meaning: 'everything / all' },
  tu: { word: 'tu', meaning: 'your (before noun)' },
  tus: { word: 'tus', meaning: 'your (plural before noun)' },
  una: { word: 'una', meaning: 'a / one (feminine)' },
  usted: { word: 'usted', meaning: 'you (formal)' },
  vente: { word: 'vente', meaning: 'come here (informal command, vente = ven + te)' },
  ver: { word: 'ver', meaning: 'to see' },
  vez: { word: 'vez', meaning: 'time (occasion)' },
  viviria: { word: 'viviria', meaning: 'I would live' },
  vuelvo: { word: 'vuelvo', meaning: 'I return / I come back' },
  yo: { word: 'yo', meaning: 'I' },
  y: { word: 'y', meaning: 'and' },
};

export function phraseMeaningFromTokens(normalizedPhrase: string): string | null {
  const tokens = normalizedPhrase.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;
  const parts = tokens.map((t) => wordMeaningsByWord[t]?.meaning);
  if (parts.every((p) => p !== undefined)) {
    return parts.join(' · ');
  }
  return null;
}

export const recommendedArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Bad Bunny',
    subtitle: 'Reggaeton · 42M followers',
    avatarUrl: 'file:///Users/briangay/.cursor/projects/Users-briangay-Desktop-BeatLingua/assets/bun-8b4513e3-d458-4d51-bb27-df9839c508ee.png',
  },
  {
    id: 'artist-2',
    name: 'Adriel Rivera',
    subtitle: 'Indie Pop · 12M followers',
    avatarUrl: 'file:///Users/briangay/.cursor/projects/Users-briangay-Desktop-BeatLingua/assets/rivera-c1d843d7-b4f1-460f-aa83-c600b2499886.png',
  },
];

export const discoverAlbums: DiscoverAlbum[] = [
  {
    id: 'cover-1',
    title: 'Noche de Playa',
    artist: 'Mar Azul',
    accentColor: '#F08D31',
    coverUrl: 'https://picsum.photos/seed/noche-de-playa-cover/600/600',
  },
  {
    id: 'cover-2',
    title: 'Ciudad Neon',
    artist: 'Los Reyes',
    accentColor: '#7E4BFF',
    coverUrl: 'file:///Users/briangay/.cursor/projects/Users-briangay-Desktop-BeatLingua/assets/neon-7359d12e-721c-49ba-ad30-af7009307054.png',
  },
  {
    id: 'cover-3',
    title: 'Jardin de Luz',
    artist: 'Luna Sol',
    accentColor: '#C6C2D8',
    coverUrl: 'https://picsum.photos/seed/jardin-de-luz-cover/600/600',
  },
];

export const likedSongs: Song[] = [
  {
    id: 'liked-1',
    title: 'Ojitos Lindos',
    artist: 'Bad Bunny ft. Bomba Estereo',
    duration: '4:18',
    coverUrl: 'https://picsum.photos/seed/liked-ojitos/160/160',
  },
  {
    id: 'liked-2',
    title: 'Me Porto Bonito',
    artist: 'Bad Bunny, Chencho',
    duration: '2:58',
    coverUrl: 'https://picsum.photos/seed/liked-me-porto/160/160',
  },
  {
    id: 'liked-3',
    title: 'Pepas',
    artist: 'Farruko',
    duration: '4:47',
    coverUrl: 'https://picsum.photos/seed/liked-pepas/160/160',
  },
  {
    id: 'liked-4',
    title: 'Dime',
    artist: 'Marc Segui',
    duration: '3:14',
    coverUrl: 'https://picsum.photos/seed/liked-dime/160/160',
  },
  {
    id: 'liked-5',
    title: 'Ropa Cara',
    artist: 'Camilo',
    duration: '3:06',
    coverUrl: 'https://picsum.photos/seed/liked-ropa-cara/160/160',
  },
  {
    id: 'liked-6',
    title: 'Titi Me Pregunto',
    artist: 'Bad Bunny',
    duration: '4:03',
    coverUrl: 'https://picsum.photos/seed/liked-titi/160/160',
  },
];

export const listeningHistory: Song[] = [
  {
    id: 'hist-1',
    title: 'Pepas',
    artist: 'Farruko',
    duration: '4:47',
    playedAt: '2 min ago',
    coverUrl: 'https://picsum.photos/seed/history-pepas/160/160',
  },
  {
    id: 'hist-2',
    title: 'Ojitos Lindos',
    artist: 'Bad Bunny ft. Bomba Estereo',
    duration: '4:18',
    playedAt: '25 min ago',
    coverUrl: 'https://picsum.photos/seed/history-ojitos/160/160',
  },
  {
    id: 'hist-3',
    title: 'Me Porto Bonito',
    artist: 'Bad Bunny, Chencho',
    duration: '2:58',
    playedAt: '1 hr ago',
    coverUrl: 'https://picsum.photos/seed/history-meporto/160/160',
  },
  {
    id: 'hist-4',
    title: 'Titi Me Pregunto',
    artist: 'Bad Bunny',
    duration: '4:03',
    playedAt: '2 hr ago',
    coverUrl: 'https://picsum.photos/seed/history-titi/160/160',
  },
];

export const playlists: Playlist[] = [
  {
    id: 'playlist-1',
    title: 'Chill Vibes',
    trackCount: 14,
    coverUrl: 'https://picsum.photos/seed/playlist-chill-vibes/200/200',
  },
  {
    id: 'playlist-2',
    title: 'Workout Latin',
    trackCount: 22,
    coverUrl: 'https://picsum.photos/seed/playlist-workout-latin/200/200',
  },
];

export const vocabDecks: Deck[] = [
  { id: 'deck-1', title: 'Slang', languagePair: 'EN -> ES', dueToday: 12, total: 24, icon: 'bolt' },
  { id: 'deck-2', title: 'Beginner Phrases', languagePair: 'EN -> ES', dueToday: 28, total: 40, icon: 'chatbubble' },
  { id: 'deck-3', title: 'Verbs', languagePair: 'EN -> ES', dueToday: 18, total: 32, icon: 'book' },
];

export const flashcardsByDeckId: Record<string, FlashcardItem[]> = {
  'deck-1': [
    { id: 'slang-1', front: 'Que onda', back: "What's up?" },
    { id: 'slang-2', front: 'No manches', back: 'No way / You are kidding' },
    { id: 'slang-3', front: 'Esta brutal', back: 'That is awesome' },
    { id: 'slang-4', front: 'Me late', back: 'I am into it / I like it' },
    { id: 'slang-5', front: 'Ahorita', back: 'In a bit (timing depends on context)' },
    { id: 'slang-6', front: 'Tranqui', back: 'Relax / Chill' },
    { id: 'slang-7', front: 'Estar en la luna', back: 'To be daydreaming' },
    { id: 'slang-8', front: 'Que padre', back: 'How cool' },
  ],
  'deck-2': [
    { id: 'beg-1', front: 'Mucho gusto', back: 'Nice to meet you' },
    { id: 'beg-2', front: 'Como te llamas?', back: 'What is your name?' },
    { id: 'beg-3', front: 'Donde esta el bano?', back: 'Where is the bathroom?' },
    { id: 'beg-4', front: 'Me puedes ayudar?', back: 'Can you help me?' },
    { id: 'beg-5', front: 'No entiendo', back: 'I do not understand' },
    { id: 'beg-6', front: 'Cuanto cuesta?', back: 'How much does it cost?' },
    { id: 'beg-7', front: 'Hablas ingles?', back: 'Do you speak English?' },
    { id: 'beg-8', front: 'Nos vemos luego', back: 'See you later' },
  ],
  'deck-3': [
    { id: 'verb-1', front: 'ser', back: 'to be (permanent)' },
    { id: 'verb-2', front: 'estar', back: 'to be (temporary)' },
    { id: 'verb-3', front: 'tener', back: 'to have' },
    { id: 'verb-4', front: 'ir', back: 'to go' },
    { id: 'verb-5', front: 'hacer', back: 'to do / to make' },
    { id: 'verb-6', front: 'poder', back: 'can / to be able to' },
    { id: 'verb-7', front: 'querer', back: 'to want / to love' },
    { id: 'verb-8', front: 'decir', back: 'to say / to tell' },
  ],
};

export const flashcardMastery: MasteryStats = {
  totalCards: 96,
  masteredCards: 58,
  masteryPercent: 60,
};
