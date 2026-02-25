import { Link } from 'react-router';
import { Star, Play, Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie } from '../types';
import { watchlistService } from '../lib/storage';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(
    watchlistService.isInWatchlist(movie.id)
  );

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWatchlist) {
      watchlistService.removeFromWatchlist(movie.id);
      setIsInWatchlist(false);
    } else {
      watchlistService.addToWatchlist(movie.id);
      setIsInWatchlist(true);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`}>
      <motion.div
        className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Poster Image */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content on Hover */}
        <motion.div
          className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 20 }}
          whileHover={{ y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-1 line-clamp-2">{movie.title}</h3>
          
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span>{movie.duration}p</span>
          </div>

          <div className="flex gap-2 mb-2">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="px-2 py-0.5 bg-white/20 rounded text-xs"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              to={`/watch/${movie.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Play className="w-4 h-4" />
              Xem
            </Link>
            <button
              onClick={handleWatchlistToggle}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title={isInWatchlist ? 'Xóa khỏi danh sách' : 'Thêm vào danh sách'}
            >
              {isInWatchlist ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Tags */}
        {movie.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1">
            {movie.tags.includes('hot') && (
              <span className="px-2 py-0.5 bg-red-600 rounded text-xs font-medium">
                HOT
              </span>
            )}
            {movie.tags.includes('new') && (
              <span className="px-2 py-0.5 bg-blue-600 rounded text-xs font-medium">
                MỚI
              </span>
            )}
          </div>
        )}
      </motion.div>
    </Link>
  );
}
