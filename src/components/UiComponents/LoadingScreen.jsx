import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete, onLoad, minimumLoadingTime = 2000 }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('3D deneyim hazırlanıyor...');
  const [isComplete, setIsComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [loadingStartTime] = useState(Date.now());
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    let progressInterval;
    let textInterval;

    if (!onLoad) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setAssetsLoaded(true);
            checkMinimumTimeAndComplete();
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    } else {
      const handleLoad = () => {
        setProgress(100);
        setLoadingText('Tamamlandı!');
        setAssetsLoaded(true);
        checkMinimumTimeAndComplete();
      };
      onLoad(handleLoad);
    }

    textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Tamamlandı!') return prev;
        const texts = [
          'Sahne hazırlanıyor...',
          'Biçimler yerini buluyor...',
          'Işıklar ayarlanıyor...',
          'Neredeyse hazır...'
        ];
        const currentIndex = texts.indexOf(prev);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 1500);

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoad, onLoadingComplete, minimumLoadingTime]);

  const checkMinimumTimeAndComplete = () => {
    const elapsedTime = Date.now() - loadingStartTime;
    const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);
    if (remainingTime > 0) {
      setTimeout(() => { handleLoadingComplete(); }, remainingTime);
    } else {
      handleLoadingComplete();
    }
  };

  const handleLoadingComplete = () => {
    setIsComplete(true);
    setIsFadingOut(true);
    setTimeout(() => { onLoadingComplete && onLoadingComplete(); }, 1000);
  };

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-[99999999999999999999] transition-opacity duration-1000 overflow-hidden ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* 🌌 Hareketli gradient arka plan */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: 'linear-gradient(-45deg, #1e40af, #0891b2, #0284c7, #1e40af)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite'
        }}
      />

      {/* ✨ Parlayan çizgiler (teknoloji hissi) */}
      <div className="pointer-events-none absolute inset-0">
        {/* Yatay çizgi */}
        <div 
          className="absolute top-1/2 left-0 w-full h-[1px] opacity-40"
          style={{
            background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
            animation: 'glowPulse 3s ease-in-out infinite'
          }}
        />
        {/* Dikey çizgi */}
        <div 
          className="absolute left-1/2 top-0 h-full w-[1px] opacity-30"
          style={{
            background: 'linear-gradient(180deg, transparent, #3b82f6, transparent)',
            animation: 'glowPulse 3.5s ease-in-out infinite'
          }}
        />
      </div>

      {/* 🔹 Yavaş dönen ince daireler */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div 
          className="w-64 h-64 md:w-80 md:h-80 border border-cyan-400/15 rounded-full"
          style={{ animation: 'slowRotate 40s linear infinite' }}
        />
        <div 
          className="absolute w-96 h-96 md:w-[28rem] md:h-[28rem] border border-blue-400/10 rounded-full"
          style={{ animation: 'slowRotate 60s linear infinite reverse' }}
        />
      </div>

      {/* 🔵 Geliştirilmiş ışık lekeleri */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-10 -left-10 w-56 h-56 md:w-72 md:h-72 rounded-full bg-cyan-500/15 blur-3xl"
          style={{ animation: 'softPulse 3s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-10 right-6 w-48 h-48 md:w-64 md:h-64 rounded-full bg-blue-400/15 blur-3xl"
          style={{ animation: 'softPulse 3.5s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-40 h-40 md:w-48 md:h-48 rounded-full bg-cyan-300/10 blur-3xl"
          style={{ animation: 'softPulse 2.8s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-500/15 blur-3xl"
          style={{ animation: 'softPulse 4s ease-in-out infinite' }}
        />
      </div>

      {/* Abstract 3D mark */}
      <div className="relative z-10 mb-2 flex h-40 w-40 items-center justify-center md:h-44 md:w-44">
        <div className="absolute inset-2 rounded-full border border-cyan-300/30" style={{ animation: 'slowRotate 28s linear infinite' }} />
        <div className="absolute inset-7 rounded-full border border-blue-300/30" style={{ animation: 'slowRotate 18s linear infinite reverse' }} />
        <span className="text-3xl font-light tracking-[0.28em] text-cyan-100">03</span>
      </div>

      {/* Loading text - geliştirilmiş animasyon */}
      <div 
        className="text-white/90 text-sm font-light mb-6 z-10"
        style={{ 
          textShadow: '0 0 10px rgba(56,189,248,0.5)',
          animation: 'textGlow 2s ease-in-out infinite alternate'
        }}
      >
        {loadingText}
      </div>

      {/* Progress bar - geliştirilmiş gradient */}
      <div className="relative w-64 h-1 bg-gray-800/50 rounded-full overflow-hidden z-10 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-[width] duration-300 ease-out relative"
          style={{ 
            width: `${Math.min(progress, 100)}%`,
            boxShadow: '0 0 10px rgba(56,189,248,0.8)'
          }}
        >
          {/* Progress bar parlama efekti */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: 'shimmer 2s ease-in-out infinite' }}
          />
        </div>
        {/* Arka plan grid çizgiler */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(56,189,248,0.1) 8px, rgba(56,189,248,0.1) 9px)'
        }} />
      </div>

      {/* Progress percentage - geliştirilmiş görünüm */}
      <div 
        className="text-cyan-300 text-xs mt-4 font-mono z-10"
        style={{ 
          textShadow: '0 0 10px rgba(56,189,248,0.8)',
          animation: 'textGlow 1.5s ease-in-out infinite alternate'
        }}
      >
        {Math.round(Math.min(progress, 100))}%
      </div>

      {/* 🔵 Geliştirilmiş CSS animasyonları */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes softPulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.15; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.35; 
          }
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        
        @keyframes logoGlow {
          0% { 
            transform: scale(1);
            opacity: 0.3;
          }
          100% { 
            transform: scale(1.05);
            opacity: 0.6;
          }
        }
        
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes textGlow {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandLine {
          0% { 
            width: 0;
            opacity: 0;
          }
          100% { 
            width: 8rem;
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
