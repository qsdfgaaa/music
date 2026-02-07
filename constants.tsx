
import { Song, Playlist, BannerItem, LyricLine } from './types';

export interface ExtendedSong extends Song {
  isVip?: boolean;
  isSq?: boolean;
  isHiRes?: boolean;
  hasVideo?: boolean;
  playCount?: string;
  status?: 'published' | 'reviewing' | 'draft';
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  fans: string;
}

const MOCK_LYRICS: LyricLine[] = [
  { time: 0, text: "作词：海来阿木/吴欢" },
  { time: 2, text: "作曲：海来阿木/吴欢" },
  { time: 4, text: "演唱：海来阿木" },
  { time: 8, text: "这一生 这一路" },
  { time: 12, text: "走过平湖 走过风雨" },
  { time: 16, text: "我回头望去" },
  { time: 20, text: "还是那一抹绿" },
];

export const RECOMMENDED_SONGS: ExtendedSong[] = [
  { id: '14', title: '离开我的依赖', artist: '王艳薇', album: '离开我的依赖', duration: '03:53', cover: 'https://picsum.photos/seed/s14/100/100', isVip: true, isHiRes: true, hasVideo: true, lyrics: MOCK_LYRICS },
  { id: '15', title: '失眠', artist: 'Suki刘舒妤', album: 'Ladies Night', duration: '03:31', cover: 'https://picsum.photos/seed/s15/100/100', isVip: true, lyrics: MOCK_LYRICS },
  { id: '16', title: '小半', artist: '陈粒', album: '小梦大半', duration: '04:57', cover: 'https://picsum.photos/seed/s16/100/100', isHiRes: true, hasVideo: true, lyrics: MOCK_LYRICS },
  { id: '17', title: '唯一', artist: 'G.E.M. 邓紫棋', album: 'T.I.M.E.', duration: '04:13', cover: 'https://picsum.photos/seed/s17/100/100', isVip: true, isHiRes: true, hasVideo: true, lyrics: MOCK_LYRICS },
  { id: '18', title: '雨爱', artist: '杨丞琳', album: '雨爱', duration: '04:20', cover: 'https://picsum.photos/seed/s18/100/100', isVip: true, isHiRes: true, hasVideo: true, lyrics: MOCK_LYRICS },
  { id: '19', title: '野马尘埃 Floating Mist', artist: '阿兰', album: '霄灯映明月', duration: '02:53', cover: 'https://picsum.photos/seed/s19/100/100', isSq: true, lyrics: MOCK_LYRICS },
];

export const USER_CREATIONS: ExtendedSong[] = [
  { id: 'u1', title: '永恒的夏日', artist: '陈子墨 (Alex)', album: 'Demo #1', duration: '04:12', cover: 'https://picsum.photos/seed/u1/400/400', playCount: '1.2w', status: 'published' },
  { id: 'u2', title: '二进制忧郁', artist: '陈子墨 (Alex)', album: 'Code & Soul', duration: '03:45', cover: 'https://picsum.photos/seed/u2/400/400', playCount: '8.5k', status: 'published' },
  { id: 'u3', title: '凌晨三点的咖啡', artist: '陈子墨 (Alex)', album: '深夜食堂', duration: '05:20', cover: 'https://picsum.photos/seed/u3/400/400', playCount: '0', status: 'reviewing' },
];

export const MOCK_RANKINGS: Playlist[] = [
  { id: 'r1', title: '飙升榜', cover: 'https://picsum.photos/seed/r1/400/400', color: 'from-orange-500/20', isRanking: true, playCount: '99w+' },
  { id: 'r2', title: '热歌榜', cover: 'https://picsum.photos/seed/r2/400/400', color: 'from-red-500/20', isRanking: true, playCount: '150w+' },
  { id: 'r3', title: '新歌榜', cover: 'https://picsum.photos/seed/r3/400/400', color: 'from-emerald-500/20', isRanking: true, playCount: '80w+' },
  { id: 'r4', title: '流行指数', cover: 'https://picsum.photos/seed/r4/400/400', color: 'from-blue-500/20', isRanking: true, playCount: '120w+' },
];

