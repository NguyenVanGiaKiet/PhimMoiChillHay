import { Movie } from '../types';

// Mock data cho ứng dụng OTT/Streaming
// Trong production, data này sẽ được lấy từ API

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Bóng ma Anh Quốc (Phần 1)',
    originalTitle: 'Peaky Blinders (Season 1)',
    description: 'Một băng đảng khét tiếng xuất hiện ở Birmingham, Anh Quốc năm 1919. Cầm đầu băng là Tommy Shelby, tên trùm tội phạm khét tiếng muốn nổi lên bằng mọi giá.',
    poster: 'https://phim.nguonc.com/public/images/Film/bong-ma-anh-quoc-phan-1-thumb.jpg',
    backdrop: 'https://file.hstatic.net/1000328498/article/4_0deecb5b5d614605a72dc55475567989.jpg',
    trailer: 'https://embed17.streamc.xyz/embed.php?hash=f2bc2d69345b418667eba92560adbe39',
    videoUrl: 'https://embed17.streamc.xyz/embed.php?hash=f2bc2d69345b418667eba92560adbe39',
    duration: 128,
    releaseYear: 2013,
    rating: 8.5,
    genres: ['Thriller', 'Mystery', 'Drama'],
    country: 'Anh Quốc',
    director: 'Đang cập nhật',
    cast: [
      {
        id: 'a1',
        name: 'Cillian Murphy',
        character: 'Thomas Shelby',
        avatar: 'data:image/jpeg;base64,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',
      },
      {
        id: 'a2',
        name: 'Paul Anderson',
        character: 'Arthur Shelby',
        avatar: 'data:image/jpeg;base64,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',
      },
    ],
    tags: ['hot', 'trending', 'new'],
    type: 'series',
    totalEpisodes: 6,
    currentEpisode: 1,
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            episodeNumber: 1,
            title: 'Tập 1: Tập đầu tiên',
            description: 'Tommy Shelby và băng đảng Peaky Blinders trở lại sau chiến tranh.',
            duration: 60,
            thumbnail: 'https://phim.nguonc.com/public/images/Film/bong-ma-anh-quoc-phan-1-thumb.jpg',
            videoUrl: 'https://embed17.streamc.xyz/embed.php?hash=f2bc2d69345b418667eba92560adbe39',
          },
          {
            episodeNumber: 2,
            title: 'Tập 2: Sự trỗi dậy',
            description: 'Băng đảng mở rộng lãnh thổ và đối đầu với đối thủ.',
            duration: 60,
            thumbnail: 'https://phim.nguonc.com/public/images/Film/bong-ma-anh-quoc-phan-1-thumb.jpg',
            videoUrl: 'https://embed11.streamc.xyz/embed.php?hash=6c4c700b27a9f1974b904c347aea6317',
          },
          {
            episodeNumber: 3,
            title: 'Tập 3: Âm mưu',
            description: 'Những âm mưu đen tối bắt đầu hé lộ.',
            duration: 60,
            thumbnail: 'https://phim.nguonc.com/public/images/Film/bong-ma-anh-quoc-phan-1-thumb.jpg',
            videoUrl: 'https://embed12.streamc.xyz/embed.php?hash=0288cf3cd47fd80b20b86fa7f65a3c57',
          },
          {
            episodeNumber: 4,
            title: 'Tập 4: Đối đầu',
            description: 'Cuộc chiến giữa các băng đảng ngày càng gay gắt.',
            duration: 60,
            thumbnail: 'https://phim.nguonc.com/public/images/Film/bong-ma-anh-quoc-phan-1-thumb.jpg',
            videoUrl: 'https://embed12.streamc.xyz/embed.php?hash=e239a2a50d174b8399a76418d2f117fb',
          },
          {
            episodeNumber: 5,
            title: 'Tập 5: Sự phản bội',
            description: 'Những kẻ phản bội xuất hiện trong nội bộ.',
            duration: 60,
            thumbnail: 'https://phim.nguonc.com/public/images/Film/bong-ma-anh-quoc-phan-1-thumb.jpg',
            videoUrl: 'https://embed13.streamc.xyz/embed.php?hash=60cd58401b53f5fb1932a00feecfb066',
          },
          {
            episodeNumber: 6,
            title: 'Tập 6: Kết thúc phần 1',
            description: 'Màn kết thúc đầy kịch tính của phần đầu.',
            duration: 60,
            thumbnail: 'https://phim.nguonc.com/public/images/Film/bong-ma-anh-quoc-phan-1-thumb.jpg',
            videoUrl: 'https://embed13.streamc.xyz/embed.php?hash=b5585306a15d6d05e5a5e8cd26f90583',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Nhiệm Vụ Bất Khả Thi',
    originalTitle: 'Impossible Mission',
    description: 'Một đội đặc nhiệm ưu tú được giao nhiệm vụ ngăn chặn một âm mưu khủng bố đe dọa hòa bình thế giới. Thời gian đang cạn dần.',
    poster: 'https://images.unsplash.com/photo-1642662495649-90bfdf89f2cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHNjZW5lJTIwZXhwbG9zaW9ufGVufDF8fHx8MTc3MTg5OTI3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    backdrop: 'https://images.unsplash.com/photo-1642662495649-90bfdf89f2cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHNjZW5lJTIwZXhwbG9zaW9ufGVufDF8fHx8MTc3MTg5OTI3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 145,
    releaseYear: 2024,
    rating: 9.2,
    genres: ['Action', 'Thriller', 'Adventure'],
    country: 'USA',
    director: 'Michael Bay',
    cast: [
      {
        id: 'a3',
        name: 'Nguyễn Thanh Long',
        character: 'Đội trưởng Long',
        avatar: 'https://images.unsplash.com/photo-1749003659562-a1beba85eee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBhY3RvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk4NzM5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
    tags: ['hot', 'trending'],
    type: 'movie',
  },
  {
    id: '3',
    title: 'Tình Yêu Hoàng Hôn',
    originalTitle: 'Sunset Romance',
    description: 'Một câu chuyện tình lãng mạn giữa hai người lạ gặp nhau trong một chuyến du lịch định mệnh. Tình yêu nở rộ dưới ánh hoàng hôn.',
    poster: 'https://images.unsplash.com/photo-1658851866325-49fb8b7fbcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldHxlbnwxfHx8fDE3NzE5ODM0Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    backdrop: 'https://images.unsplash.com/photo-1658851866325-49fb8b7fbcb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldHxlbnwxfHx8fDE3NzE5ODM0Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 112,
    releaseYear: 2024,
    rating: 7.8,
    genres: ['Romance', 'Drama'],
    country: 'Hàn Quốc',
    director: 'Park Chan-wook',
    cast: [
      {
        id: 'a2',
        name: 'Lê Thu Hà',
        character: 'Hà',
        avatar: 'https://images.unsplash.com/photo-1697510364485-e900c2fe7524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMGFjdHJlc3MlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE5ODczOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        id: 'a1',
        name: 'Trần Minh Hoàng',
        character: 'Hoàng',
        avatar: 'https://images.unsplash.com/photo-1749003659562-a1beba85eee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBhY3RvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk4NzM5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
    tags: ['new', 'recommended'],
    type: 'movie',
  },
  {
    id: '4',
    title: 'Khu Rừng Kinh Hoàng',
    originalTitle: 'The Haunted Forest',
    description: 'Một nhóm thanh niên đi cắm trại trong rừng sâu và phát hiện ra những bí ẩn kinh hoàng ẩn giấu trong bóng tối.',
    poster: 'https://images.unsplash.com/photo-1723913961620-5d03606522f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzY2FyeSUyMGRhcmslMjBmb3Jlc3R8ZW58MXx8fHwxNzcxOTg3Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    backdrop: 'https://images.unsplash.com/photo-1723913961620-5d03606522f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzY2FyeSUyMGRhcmslMjBmb3Jlc3R8ZW58MXx8fHwxNzcxOTg3Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 95,
    releaseYear: 2024,
    rating: 7.2,
    genres: ['Horror', 'Thriller'],
    country: 'Nhật Bản',
    director: 'Takashi Shimizu',
    cast: [],
    tags: ['new'],
    type: 'movie',
  },
  {
    id: '5',
    title: 'Thành Phố Tương Lai',
    originalTitle: 'Future City',
    description: 'Năm 2099, nhân loại sống trong các thành phố công nghệ cao. Một hacker trẻ phát hiện bí mật có thể thay đổi vận mệnh loài người.',
    poster: 'https://images.unsplash.com/photo-1715614176939-f5c46ae99d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2lmaSUyMGZ1dHVyaXN0aWMlMjBjaXR5JTIwbmVvbnxlbnwxfHx8fDE3NzE5ODczODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    backdrop: 'https://images.unsplash.com/photo-1715614176939-f5c46ae99d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2lmaSUyMGZ1dHVyaXN0aWMlMjBjaXR5JTIwbmVvbnxlbnwxfHx8fDE3NzE5ODczODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 138,
    releaseYear: 2024,
    rating: 8.9,
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    country: 'USA',
    director: 'Denis Villeneuve',
    cast: [],
    tags: ['hot', 'trending', 'recommended'],
    type: 'movie',
  },
  {
    id: '6',
    title: 'Hành Trình Vui Nhộn',
    originalTitle: 'Comedy Journey',
    description: 'Ba người bạn thân lên đường du lịch xuyên quốc gia và gặp phải vô số tình huống hài hước, ngớ ngẩn.',
    poster: 'https://images.unsplash.com/photo-1604674725989-52c312835516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBsYXVnaGluZyUyMGhhcHB5JTIwcGVvcGxlfGVufDF8fHx8MTc3MTk4NzM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    backdrop: 'https://images.unsplash.com/photo-1604674725989-52c312835516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBsYXVnaGluZyUyMGhhcHB5JTIwcGVvcGxlfGVufDF8fHx8MTc3MTk4NzM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 105,
    releaseYear: 2024,
    rating: 7.5,
    genres: ['Comedy', 'Adventure'],
    country: 'Việt Nam',
    director: 'Trấn Thành',
    cast: [],
    tags: ['recommended'],
    type: 'movie',
  },
  {
    id: '7',
    title: 'Nỗi Đau Gia Đình',
    originalTitle: 'Family Drama',
    description: 'Một gia đình phải đối mặt với những thử thách khó khăn khi bí mật về quá khứ được hé lộ. Tình yêu thương có đủ mạnh để hàn gắn?',
    poster: 'https://images.unsplash.com/photo-1631632286519-cb83e10e3d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYSUyMGludGVuc2UlMjBlbW90aW9uYWx8ZW58MXx8fHwxNzcxOTg3MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    backdrop: 'https://images.unsplash.com/photo-1631632286519-cb83e10e3d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYSUyMGludGVuc2UlMjBlbW90aW9uYWx8ZW58MXx8fHwxNzcxOTg3MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 125,
    releaseYear: 2023,
    rating: 8.3,
    genres: ['Drama', 'Family'],
    country: 'Việt Nam',
    director: 'Nguyễn Quang Dũng',
    cast: [],
    tags: [],
    type: 'movie',
  },
  {
    id: '8',
    title: 'Hành Trình Vượt Núi',
    originalTitle: 'Mountain Quest',
    description: 'Một nhóm leo núi chinh phục đỉnh núi nguy hiểm nhất thế giới. Họ phải đối mặt với thiên nhiên khắc nghiệt và thử thách về tinh thần.',
    poster: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzE5NDM5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    backdrop: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzE5NDM5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 118,
    releaseYear: 2023,
    rating: 7.9,
    genres: ['Adventure', 'Documentary'],
    country: 'Nepal',
    director: 'Jimmy Chin',
    cast: [],
    tags: [],
    type: 'movie',
  },
  {
    id: '9',
    title: 'Vương Quốc Phép Thuật',
    originalTitle: 'Magic Kingdom',
    description: 'Trong một thế giới đầy phép thuật, một phù thủy trẻ phải học cách sử dụng sức mạnh của mình để cứu vương quốc khỏi thế lực đen tối.',
    poster: 'https://images.unsplash.com/photo-1763957047074-b47c2c76a320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbWFnaWNhbCUyMGZvcmVzdHxlbnwxfHx8fDE3NzE5NjU4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    backdrop: 'https://images.unsplash.com/photo-1763957047074-b47c2c76a320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbWFnaWNhbCUyMGZvcmVzdHxlbnwxfHx8fDE3NzE5NjU4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 142,
    releaseYear: 2023,
    rating: 8.6,
    genres: ['Fantasy', 'Adventure', 'Action'],
    country: 'UK',
    director: 'Peter Jackson',
    cast: [],
    tags: ['recommended'],
    type: 'movie',
  },
  {
    id: '10',
    title: 'Gia Đình Hạnh Phúc',
    originalTitle: 'Happy Family',
    description: 'Một series hài hước về cuộc sống thường nhật của một gia đình Việt Nam hiện đại với đủ các tình huống dở khóc dở cười.',
    poster: 'https://images.unsplash.com/photo-1604674725989-52c312835516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBsYXVnaGluZyUyMGhhcHB5JTIwcGVvcGxlfGVufDF8fHx8MTc3MTk4NzM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    backdrop: 'https://images.unsplash.com/photo-1604674725989-52c312835516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBsYXVnaGluZyUyMGhhcHB5JTIwcGVvcGxlfGVufDF8fHx8MTc3MTk4NzM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 45,
    releaseYear: 2024,
    rating: 7.6,
    genres: ['Comedy', 'Drama', 'Family'],
    country: 'Việt Nam',
    director: 'Vũ Ngọc Đãng',
    cast: [],
    tags: ['hot', 'new'],
    type: 'series',
    totalEpisodes: 30,
    currentEpisode: 15,
    seasons: [
      {
        seasonNumber: 1,
        episodes: Array.from({ length: 30 }, (_, i) => ({
          episodeNumber: i + 1,
          title: `Tập ${i + 1}`,
          description: `Tập ${i + 1} của Gia Đình Hạnh Phúc`,
          duration: 45,
          thumbnail: 'https://images.unsplash.com/photo-1604674725989-52c312835516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBsYXVnaGluZyUyMGhhcHB5JTIwcGVvcGxlfGVufDF8fHx8MTc3MTk4NzM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
          videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        })),
      },
    ],
  },
];

// Utility functions
export const getMovieById = (id: string): Movie | undefined => {
  return mockMovies.find((movie) => movie.id === id);
};

export const getMoviesByTag = (tag: string): Movie[] => {
  return mockMovies.filter((movie) => movie.tags.includes(tag));
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  return mockMovies.filter((movie) => movie.genres.includes(genre));
};

export const searchMovies = (query: string): Movie[] => {
  const lowerQuery = query.toLowerCase();
  return mockMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.originalTitle.toLowerCase().includes(lowerQuery) ||
      movie.description.toLowerCase().includes(lowerQuery)
  );
};

export const getAllGenres = (): string[] => {
  const genres = new Set<string>();
  mockMovies.forEach((movie) => {
    movie.genres.forEach((genre) => genres.add(genre));
  });
  return Array.from(genres).sort();
};

export const getAllCountries = (): string[] => {
  const countries = new Set<string>();
  mockMovies.forEach((movie) => countries.add(movie.country));
  return Array.from(countries).sort();
};

export const getAllYears = (): number[] => {
  const years = new Set<number>();
  mockMovies.forEach((movie) => years.add(movie.releaseYear));
  return Array.from(years).sort((a, b) => b - a);
};
