import React from 'react';

/**
 * 分頁面板組件
 * @param {array} tabs - 分頁數據 [{ id, name, icon }]
 * @param {number} activeTab - 當前活動分頁索引
 * @param {function} onTabChange - 分頁切換回調
 */
const TabPanel = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div 
      role="tablist" 
      aria-label="分類選擇"
      className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b-2 border-gray-200"
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === index}
          aria-controls={`tabpanel-${tab.id}`}
          onClick={() => onTabChange(index)}
          className={`
            px-6 py-3
            sm:px-8 sm:py-4
            text-xl sm:text-2xl 
            font-semibold 
            rounded-lg 
            transition-colors
            whitespace-nowrap
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-400
            ${
              activeTab === index
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default React.memo(TabPanel);
