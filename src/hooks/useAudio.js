import { useState, useCallback, useRef } from 'react';

/**
 * 混合音檔播放 Hook
 * 優先使用預錄音檔，找不到則降級到 Web Speech API
 * @returns {object} { play, stop, isPlaying }
 */
export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  const stop = useCallback(() => {
    // 停止音檔播放
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // 停止 TTS
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
    }

    setIsPlaying(false);
  }, []);

  const playWithTTS = useCallback((text) => {
    if (!window.speechSynthesis) {
      console.error('瀏覽器不支援 Web Speech API');
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.9;
    utterance.volume = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const playWithAudio = useCallback((audioFile, fallbackText) => {
    const audio = new Audio(audioFile);
    audioRef.current = audio;

    audio.oncanplaythrough = () => {
      setIsPlaying(true);
      audio.play().catch((error) => {
        console.error('音檔播放失敗:', error);
        playWithTTS(fallbackText);
      });
    };

    audio.onended = () => {
      setIsPlaying(false);
      audioRef.current = null;
    };

    audio.onerror = () => {
      console.warn(`音檔 ${audioFile} 不存在，降級到 TTS`);
      playWithTTS(fallbackText);
    };

    audio.load();
  }, [playWithTTS]);

  const play = useCallback((word, audioFile = null) => {
    // 如果正在播放，先停止
    if (isPlaying) {
      stop();
    }

    // 優先使用提供的音檔路徑，否則使用預設路徑
    const audioSrc = audioFile || `/audio/${word}.mp3`;

    // 嘗試播放音檔
    playWithAudio(audioSrc, word);
  }, [isPlaying, stop, playWithAudio]);

  return {
    play,
    stop,
    isPlaying
  };
};
