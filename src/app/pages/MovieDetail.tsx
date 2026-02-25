import { useParams, Link, useNavigate } from 'react-router';
import { Play, Plus, Check, Star, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { getMovieById } from '../data/movies';
import { watchlistService } from '../lib/storage';
import { useState } from 'react';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = id ? getMovieById(id) : null;

  const [isInWatchlist, setIsInWatchlist] = useState(
    movie ? watchlistService.isInWatchlist(movie.id) : false
  );

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy phim</h1>
          <Link to="/" className="text-red-500 hover:underline">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen">
      {/* Backdrop Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:left-8 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <motion.div
            className="flex-none w-full sm:w-64 lg:w-80"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">{movie.title}</h1>
            <p className="text-xl text-gray-400 mb-6">{movie.originalTitle}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-xl font-semibold">{movie.rating.toFixed(1)}</span>
                <span className="text-gray-400">/10</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5" />
                <span>{movie.releaseYear}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-5 h-5" />
                <span>{movie.duration} phút</span>
              </div>
              <span className="px-3 py-1 bg-red-600 rounded-full text-sm font-semibold">
                {movie.type === 'movie' ? 'Phim' : 'Series'}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to={`/watch/${movie.id}`}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
              >
                <Play className="w-5 h-5 fill-current" />
                Xem ngay
              </Link>

              <button
                onClick={handleWatchlistToggle}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-semibold transition-colors"
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

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Nội dung phim</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{movie.description}</p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Đạo diễn</h3>
                <p className="text-lg">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Quốc gia</h3>
                <p className="text-lg">{movie.country}</p>
              </div>
            </div>

            {/* Cast */}
            {movie.cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Diễn viên</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {movie.cast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      <img
                        src={actor.avatar}
                        alt={actor.name}
                        className="w-full aspect-square object-cover rounded-lg mb-2"
                      />
                      <p className="font-medium">{actor.name}</p>
                      <p className="text-sm text-gray-400">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Series Episodes */}
            {movie.type === 'series' && movie.seasons && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Tập phim ({movie.totalEpisodes} tập)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {movie.seasons[0].episodes.slice(0, 10).map((episode) => (
                    <Link
                      key={episode.episodeNumber}
                      to={`/watch/${movie.id}?ep=${episode.episodeNumber}`}
                      className="aspect-video rounded-lg overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-red-500 transition-all group"
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={episode.thumbnail}
                          alt={episode.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-40"
                        />
                        <div className="relative z-10 text-center">
                          <Play className="w-8 h-8 mx-auto mb-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <p className="font-semibold">Tập {episode.episodeNumber}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="h-32" />
    </div>
  );
}
