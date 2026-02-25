import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-9xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4">Không tìm thấy trang</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
          <Link
            to="/search"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-semibold transition-colors"
          >
            <Search className="w-5 h-5" />
            Tìm kiếm phim
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
