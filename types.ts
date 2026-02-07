
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
  isVip?: boolean;
  isHiRes?: boolean;
  hasVideo?: boolean;
  lyrics?: LyricLine[];
}

export interface Playlist {
  id: string;
  title: string;
  cover: string;
  playCount: string;
  description?: string;
  isRanking?: boolean;
  color?: string;
}

export interface BannerItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  type: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  vipLevel?: number;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  time: string;
  location: string;
  likes: number;
  replies?: Comment[];
}
