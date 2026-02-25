import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Film, Mail, Lock, User } from 'lucide-react';
import { motion } from 'motion/react';
import { authService } from '../lib/storage';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const result = authService.login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Đăng nhập thất bại');
      }
    } else {
      const result = authService.register(email, password, name);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Đăng ký thất bại');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-purple-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
            <Film className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            VieStream
          </span>
        </div>

        {/* Form Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-lg">
            <button
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError('');
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
                mode === 'register'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Đăng ký
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Họ và tên
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ và tên"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors shadow-lg shadow-red-600/20"
            >
              {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-300 text-center">
              💡 Demo mode: Nhập bất kỳ email và mật khẩu để trải nghiệm
            </p>
          </div>

          {/* Back to Home */}
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Quay về trang chủ
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Đây là demo app streaming phim OTT/Streaming
        </p>
      </motion.div>
    </div>
  );
}
