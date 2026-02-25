import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'motion/react';
import { mockMovies, getAllGenres, getAllCountries, getAllYears } from '../data/movies';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(mockMovies);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'movie' | 'series'>('all');
  const [minRating, setMinRating] = useState(0);

  const allGenres = getAllGenres();
  const allCountries = getAllCountries();
  const allYears = getAllYears();

  // Apply filters
  useEffect(() => {
    let results = mockMovies;

    // Search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (movie) =>
          movie.title.toLowerCase().includes(lowerQuery) ||
          movie.originalTitle.toLowerCase().includes(lowerQuery) ||
          movie.description.toLowerCase().includes(lowerQuery) ||
          movie.director.toLowerCase().includes(lowerQuery)
      );
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      results = results.filter((movie) =>
        selectedGenres.some((genre) => movie.genres.includes(genre))
      );
    }

    // Country filter
    if (selectedCountries.length > 0) {
      results = results.filter((movie) => selectedCountries.includes(movie.country));
    }

    // Year filter
    if (selectedYears.length > 0) {
      results = results.filter((movie) => selectedYears.includes(movie.releaseYear));
    }

    // Type filter
    if (selectedType !== 'all') {
      results = results.filter((movie) => movie.type === selectedType);
    }

    // Rating filter
    if (minRating > 0) {
      results = results.filter((movie) => movie.rating >= minRating);
    }

    setFilteredMovies(results);
  }, [query, selectedGenres, selectedCountries, selectedYears, selectedType, minRating]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  };

  const toggleYear = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedCountries([]);
    setSelectedYears([]);
    setSelectedType('all');
    setMinRating(0);
  };

  const hasActiveFilters =
    selectedGenres.length > 0 ||
    selectedCountries.length > 0 ||
    selectedYears.length > 0 ||
    selectedType !== 'all' ||
    minRating > 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Tìm kiếm phim</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên phim, đạo diễn..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-white/10 hover:bg-white/20 border border-white/20'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Bộ lọc</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-white rounded-full" />
              )}
            </button>
          </form>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-6"
            >
              {/* Type Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Loại phim</h3>
                </div>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'Tất cả' },
                    { value: 'movie', label: 'Phim lẻ' },
                    { value: 'series', label: 'Phim bộ' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value as any)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedType === type.value
                          ? 'bg-red-600'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Đánh giá tối thiểu</h3>
                  <span className="text-sm text-gray-400">{minRating.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Genre Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Thể loại</h3>
                  {selectedGenres.length > 0 && (
                    <span className="text-sm text-gray-400">
                      {selectedGenres.length} đã chọn
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allGenres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedGenres.includes(genre)
                          ? 'bg-red-600'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Country Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Quốc gia</h3>
                  {selectedCountries.length > 0 && (
                    <span className="text-sm text-gray-400">
                      {selectedCountries.length} đã chọn
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allCountries.map((country) => (
                    <button
                      key={country}
                      onClick={() => toggleCountry(country)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedCountries.includes(country)
                          ? 'bg-red-600'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Năm phát hành</h3>
                  {selectedYears.length > 0 && (
                    <span className="text-sm text-gray-400">
                      {selectedYears.length} đã chọn
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => toggleYear(year)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedYears.includes(year)
                          ? 'bg-red-600'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Xóa bộ lọc
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {filteredMovies.length} kết quả
            {query && ` cho "${query}"`}
          </h2>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h3>
            <p className="text-gray-400">Thử thay đổi từ khóa hoặc bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  );
}
