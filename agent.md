# Agent 開發指引

## 專案概述
中風病人輔助溝通系統 - 為言語障礙患者設計的點按發聲網頁應用

## 技術棧
- React 18 + Vite
- Tailwind CSS
- Web Audio API + Web Speech API

## 核心原則

### 1. 代碼組織
- ✅ **CSS 與 JS 分離**：禁止在 JSX 中內嵌大量 inline styles，使用 Tailwind classes 或獨立 CSS 文件
- ✅ **組件化**：每個組件單一職責，可重用
- ✅ **Hooks 優先**：使用 React Hooks 管理狀態和副作用
- ✅ **檔案結構清晰**：依功能分類（components, hooks, data, utils）

### 2. 無障礙設計（WCAG 2.1 AA）
- ✅ 按鈕最小尺寸：120x120px
- ✅ 按鈕間距：16px（防誤觸）
- ✅ 字體大小：32px+
- ✅ 對比度：至少 4.5:1（文字）、3:1（UI 元件）
- ✅ ARIA 屬性：role, aria-label, aria-pressed
- ✅ 鍵盤導航：Tab, Enter, Space 支援
- ✅ 觸控友善：大觸控目標，清晰視覺反饋

### 3. 音檔播放策略（混合方案）
```javascript
// 優先順序：預錄音檔 > Web Speech API
1. 嘗試載入 /audio/{word}.mp3
2. 成功 → 播放音檔
3. 失敗 → 降級使用 speechSynthesis
4. 提供停止播放功能
```

### 4. 當前開發範圍

#### ✅ 第一階段（當前）
- 混合音檔播放系統
- 預設分頁和單字
- 大按鈕 UI
- 分頁切換
- 響應式設計

#### ❌ 暫不實作
- 編輯模式
- 自定義單字
- localStorage 持久化
- 設定匯入/匯出

## 組件設計規範

### VoiceButton 組件
```jsx
/**
 * 語音按鈕組件
 * @param {string} word - 要播放的單字
 * @param {string} audioSrc - 音檔路徑（可選）
 * @param {function} onClick - 點擊回調（可選）
 */
<VoiceButton 
  word="痛" 
  audioSrc="/audio/痛.mp3"
  className="..." 
/>
```

**要求：**
- 尺寸：120x120px（可通過 Tailwind 調整）
- 字體：32px, 粗體
- 視覺反饋：active 狀態明顯
- ARIA：role="button", aria-label="播放: {word}"
- 防誤觸：點擊後立即反饋，避免重複觸發

### TabPanel 組件
```jsx
/**
 * 分頁面板組件
 * @param {array} tabs - 分頁數據
 * @param {number} activeTab - 當前活動分頁
 * @param {function} onTabChange - 分頁切換回調
 */
<TabPanel 
  tabs={[
    { id: 'daily', name: '日常', phrases: [...] },
    { id: 'eating', name: '吃飯', phrases: [...] }
  ]}
  activeTab={0}
  onTabChange={(index) => {...}}
/>
```

**要求：**
- Tab 按鈕清晰可見
- 當前 Tab 有明顯標示
- 響應式：手機上堆疊或橫向滾動
- ARIA：role="tablist", role="tab", aria-selected

### useAudio Hook
```javascript
/**
 * 混合音檔播放 Hook
 * @returns {object} { play, stop, isPlaying }
 */
const { play, stop, isPlaying } = useAudio();

// 使用
play('痛'); // 自動選擇音檔或 TTS
```

**實作邏輯：**
1. 檢查 `/audio/${word}.mp3` 是否存在
2. 存在 → 使用 Audio API 播放
3. 不存在 → 使用 speechSynthesis TTS
4. 提供停止和狀態查詢

## 預設數據結構

### defaultPhrases.js
```javascript
export const defaultCategories = [
  {
    id: 'daily',
    name: '日常用語',
    icon: '🏠', // 可選
    phrases: [
      { text: '痛', audioFile: '痛.mp3' },
      { text: '癢', audioFile: '癢.mp3' },
      { text: '渴', audioFile: '渴.mp3' },
      { text: '冷', audioFile: '冷.mp3' },
      { text: '熱', audioFile: '熱.mp3' },
      { text: '累', audioFile: '累.mp3' },
      { text: '幫忙', audioFile: '幫忙.mp3' },
      { text: '謝謝', audioFile: '謝謝.mp3' }
    ]
  },
  {
    id: 'eating',
    name: '吃飯',
    icon: '🍚',
    phrases: [
      { text: '餓', audioFile: '餓.mp3' },
      { text: '飽', audioFile: '飽.mp3' },
      { text: '好吃', audioFile: '好吃.mp3' },
      { text: '太鹹', audioFile: '太鹹.mp3' },
      { text: '太淡', audioFile: '太淡.mp3' },
      { text: '喝水', audioFile: '喝水.mp3' },
      { text: '吃藥', audioFile: '吃藥.mp3' },
      { text: '不要', audioFile: '不要.mp3' }
    ]
  }
];
```

