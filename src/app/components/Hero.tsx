import { Link } from 'react-router';
import { Play, Info, Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie } from '../types';
import { watchlistService } from '../lib/storage';
import { useState } from 'react';

interface HeroProps {
  movie: Movie;
}

export default function Hero({ movie }: HeroProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(
    watchlistService.isInWatchlist(movie.id)
  );

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      watchlistService.removeFromWatchlist(movie.id);
      setIsInWatchlist(false);
    } else {
      watchlistService.addToWatchlist(movie.id);
      setIsInWatchlist(true);
    }
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tags */}
          {movie.tags.length > 0 && (
            <div className="flex gap-2 mb-4">
              {movie.tags.includes('hot') && (
                <span className="px-3 py-1 bg-red-600 rounded-full text-xs font-semibold">
                  🔥 HOT
                </span>
              )}
              {movie.tags.includes('new') && (
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold">
                  ⚡ MỚI NHẤT
                </span>
              )}
              {movie.tags.includes('trending') && (
                <span className="px-3 py-1 bg-purple-600 rounded-full text-xs font-semibold">
                  📈 TRENDING
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {movie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold">{movie.rating.toFixed(1)}</span>
            </span>
            <span>•</span>
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span>{movie.duration} phút</span>
            <span>•</span>
            <span>{movie.type === 'movie' ? 'Phim' : 'Series'}</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-300 mb-8 line-clamp-3 max-w-xl">
            {movie.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/watch/${movie.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              Xem ngay
            </Link>

            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg font-semibold transition-colors"
            >
              <Info className="w-5 h-5" />
              Chi tiết
            </Link>

            <button
              onClick={handleWatchlistToggle}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg font-semibold transition-colors"
            >
              {isInWatchlist ? (
                <>
                  <Check className="w-5 h-5" />
                  Đã thêm
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Danh sách
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
