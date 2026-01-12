import React from 'react';

/**
 * 語音按鈕組件
 * @param {string} word - 要播放的單字
 * @param {string} audioFile - 音檔檔名（可選）
 * @param {function} onClick - 點擊回調
 * @param {boolean} isPlaying - 是否正在播放
 * @param {string} className - 額外的樣式類別
 */
const VoiceButton = ({ 
  word, 
  audioFile = null, 
  onClick, 
  isPlaying = false,
  className = '' 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(word, audioFile);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      role="button"
      aria-label={`播放: ${word}`}
      aria-pressed={isPlaying}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isPlaying}
      className={`
        w-full 
        h-40 sm:h-48 md:h-56
        text-5xl sm:text-6xl md:text-7xl
        font-bold 
        bg-blue-500 
        hover:bg-blue-600 
        active:scale-95 
        disabled:bg-blue-300
        disabled:cursor-not-allowed
        text-white 
        rounded-3xl 
        shadow-2xl 
        transition-all 
        duration-150
        focus:outline-none 
        focus:ring-4 
        focus:ring-blue-300
        ${className}
      `}
    >
      {word}
    </button>
  );
};

export default React.memo(VoiceButton);
