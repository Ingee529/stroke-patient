/**
 * 預設分類和單字配置
 */
export const defaultCategories = [
  {
    id: 'daily',
    name: '日常用語',
    icon: '🏠',
    phrases: [
      { text: '痛', audioFile: '痛.mp3' },
      { text: '癢', audioFile: '癢.mp3' },
      { text: '冷', audioFile: '冷.mp3' },
      { text: '熱', audioFile: '熱.mp3' },
      { text: '累', audioFile: '累.mp3' },
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
      { text: '渴', audioFile: '渴.mp3' },
      { text: '乖乖', audioFile: '乖乖.mp3' },
      { text: '水果', audioFile: '水果.mp3' },
      { text: '不要', audioFile: '不要.mp3' }
    ]
  }
];
