import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Subtitles,
  SkipForward,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { historyService } from '../lib/storage';

interface VideoPlayerProps {
  videoUrl: string;
  movieId: string;
  movieTitle: string;
  onNext?: () => void;
  episodeNumber?: number;
}

export default function VideoPlayer({
  videoUrl,
  movieId,
  movieTitle,
  onNext,
  episodeNumber,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [quality, setQuality] = useState('Auto');
  const [subtitle, setSubtitle] = useState('Tắt');

  const controlsTimeoutRef = useRef<number | null>(null);

  // Initialize HLS
  // Check if videoUrl is an embed URL
  const isEmbedUrl = videoUrl.includes('embed') || videoUrl.includes('iframe');

  useEffect(() => {
    if (isEmbedUrl) return; // Skip HLS setup for embed URLs

    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest parsed');
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoUrl;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoUrl, isEmbedUrl]);

  // Save progress periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && duration > 0) {
        const progress = (currentTime / duration) * 100;
        historyService.addToHistory(movieId, progress, episodeNumber);
      }
    }, 10000); // Save every 10 seconds

    return () => clearInterval(interval);
  }, [currentTime, duration, movieId, episodeNumber]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onNext) {
        setTimeout(() => onNext(), 2000);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onNext]);

  // Mouse movement handler
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Playback controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const handleVolumeChange = (value: number) => {
    if (!videoRef.current) return;
    setVolume(value);
    videoRef.current.volume = value;
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element or Embed */}
      {isEmbedUrl ? (
        <iframe
          src={videoUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          title={movieTitle}
        />
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full"
          onClick={togglePlay}
        />
      )}

      {/* Controls Overlay - only for non-embed videos */}
      {!isEmbedUrl && (
        <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between pointer-events-none"
          >
            {/* Top Bar */}
            <div className="p-4 pointer-events-auto">
              <h3 className="text-lg font-semibold">{movieTitle}</h3>
              {episodeNumber && (
                <p className="text-sm text-gray-300">Tập {episodeNumber}</p>
              )}
            </div>

            {/* Center Play Button */}
            {!isPlaying && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={togglePlay}
                className="self-center p-6 bg-red-600 rounded-full hover:bg-red-700 transition-colors pointer-events-auto"
              >
                <Play className="w-12 h-12 fill-current" />
              </motion.button>
            )}

            {/* Bottom Controls */}
            <div className="p-4 space-y-3 pointer-events-auto">
              {/* Progress Bar */}
              <div
                ref={progressRef}
                className="h-1 bg-white/20 rounded-full cursor-pointer hover:h-1.5 transition-all"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-red-600 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 hover:opacity-100" />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 fill-current" />
                    )}
                  </button>

                  {/* Skip */}
                  <button
                    onClick={() => skip(10)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2 group/volume">
                    <button
                      onClick={toggleMute}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-0 group-hover/volume:w-20 transition-all"
                    />
                  </div>

                  {/* Time */}
                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Subtitles */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSubtitles(!showSubtitles)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Subtitles className="w-5 h-5" />
                    </button>
                    {showSubtitles && (
                      <div className="absolute bottom-full right-0 mb-2 p-2 bg-black/90 rounded-lg min-w-[150px]">
                        <button
                          onClick={() => {
                            setSubtitle('Tắt');
                            setShowSubtitles(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-white/20 rounded"
                        >
                          Tắt
                        </button>
                        <button
                          onClick={() => {
                            setSubtitle('Tiếng Việt');
                            setShowSubtitles(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-white/20 rounded"
                        >
                          Tiếng Việt
                        </button>
                        <button
                          onClick={() => {
                            setSubtitle('English');
                            setShowSubtitles(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-white/20 rounded"
                        >
                          English
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Quality Settings */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                    {showSettings && (
                      <div className="absolute bottom-full right-0 mb-2 p-2 bg-black/90 rounded-lg min-w-[150px]">
                        <div className="px-3 py-1 text-xs text-gray-400">Chất lượng</div>
                        {['Auto', '1080p', '720p', '480p', '360p'].map((q) => (
                          <button
                            key={q}
                            onClick={() => {
                              setQuality(q);
                              setShowSettings(false);
                            }}
                            className={`w-full text-left px-3 py-2 hover:bg-white/20 rounded ${
                              quality === q ? 'text-red-500' : ''
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>

                  {/* Next Episode */}
                  {onNext && (
                    <button
                      onClick={onNext}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Tập tiếp
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      )}
    </div>
  );
}
