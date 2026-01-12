# 中風病人輔助溝通系統

為中風病人設計的點按發聲輔助溝通網頁應用，提供簡單易用的大按鈕介面，幫助無法正常說話的病人表達需求。

## 功能特色

✅ **點按即發聲** - 點擊按鈕立即播放語音  
✅ **無障礙設計** - 大按鈕（120x120px）、高對比度、防誤觸  
✅ **混合語音方案** - 優先使用預錄音檔，自動降級到 TTS  
✅ **多分頁管理** - 日常用語、吃飯相關等分類  
✅ **響應式設計** - 支援手機、平板、桌面裝置  
✅ **離線可用** - 使用預錄音檔時無需網絡  

## 技術棧

- **React 18** + **Vite** - 現代化前端框架
- **Tailwind CSS** - 實用優先的樣式框架
- **Web Audio API** - 音檔播放
- **Web Speech API** - 文字轉語音備用方案

## 快速開始

### 安裝依賴

```bash
npm install
```

### 準備音檔

將音檔放入 `public/audio/` 資料夾：

```
public/audio/
├── 痛.mp3
├── 癢.mp3
├── 渴.mp3
└── ...
```

**音檔建議規格：**
- 格式：MP3
- 取樣率：44.1kHz
- 聲道：單聲道
- 大小：每個檔案 < 100KB

### 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問 `http://localhost:5173`

### 建置生產版本

```bash
npm run build
```

建置後的檔案在 `dist/` 資料夾，可部署到任何靜態網頁託管服務。

### 預覽生產版本

```bash
npm run preview
```

## 專案結構

```
stroke-patient/
├── public/
│   └── audio/              # 音檔存放處
│       ├── 痛.mp3
│       └── ...
├── src/
│   ├── components/         # React 組件
│   │   ├── VoiceButton.jsx
│   │   └── TabPanel.jsx
│   ├── hooks/              # 自定義 Hooks
│   │   └── useAudio.js
│   ├── data/               # 數據配置
│   │   └── defaultPhrases.js
│   ├── App.jsx             # 主應用
│   ├── App.css             # 應用樣式
│   ├── main.jsx            # 入口文件
│   └── index.css           # 全局樣式
├── agent.md                # AI Agent 開發指引
├── project.md              # 專案詳細文檔
└── package.json
```

## 自定義配置

### 修改預設單字

編輯 `src/data/defaultPhrases.js`：

```javascript
export const defaultCategories = [
  {
    id: 'daily',
    name: '日常用語',
    icon: '🏠',
    phrases: [
      { text: '痛', audioFile: '痛.mp3' },
      { text: '癢', audioFile: '癢.mp3' },
      // 添加更多單字...
    ]
  },
  // 添加更多分頁...
];
```

### 調整按鈕樣式

修改 `src/components/VoiceButton.jsx` 中的 Tailwind classes：

```jsx
className="w-32 h-32 text-4xl font-bold bg-blue-500 ..."
```

### 更改主題顏色

編輯 `tailwind.config.js`：

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',  // 主色調
    }
  }
}
```

## 無障礙功能

- ✅ 按鈕最小尺寸 120x120px（符合 WCAG 標準）
- ✅ 按鈕間距 16px（防止誤觸）
- ✅ 鍵盤導航支援（Tab, Enter, Space）
- ✅ ARIA 屬性完整支援
- ✅ 高對比度配色（符合 WCAG AA）
- ✅ 大字體（32px+）
- ✅ 清晰的視覺反饋

## 瀏覽器支援

- ✅ Chrome 60+
- ✅ Safari 14+
- ✅ Firefox 60+
- ✅ Edge 79+

## 部署

### GitHub Pages

```bash
npm run build
# 將 dist/ 資料夾內容推送到 gh-pages 分支
```

### Netlify / Vercel

1. 連接 Git 倉庫
2. Build command: `npm run build`
3. Publish directory: `dist`

## 常見問題

**Q: 音檔沒有播放？**  
A: 檢查音檔是否放在 `public/audio/` 資料夾，檔名是否與配置一致。如果音檔不存在，系統會自動降級使用 TTS。

**Q: 可以離線使用嗎？**  
A: 使用預錄音檔時可以離線使用（需先載入過網頁）。TTS 降級方案可能需要網絡連接。

**Q: 如何添加新分頁？**  
A: 編輯 `src/data/defaultPhrases.js`，添加新的 category 物件。

**Q: 支援多語言嗎？**  
A: 目前主要支援繁體中文，可通過修改 `useAudio.js` 中的 `utterance.lang` 來支援其他語言。

## 授權

待定

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 聯繫

如有問題或建議，請開啟 Issue。
