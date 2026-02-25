import { User, WatchHistory, Watchlist } from '../types';

// Authentication utilities sử dụng localStorage
// Trong production, sẽ thay thế bằng JWT và backend authentication

const AUTH_KEY = 'ott_auth_user';
const WATCHLIST_KEY = 'ott_watchlist';
const HISTORY_KEY = 'ott_history';

export const authService = {
  // Lấy user hiện tại
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(AUTH_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Đăng nhập
  login(email: string, password: string): { success: boolean; user?: User; error?: string } {
    // Mock login - trong production sẽ call API
    if (!email || !password) {
      return { success: false, error: 'Email và mật khẩu không được để trống' };
    }

    // Tạo mock user
    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  // Đăng ký
  register(email: string, password: string, name: string): { success: boolean; user?: User; error?: string } {
    // Mock register - trong production sẽ call API
    if (!email || !password || !name) {
      return { success: false, error: 'Vui lòng điền đầy đủ thông tin' };
    }

    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  // Đăng xuất
  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};

export const watchlistService = {
  // Lấy danh sách watchlist
  getWatchlist(): Watchlist[] {
    const data = localStorage.getItem(WATCHLIST_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  // Thêm vào watchlist
  addToWatchlist(movieId: string): void {
    const watchlist = this.getWatchlist();
    const exists = watchlist.some((item) => item.movieId === movieId);
    if (!exists) {
      watchlist.push({
        movieId,
        addedAt: new Date().toISOString(),
      });
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    }
  },

  // Xóa khỏi watchlist
  removeFromWatchlist(movieId: string): void {
    const watchlist = this.getWatchlist();
    const filtered = watchlist.filter((item) => item.movieId !== movieId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
  },

  // Kiểm tra có trong watchlist không
  isInWatchlist(movieId: string): boolean {
    const watchlist = this.getWatchlist();
    return watchlist.some((item) => item.movieId === movieId);
  },
};

export const historyService = {
  // Lấy lịch sử xem
  getHistory(): WatchHistory[] {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  // Thêm/cập nhật lịch sử xem
  addToHistory(movieId: string, progress: number, episodeNumber?: number): void {
    const history = this.getHistory();
    const existingIndex = history.findIndex((item) => item.movieId === movieId);

    if (existingIndex >= 0) {
      // Cập nhật existing
      history[existingIndex] = {
        movieId,
        watchedAt: new Date().toISOString(),
        progress,
        episodeNumber,
      };
    } else {
      // Thêm mới
      history.unshift({
        movieId,
        watchedAt: new Date().toISOString(),
        progress,
        episodeNumber,
      });
    }

    // Giới hạn 50 items
    if (history.length > 50) {
      history.splice(50);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  },

  // Lấy progress của một phim
  getProgress(movieId: string): WatchHistory | undefined {
    const history = this.getHistory();
    return history.find((item) => item.movieId === movieId);
  },

  // Xóa khỏi lịch sử
  removeFromHistory(movieId: string): void {
    const history = this.getHistory();
    const filtered = history.filter((item) => item.movieId !== movieId);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  },

  // Xóa toàn bộ lịch sử
  clearHistory(): void {
    localStorage.removeItem(HISTORY_KEY);
  },
};
