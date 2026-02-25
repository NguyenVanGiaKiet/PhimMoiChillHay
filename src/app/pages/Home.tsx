import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { mockMovies, getMoviesByTag, getMoviesByGenre } from '../data/movies';

export default function Home() {
  // Get featured movie (first hot movie)
  const featuredMovie = getMoviesByTag('hot')[0] || mockMovies[0];

  // Get different movie categories
  const hotMovies = getMoviesByTag('hot');
  const newMovies = getMoviesByTag('new');
  const trendingMovies = getMoviesByTag('trending');
  const recommendedMovies = getMoviesByTag('recommended');
  const actionMovies = getMoviesByGenre('Action');
  const romanceMovies = getMoviesByGenre('Romance');
  const thrillerMovies = getMoviesByGenre('Thriller');

  return (
    <div>
      {/* Hero Section */}
      <Hero movie={featuredMovie} />

      {/* Movie Rows */}
      <div className="py-8 space-y-8">
        {hotMovies.length > 0 && <MovieRow title="🔥 Phim Hot" movies={hotMovies} />}
        {newMovies.length > 0 && <MovieRow title="⚡ Mới Nhất" movies={newMovies} />}
        {trendingMovies.length > 0 && <MovieRow title="📈 Trending" movies={trendingMovies} />}
        {recommendedMovies.length > 0 && <MovieRow title="✨ Đề Xuất Cho Bạn" movies={recommendedMovies} />}
        {actionMovies.length > 0 && <MovieRow title="💥 Phim Hành Động" movies={actionMovies} />}
        {romanceMovies.length > 0 && <MovieRow title="💕 Phim Tình Cảm" movies={romanceMovies} />}
        {thrillerMovies.length > 0 && <MovieRow title="🎭 Phim Ly Kỳ" movies={thrillerMovies} />}
      </div>
    </div>
  );
}
