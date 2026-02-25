import { useParams, useSearchParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Info } from 'lucide-react';
import { getMovieById } from '../data/movies';
import VideoPlayer from '../components/VideoPlayer';
import { motion } from 'motion/react';

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const episodeNumber = searchParams.get('ep') ? parseInt(searchParams.get('ep')!) : undefined;
  const movie = id ? getMovieById(id) : null;

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

  const currentEpisode =
    movie.type === 'series' && episodeNumber && movie.seasons
      ? movie.seasons[0].episodes.find((ep) => ep.episodeNumber === episodeNumber)
      : null;

  const videoUrl = currentEpisode?.videoUrl || movie.videoUrl;
  const movieTitle = currentEpisode
    ? `${movie.title} - Tập ${episodeNumber}`
    : movie.title;

  const handleNextEpisode = () => {
    if (movie.type === 'series' && episodeNumber && movie.seasons) {
      const nextEp = episodeNumber + 1;
      const nextEpisode = movie.seasons[0].episodes.find(
        (ep) => ep.episodeNumber === nextEp
      );
      if (nextEpisode) {
        navigate(`/watch/${movie.id}?ep=${nextEp}`);
      }
    }
  };

  const hasNextEpisode =
    movie.type === 'series' &&
    episodeNumber &&
    movie.seasons &&
    episodeNumber < movie.seasons[0].episodes.length;

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="absolute top-20 left-4 sm:left-8 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-black/80 hover:bg-black backdrop-blur-sm rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Quay lại</span>
        </button>
      </div>

      {/* Video Player */}
      <div className="w-full">
        <VideoPlayer
          videoUrl={videoUrl}
          movieId={movie.id}
          movieTitle={movieTitle}
          onNext={hasNextEpisode ? handleNextEpisode : undefined}
          episodeNumber={episodeNumber}
        />
      </div>

      {/* Movie Info */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-6 mb-8">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-32 sm:w-40 rounded-lg shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <p className="text-gray-400 mb-4">{movie.originalTitle}</p>
              <p className="text-gray-300 mb-4">{movie.description}</p>
              <Link
                to={`/movie/${movie.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
              >
                <Info className="w-4 h-4" />
                Xem chi tiết
              </Link>
            </div>
          </div>

          {/* Episodes Grid for Series */}
          {movie.type === 'series' && movie.seasons && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Các tập phim</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {movie.seasons[0].episodes.map((episode) => (
                  <Link
                    key={episode.episodeNumber}
                    to={`/watch/${movie.id}?ep=${episode.episodeNumber}`}
                    className={`aspect-video rounded-lg overflow-hidden bg-white/10 hover:bg-white/20 border transition-all ${
                      episodeNumber === episode.episodeNumber
                        ? 'border-red-500 ring-2 ring-red-500'
                        : 'border-white/20 hover:border-red-500'
                    }`}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                      <div className="relative z-10 text-center">
                        <p className="font-semibold">Tập {episode.episodeNumber}</p>
                        {episodeNumber === episode.episodeNumber && (
                          <p className="text-xs text-red-500 mt-1">Đang xem</p>
                        )}
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
  );
}