## Tailwind 配色方案

### 主題色
```javascript
// tailwind.config.js 建議配置
theme: {
  extend: {
    colors: {
      'primary': '#3B82F6',      // 藍色（主按鈕）
      'primary-dark': '#1E40AF', // 深藍（hover）
      'secondary': '#10B981',    // 綠色（成功/啟用）
      'danger': '#EF4444',       // 紅色（停止/刪除）
      'neutral': '#6B7280',      // 灰色（次要按鈕）
    },
    spacing: {
      'btn': '120px',  // 標準按鈕尺寸
      'gap': '16px',   // 標準間距
    }
  }
}
```

### 按鈕樣式建議
```jsx
// 主按鈕
className="w-btn h-btn text-4xl font-bold bg-primary hover:bg-primary-dark active:scale-95 text-white rounded-2xl shadow-lg transition-all duration-150"

// 分頁按鈕
className="px-8 py-4 text-2xl font-semibold rounded-lg transition-colors"

// 停止按鈕
className="w-20 h-20 bg-danger hover:bg-red-600 text-white rounded-full"
```

## 響應式設計

### 斷點策略
```css
/* 手機直向 */
@media (max-width: 640px) {
  - 按鈕 2 列排列
  - 按鈕尺寸可縮小至 100px
  - 分頁標籤橫向滾動
}

/* 手機橫向 / 小平板 */
@media (min-width: 641px) and (max-width: 1024px) {
  - 按鈕 3-4 列排列
  - 保持 120px 尺寸
}

/* 平板 / 桌面 */
@media (min-width: 1025px) {
  - 按鈕 4-5 列排列
  - 120px 尺寸
  - 分頁側邊欄（可選）
}
```

## 效能優化

### 音檔預載
```javascript
// 在 App 載入時預先載入常用音檔
useEffect(() => {
  commonPhrases.forEach(phrase => {
    const audio = new Audio(`/audio/${phrase}.mp3`);
    audio.preload = 'auto';
  });
}, []);
```

### React 優化
- 使用 `React.memo` 包裝 VoiceButton（避免不必要重渲染）
- 使用 `useCallback` 包裝事件處理函數
- 避免在渲染中創建新物件/陣列

## 測試檢查清單

### 功能測試
- [ ] 點擊按鈕正確播放音檔
- [ ] 音檔不存在時降級到 TTS
- [ ] 分頁切換正常
- [ ] 停止播放功能正常

### 無障礙測試
- [ ] 鍵盤可導航所有按鈕
- [ ] Enter/Space 可觸發按鈕
- [ ] 螢幕閱讀器可正確朗讀
- [ ] 顏色對比度符合標準

### 響應式測試
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad (768px)
- [ ] Desktop (1280px+)

### 瀏覽器測試
- [ ] Chrome
- [ ] Safari (iOS)
- [ ] Firefox
- [ ] Edge

## 常見問題

### Q1: 音檔載入失敗怎麼辦？
A: useAudio hook 自動降級到 Web Speech API

### Q2: 如何避免按鈕重複觸發？
A: 在播放時禁用按鈕，或使用 debounce

### Q3: 支援離線使用嗎？
A: 目前音檔方案可離線使用（需先載入過），TTS 降級可能需要網絡

### Q4: 如何添加新分頁？
A: 編輯 `src/data/defaultPhrases.js`，添加新的 category 物件

### Q5: 可以自訂按鈕顏色嗎？
A: 可以，通過 Tailwind 的 className prop 或修改 tailwind.config.js

## Git 提交規範

### Commit Message 格式
```
<type>: <subject>

<body> (optional)
```

**Type:**
- feat: 新功能
- fix: 修復 bug
- style: 樣式調整
- refactor: 重構
- docs: 文檔更新
- test: 測試相關
- chore: 建置工具或輔助工具

**範例:**
```
feat: 實作混合音檔播放系統

- 優先使用預錄音檔
- 降級到 Web Speech API
- 添加播放狀態管理
```

## 開發工作流程

1. **閱讀 project.md** 了解專案目標
2. **查看 todo list** 確認當前任務
3. **建立/修改組件** 遵循本文檔規範
4. **測試功能** 使用 `npm run dev`
5. **檢查無障礙** 使用瀏覽器開發者工具
6. **提交代碼** 遵循 commit 規範

## 參考資源

### 無障礙設計
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://react.dev/learn/accessibility)

### Web APIs
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Accessibility in Tailwind](https://tailwindcss.com/docs/screen-readers)
