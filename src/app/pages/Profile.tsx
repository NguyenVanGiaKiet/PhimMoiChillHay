import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, List, Clock, Trash2, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { authService, watchlistService, historyService } from '../lib/storage';
import { getMovieById } from '../data/movies';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';

export default function Profile() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [activeTab, setActiveTab] = useState<'watchlist' | 'history'>('watchlist');

  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [historyMovies, setHistoryMovies] = useState<
    Array<{ movie: Movie; progress: number; watchedAt: string }>
  >([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load watchlist
    const watchlist = watchlistService.getWatchlist();
    const movies = watchlist
      .map((item) => getMovieById(item.movieId))
      .filter((m): m is Movie => m !== undefined);
    setWatchlistMovies(movies);

    // Load history
    const history = historyService.getHistory();
    const historyWithMovies = history
      .map((item) => {
        const movie = getMovieById(item.movieId);
        return movie ? { movie, progress: item.progress, watchedAt: item.watchedAt } : null;
      })
      .filter((item): item is { movie: Movie; progress: number; watchedAt: string } => item !== null);
    setHistoryMovies(historyWithMovies);
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleRemoveFromWatchlist = (movieId: string) => {
    watchlistService.removeFromWatchlist(movieId);
    setWatchlistMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  const handleRemoveFromHistory = (movieId: string) => {
    historyService.removeFromHistory(movieId);
    setHistoryMovies((prev) => prev.filter((item) => item.movie.id !== movieId));
  };

  const handleClearHistory = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử xem?')) {
      historyService.clearHistory();
      setHistoryMovies([]);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          className="flex items-center gap-6 mb-8 p-6 bg-gradient-to-r from-red-900/20 to-transparent border border-white/10 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full border-2 border-red-500"
          />
          <div>
            <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Thành viên từ {new Date(user.createdAt).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'watchlist'
                ? 'text-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-5 h-5" />
            Danh sách của tôi
            {activeTab === 'watchlist' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'history'
                ? 'text-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Clock className="w-5 h-5" />
            Lịch sử xem
            {activeTab === 'history' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
              />
            )}
          </button>
        </div>

        {/* Watchlist Tab */}
        {activeTab === 'watchlist' && (
          <motion.div
            key="watchlist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {watchlistMovies.length} phim trong danh sách
              </h2>
            </div>

            {watchlistMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {watchlistMovies.map((movie) => (
                  <div key={movie.id} className="relative group">
                    <MovieCard movie={movie} />
                    <button
                      onClick={() => handleRemoveFromWatchlist(movie.id)}
                      className="absolute top-2 right-2 p-2 bg-black/80 hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                      title="Xóa khỏi danh sách"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <List className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Danh sách trống</h3>
                <p className="text-gray-400 mb-6">
                  Thêm phim vào danh sách để xem sau
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                >
                  Khám phá phim
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {historyMovies.length} phim đã xem
              </h2>
              {historyMovies.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa tất cả
                </button>
              )}
            </div>

            {historyMovies.length > 0 ? (
              <div className="space-y-4">
                {historyMovies.map((item) => (
                  <motion.div
                    key={item.movie.id}
                    className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {/* Thumbnail */}
                    <div className="flex-none w-32 sm:w-40 aspect-video rounded-lg overflow-hidden bg-gray-900">
                      <img
                        src={item.movie.backdrop}
                        alt={item.movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 truncate">
                        {item.movie.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Xem lần cuối: {new Date(item.watchedAt).toLocaleString('vi-VN')}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-400">Tiến độ</span>
                          <span>{Math.round(item.progress)}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/watch/${item.movie.id}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          {item.progress < 90 ? 'Xem tiếp' : 'Xem lại'}
                        </button>
                        <button
                          onClick={() => handleRemoveFromHistory(item.movie.id)}
                          className="p-2 hover:bg-red-600 rounded-lg transition-colors"
                          title="Xóa khỏi lịch sử"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Chưa có lịch sử xem</h3>
                <p className="text-gray-400 mb-6">
                  Bắt đầu xem phim để lưu lại lịch sử
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                >
                  Khám phá phim
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
