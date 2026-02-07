
import { Song, Playlist, BannerItem, LyricLine } from './types';

export interface ExtendedSong extends Song {
  isVip?: boolean;
  isSq?: boolean;
  isHiRes?: boolean;
  hasVideo?: boolean;
}

const MOCK_LYRICS: LyricLine[] = [
  { time: 0, text: "作词：海来阿木/吴欢" },
  { time: 2, text: "作曲：海来阿木/吴欢" },
  { time: 4, text: "演唱：海来阿木" },
  { time: 8, text: "这一生 这一路" },
  { time: 12, text: "走过平湖 走过风雨" },
  { time: 16, text: "我回头望去" },
  { time: 20, text: "还是那一抹绿" },
  { time: 24, text: "嘉禾望岗的云" },
  { time: 28, text: "吹散了往昔的愁绪" },
  { time: 32, text: "如果你能听见" },
  { time: 36, text: "我依然在这里等你" },
  { time: 40, text: "哪怕岁月 模糊了你的背影" },
  { time: 45, text: "弦乐录音：辉音国际爱乐乐团" },
  { time: 50, text: "混音/母带：梁冬盛" },
];

export const RECOMMENDED_SONGS: ExtendedSong[] = [
  { id: '14', title: '离开我的依赖', artist: '王艳薇', album: '离开我的依赖', duration: '03:53', cover: 'https://picsum.photos/seed/s14/100/100', isVip: true, isHiRes: true, hasVideo: true, lyrics: MOCK_LYRICS },
  { id: '15', title: '失眠', artist: 'Suki刘舒妤', album: 'Ladies Night', duration: '03:31', cover: 'https://picsum.photos/seed/s15/100/100', isVip: true, lyrics: MOCK_LYRICS },
  { id: '16', title: '小半', artist: '陈粒', album: '小梦大半', duration: '04:57', cover: 'https://picsum.photos/seed/s16/100/100', isHiRes: true, hasVideo: true, lyrics: MOCK_LYRICS },
  { id: '17', title: '唯一', artist: 'G.E.M. 邓紫棋', album: 'T.I.M.E.', duration: '04:13', cover: 'https://picsum.photos/seed/s17/100/100', isVip: true, isHiRes: true, hasVideo: true, lyrics: MOCK_LYRICS },
  { id: '18', title: '雨爱', artist: '杨丞琳', album: '雨爱', duration: '04:20', cover: 'https://picsum.photos/seed/s18/100/100', isVip: true, isHiRes: true, hasVideo: true, lyrics: MOCK_LYRICS },
  { id: '19', title: '野马尘埃 Floating Mist', artist: '阿兰', album: '霄灯映明月', duration: '02:53', cover: 'https://picsum.photos/seed/s19/100/100', isSq: true, lyrics: MOCK_LYRICS },
  { id: '20', title: 'Dear D', artist: '项睿娴', album: 'Dear D', duration: '03:16', cover: 'https://picsum.photos/seed/s20/100/100', isVip: true, isHiRes: true, lyrics: MOCK_LYRICS },
  { id: '21', title: '爱错', artist: '王力宏', album: '心中的日月', duration: '03:58', cover: 'https://picsum.photos/seed/s21/100/100', isVip: true, isHiRes: true, hasVideo: true, lyrics: MOCK_LYRICS },
];

export interface ExtendedBannerItem extends BannerItem {
  songId?: string; // 关联的歌曲ID
}

export const MOCK_BANNERS: ExtendedBannerItem[] = [
  {
    id: 'b1',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200',
    title: '霓虹美梦',
    subtitle: '属于深夜的赛博朋克节奏',
    type: '数字专辑',
    songId: '14' // 关联歌曲库中的 ID
  },
  {
    id: 'b2',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200',
    title: '夏日流动',
    subtitle: '清凉屋顶派对必备 House',
    type: '独家内容',
    songId: '16'
  },
  {
    id: 'b3',
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=1200',
    title: '原声灵魂',
    subtitle: '触动内心的纯净旋律',
    type: '新歌首发',
    songId: '17'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 'p1', title: '2024 年度全球热歌', cover: 'https://picsum.photos/seed/p1/300/300', playCount: '14.2亿' },
  { id: 'p2', title: '深夜爵士小馆', cover: 'https://picsum.photos/seed/p2/300/300', playCount: '2.5亿' },
  { id: 'p3', title: '专注工作：阿尔法波', cover: 'https://picsum.photos/seed/p3/300/300', playCount: '21.0亿' },
  { id: 'p4', title: '燃脂健身电音', cover: 'https://picsum.photos/seed/p4/300/300', playCount: '8.3亿' },
  { id: 'p5', title: '慵懒午后时光', cover: 'https://picsum.photos/seed/p5/300/300', playCount: '2.3亿' },
  { id: 'p6', title: '沉浸式代码模式', cover: 'https://picsum.photos/seed/p6/300/300', playCount: '9.3亿' },
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
