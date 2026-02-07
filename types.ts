
export interface LyricLine {
  time: number;
  text: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  lyrics?: LyricLine[];
}

export interface Playlist {
  id: string;
  title: string;
  cover: string;
  playCount: string;
  description?: string;
}

export interface BannerItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  type: string;
}
