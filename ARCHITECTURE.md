# VieStream - OTT/Streaming Platform

## 📋 Tổng Quan

VieStream là một ứng dụng xem phim trực tuyến (OTT/Streaming) hiện đại, được thiết kế theo tiêu chuẩn thương mại với UI/UX chuyên nghiệp tương tự Netflix và VieON.

## 🎯 Tính Năng Chính

### 1. Trang Chủ (Home)
- Hero banner với phim nổi bật
- Các hàng phim theo danh mục: Hot, Mới nhất, Trending, Đề xuất
- Cuộn ngang mượt mà với animation
- Hover effects trên movie cards

### 2. Trang Chi Tiết Phim (Movie Detail)
- Thông tin đầy đủ: poster, backdrop, trailer, mô tả
- Đánh giá, thể loại, quốc gia, năm phát hành
- Danh sách diễn viên với avatar
- Danh sách tập phim (đối với series)
- Nút xem ngay, thêm vào danh sách

### 3. Trình Phát Video (Video Player)
- **Hỗ trợ HLS/m3u8** streaming
- **Quality selector**: Auto, 1080p, 720p, 480p, 360p
- **Subtitle selector**: Tắt, Tiếng Việt, English
- Controls đầy đủ: play/pause, seek, volume, fullscreen
- Progress bar với preview
- Tự động lưu tiến độ xem
- Tự động phát tập tiếp theo (đối với series)
- Controls tự động ẩn/hiện

### 4. Tìm Kiếm & Bộ Lọc (Search)
- Tìm kiếm realtime theo tên phim, đạo diễn
- **Bộ lọc nâng cao**:
  - Thể loại (Action, Romance, Thriller, Horror, Sci-Fi, etc.)
  - Quốc gia (Việt Nam, USA, Hàn Quốc, Nhật Bản, etc.)
  - Năm phát hành
  - Loại phim (Phim lẻ/Phim bộ)
  - Đánh giá tối thiểu
- Hiển thị số lượng kết quả
- Grid layout responsive

### 5. Đăng Nhập / Đăng Ký (Authentication)
- Form đăng nhập/đăng ký với validation
- Demo mode: chấp nhận bất kỳ email/password
- Lưu trữ user info trong localStorage
- Avatar tự động generate từ tên

### 6. Profile / Watchlist
- **Danh sách của tôi**: Các phim đã thêm vào watchlist
- **Lịch sử xem**: 
  - Các phim đã xem với progress bar
  - Timestamp xem lần cuối
  - Nút "Xem tiếp" dựa trên progress
  - Xóa từng item hoặc xóa toàn bộ lịch sử
- Thông tin user profile

## 🏗️ Kiến Trúc Ứng Dụng

### Tech Stack

**Frontend:**
- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Client-side routing (Data mode)
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **HLS.js** - Video streaming
- **Lucide React** - Icons
- **Vite** - Build tool

**State Management:**
- LocalStorage cho authentication
- LocalStorage cho watchlist và history
- React hooks cho local state

### Cấu Trúc Thư Mục

```
/src
├── app/
│   ├── components/
│   │   ├── Layout.tsx          # Main layout với navbar
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Hero.tsx            # Hero banner
│   │   ├── MovieCard.tsx       # Movie card với hover effects
│   │   ├── MovieRow.tsx        # Horizontal scrolling row
│   │   └── VideoPlayer.tsx     # HLS video player
│   ├── pages/
│   │   ├── Home.tsx            # Trang chủ
│   │   ├── MovieDetail.tsx     # Chi tiết phim
│   │   ├── Watch.tsx           # Xem phim
│   │   ├── Search.tsx          # Tìm kiếm & filter
│   │   ├── Profile.tsx         # Profile & watchlist
│   │   ├── Login.tsx           # Đăng nhập/đăng ký
│   │   └── NotFound.tsx        # 404 page
│   ├── data/
│   │   └── movies.ts           # Mock movie data
│   ├── lib/
│   │   └── storage.ts          # LocalStorage utilities
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── routes.ts               # React Router config
│   └── App.tsx                 # App entry point
└── styles/
    ├── index.css
    ├── tailwind.css
    ├── theme.css
    └── fonts.css
```

## 📊 Database Schema (Dự Kiến)

### Movies Collection
```typescript
{
  id: string;
  title: string;
  originalTitle: string;
  description: string;
  poster: string;              // URL
  backdrop: string;            // URL
  trailer: string;             // HLS URL
  videoUrl: string;            // HLS URL
  duration: number;            // minutes
  releaseYear: number;
  rating: number;              // 0-10
  genres: string[];
  country: string;
  director: string;
  cast: Actor[];
  tags: string[];              // hot, trending, new, recommended
  type: 'movie' | 'series';
  totalEpisodes?: number;      // for series
  seasons?: Season[];          // for series
}
```

### Users Collection
```typescript
{
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
  subscription?: {
    plan: 'free' | 'basic' | 'premium';
    expiresAt: string;
  }
}
```

### Watchlist Collection
```typescript
{
  userId: string;
  movieId: string;
  addedAt: string;
}
```

### Watch History Collection
```typescript
{
  userId: string;
  movieId: string;
  watchedAt: string;
  progress: number;            // 0-100
  episodeNumber?: number;      // for series
}
```

## 🔌 API Endpoints (Dự Kiến)

### Authentication
```
POST   /api/auth/register      # Đăng ký
POST   /api/auth/login         # Đăng nhập
POST   /api/auth/logout        # Đăng xuất
GET    /api/auth/me            # Lấy thông tin user
```

