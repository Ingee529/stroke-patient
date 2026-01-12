import { useState } from 'react';
import './App.css';
import VoiceButton from './components/VoiceButton';
import TabPanel from './components/TabPanel';
import { defaultCategories } from './data/defaultPhrases';
import { useAudio } from './hooks/useAudio';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const { play, stop, isPlaying } = useAudio();

  const handleVoiceButtonClick = (word, audioFile) => {
    play(word, audioFile ? `/audio/${audioFile}` : null);
  };

  const currentCategory = defaultCategories[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 標題區域 */}
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            輔助溝通系統
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            點擊按鈕即可發聲
          </p>
        </header>

        {/* 分頁切換 */}
        <TabPanel 
          tabs={defaultCategories}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* 按鈕網格 */}
        <div 
          role="tabpanel"
          id={`tabpanel-${currentCategory.id}`}
          aria-labelledby={`tab-${currentCategory.id}`}
          className="grid grid-cols-2 gap-6 sm:gap-8 mb-6 max-w-4xl mx-auto"
        >
          {currentCategory.phrases.map((phrase) => (
            <VoiceButton
              key={phrase.text}
              word={phrase.text}
              audioFile={phrase.audioFile}
              onClick={handleVoiceButtonClick}
              isPlaying={isPlaying}
            />
          ))}
        </div>

        {/* 停止播放按鈕 */}
        {isPlaying && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={stop}
              aria-label="停止播放"
              className="
                w-16 h-16 sm:w-20 sm:h-20
                bg-red-500 
                hover:bg-red-600 
                active:scale-95
                text-white 
                rounded-full 
                shadow-2xl
                flex 
                items-center 
                justify-center
                text-2xl sm:text-3xl
                font-bold
                transition-all
                focus:outline-none 
                focus:ring-4 
                focus:ring-red-300
              "
            >
              ■
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
