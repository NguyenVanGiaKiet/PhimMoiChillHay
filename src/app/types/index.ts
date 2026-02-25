// Types cho ứng dụng OTT/Streaming

export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  description: string;
  poster: string;
  backdrop: string;
  trailer: string;
  videoUrl: string;
  duration: number; // phút
  releaseYear: number;
  rating: number; // 0-10
  genres: string[];
  country: string;
  director: string;
  cast: Actor[];
  tags: string[];
  type: 'movie' | 'series';
  totalEpisodes?: number;
  currentEpisode?: number;
  seasons?: Season[];
}

export interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

export interface Episode {
  episodeNumber: number;
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
}

export interface Actor {
  id: string;
  name: string;
  character: string;
  avatar: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface WatchHistory {
  movieId: string;
  watchedAt: string;
  progress: number; // 0-100
  episodeNumber?: number;
}

export interface Watchlist {
  movieId: string;
  addedAt: string;
}

export interface VideoQuality {
  label: string;
  url: string;
  resolution: string;
}

export interface Subtitle {
  label: string;
  language: string;
  url: string;
}

export interface SearchFilters {
  query: string;
  genres: string[];
  countries: string[];
  years: number[];
  rating: [number, number];
  type: 'all' | 'movie' | 'series';
}