### Movies
```
GET    /api/movies             # Lấy danh sách phim (với pagination, filters)
GET    /api/movies/:id         # Lấy chi tiết phim
GET    /api/movies/search      # Tìm kiếm phim
GET    /api/movies/trending    # Phim trending
GET    /api/movies/hot         # Phim hot
GET    /api/movies/new         # Phim mới
```

### Watchlist
```
GET    /api/watchlist          # Lấy watchlist của user
POST   /api/watchlist/:movieId # Thêm vào watchlist
DELETE /api/watchlist/:movieId # Xóa khỏi watchlist
```

### Watch History
```
GET    /api/history            # Lấy lịch sử xem
POST   /api/history            # Cập nhật lịch sử xem
DELETE /api/history/:movieId   # Xóa khỏi lịch sử
DELETE /api/history            # Xóa toàn bộ lịch sử
```

### Video Streaming
```
GET    /api/stream/:movieId    # Lấy HLS manifest
GET    /api/stream/:movieId/qualities  # Lấy danh sách chất lượng
GET    /api/stream/:movieId/subtitles  # Lấy danh sách phụ đề
```

## 🎨 UI/UX Design System

### Colors
- **Primary**: Red (#DC2626) - Màu chủ đạo
- **Background**: Black (#0A0A0A) - Nền tối
- **Surface**: White/10 - Cards và panels
- **Text**: White/Gray gradient

### Typography
- Font chính: System fonts (Inter, SF Pro, etc.)
- Sizes: từ text-xs đến text-6xl
- Weights: Normal (400), Medium (500), Semibold (600), Bold (700)

### Spacing
- Padding: 4, 6, 8, 12, 16, 24, 32px
- Gap: 2, 3, 4, 6, 8px
- Margin: tuân theo Tailwind spacing scale

### Border Radius
- Small: 0.5rem (8px)
- Medium: 0.75rem (12px)
- Large: 1rem (16px)
- XL: 1.5rem (24px)

### Animations
- Duration: 0.3s cho hover, 0.6s cho page transitions
- Easing: ease-out cho smooth motion
- Hover effects: scale(1.05) cho cards
- Fade in/out cho overlays

## 🚀 User Flows

### Flow 1: Xem Phim
```
Home → Click Movie Card → Movie Detail → Click "Xem ngay" → Watch Page
```

### Flow 2: Tìm Kiếm & Filter
```
Navbar Search → Search Page → Apply Filters → Click Movie → Movie Detail
```

### Flow 3: Watchlist
```
Movie Card/Detail → Click "+" → Added to Watchlist → Profile → Watchlist Tab
```

### Flow 4: Continue Watching
```
Home/Profile → History → Click "Xem tiếp" → Watch Page (với progress)
```

### Flow 5: Series Watching
```
Movie Detail (Series) → Click Episode → Watch Page → Auto-play Next Episode
```

## 🔐 Security & Privacy

### Current Implementation (Demo)
- LocalStorage cho authentication (không an toàn cho production)
- Không có encryption
- Mock data

### Production Requirements
- JWT authentication với HTTP-only cookies
- Password hashing (bcrypt)
- HTTPS required
- Rate limiting
- CORS configuration
- Content encryption (DRM)
- User data privacy compliance

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Responsive Features
- Flexible grid layouts
- Collapsible navigation
- Touch-friendly controls
- Adaptive video player
- Mobile-optimized search

## ⚡ Performance Optimization

### Implemented
- Lazy loading images
- Code splitting với React Router
- Optimized animations (GPU acceleration)
- Debounced search
- Virtual scrolling friendly

### Recommendations
- CDN cho images và videos
- Image optimization (WebP, AVIF)
- Video adaptive bitrate streaming
- Service worker cho offline support
- Bundle size optimization

## 🔄 Scalability

### Backend Scalability
- MongoDB cho flexible schema
- Redis cho caching
- CDN cho static assets
- Load balancer
- Horizontal scaling

### Video Delivery
- HLS adaptive streaming
- Multiple CDN endpoints
- Edge caching
- Quality-based delivery
- Regional content optimization

## 📈 Analytics & Monitoring

### Metrics to Track
- User engagement (watch time, completion rate)
- Popular content
- Search patterns
- Error rates
- Performance metrics (load time, video buffering)

### Tools (Recommendations)
- Google Analytics / Mixpanel
- Sentry for error tracking
- Datadog for infrastructure
- New Relic for APM

## 🔮 Future Enhancements

### Phase 2
- [ ] Social features (ratings, reviews, comments)
- [ ] User profiles with avatars
- [ ] Personalized recommendations (ML-based)
- [ ] Multi-device sync
- [ ] Download for offline viewing

### Phase 3
- [ ] Live streaming support
- [ ] Multiple audio tracks
- [ ] Advanced parental controls
- [ ] Subscription tiers
- [ ] Payment integration

### Phase 4
- [ ] Mobile apps (React Native)
- [ ] Smart TV apps
- [ ] Chromecast support
- [ ] Watch parties
- [ ] Admin dashboard

## 🛠️ Development

### Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Environment Variables (Production)
```
VITE_API_URL=https://api.viestream.com
VITE_CDN_URL=https://cdn.viestream.com
VITE_STREAM_URL=https://stream.viestream.com
```

## 📝 Notes

- Đây là demo version sử dụng localStorage và mock data
- Production app cần backend API thực sự và database
- Video URLs hiện tại là test streams từ Mux
- Cần license DRM cho nội dung bản quyền
- Tuân thủ luật bản quyền và sở hữu trí tuệ

---

**Built with ❤️ for VieStream OTT Platform**