export const MOCK_ARTISTS: Artist[] = [
  { id: 'a1', name: '周杰伦', avatar: 'https://picsum.photos/seed/a1/300/300', fans: '3.2亿' },
  { id: 'a2', name: '陈奕迅', avatar: 'https://picsum.photos/seed/a2/300/300', fans: '1.5亿' },
  { id: 'a3', name: '邓紫棋', avatar: 'https://picsum.photos/seed/a3/300/300', fans: '9800万' },
  { id: 'a4', name: '毛不易', avatar: 'https://picsum.photos/seed/a4/300/300', fans: '5600万' },
  { id: 'a5', name: '薛之谦', avatar: 'https://picsum.photos/seed/a5/300/300', fans: '8900万' },
  { id: 'a6', name: '李荣浩', avatar: 'https://picsum.photos/seed/a6/300/300', fans: '4200万' },
];

export const MOCK_MY_PLAYLISTS: Playlist[] = [
  { id: 'mp1', title: 'travel', cover: 'https://picsum.photos/seed/mp1/200/200', playCount: '12' },
  { id: 'mp2', title: 'coding vibe', cover: 'https://picsum.photos/seed/mp2/200/200', playCount: '156' },
  { id: 'mp3', title: '深夜EMO', cover: 'https://picsum.photos/seed/mp3/200/200', playCount: '89' },
];

export interface ExtendedBannerItem extends BannerItem {
  songId?: string;
}

export const MOCK_BANNERS: ExtendedBannerItem[] = [
  { id: 'b1', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200', title: '霓虹美梦', subtitle: '属于深夜的赛博朋克节奏', type: '数字专辑', songId: '14' },
  { id: 'b2', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200', title: '夏日流动', subtitle: '清凉屋顶派对必备 House', type: '独家内容', songId: '16' },
  { id: 'b3', image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=1200', title: '原声灵魂', subtitle: '触动内心的纯净旋律', type: '新歌首发', songId: '17' }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 'p1', title: '2024 年度全球热歌', cover: 'https://picsum.photos/seed/p1/300/300', playCount: '14.2亿', description: "汇聚全年度全球范围内听歌量最高的 50 首单曲。" },
  { id: 'p2', title: '深夜爵士小馆', cover: 'https://picsum.photos/seed/p2/300/300', playCount: '2.5亿', description: "萨克斯风与钢琴的缠绵，给每一个失眠之夜一点慰藉。" },
  { id: 'p3', title: '专注工作：阿尔法波', cover: 'https://picsum.photos/seed/p3/300/300', playCount: '21.0亿', description: "白噪音与阿尔法波的结合，让你的工作效率翻倍。" },
  { id: 'p4', title: '燃脂健身电音', cover: 'https://picsum.photos/seed/p4/300/300', playCount: '8.3亿', description: "128BPM 以上的强劲节奏，助你突破极限。" },
  { id: 'p5', title: '慵懒午后时光', cover: 'https://picsum.photos/seed/p5/300/300', playCount: '2.3亿', description: "一杯咖啡，一本书，和一段恰到好处的背景音乐。" },
  { id: 'p6', title: '沉浸式代码模式', cover: 'https://picsum.photos/seed/p6/300/300', playCount: '9.3亿', description: "专为程序员打造，滤掉喧嚣，只剩逻辑与旋律。" },
];

export const CURRENT_SONG: Song = {
  id: 's1',
  title: '嘉禾望岗',
  artist: '海来阿木',
  album: '嘉禾望岗',
  cover: 'https://picsum.photos/seed/cover/400/400',
  duration: '04:03',
  lyrics: MOCK_LYRICS
};
