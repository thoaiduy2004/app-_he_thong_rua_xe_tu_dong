import React from 'react';

export type TabId = 'control' | 'queue' | 'equipment' | 'settings';

interface BottomNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  queueBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  queueBadgeCount = 4,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 bg-[#0a0e18]/95 backdrop-blur-xl border-t border-[#1c1f2a] shadow-[0_-1px_16px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto flex items-stretch justify-around h-16 sm:h-20 px-1">
        {/* Tab 1: Điều Khiển */}
        <button
          onClick={() => onSelectTab('control')}
          className={`flex flex-1 flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${
            activeTab === 'control'
              ? 'text-[#00f0ff]'
              : 'text-[#b9cacb] hover:text-[#dbfcff]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] sm:text-[24px] ${
              activeTab === 'control' ? 'scale-110 drop-shadow-[0_0_8px_#00f0ff]' : ''
            }`}
          >
            tune
          </span>
          <span className="font-display text-[11px] sm:text-xs mt-1 tracking-tight font-medium">
            Điều Khiển
          </span>
        </button>

        {/* Tab 2: Hàng Đợi */}
        <button
          onClick={() => onSelectTab('queue')}
          className={`relative flex flex-1 flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${
            activeTab === 'queue'
              ? 'text-[#00f0ff]'
              : 'text-[#b9cacb] hover:text-[#dbfcff]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] sm:text-[24px] ${
              activeTab === 'queue' ? 'scale-110 drop-shadow-[0_0_8px_#00f0ff]' : ''
            }`}
          >
            directions_car
          </span>
          <span className="font-display text-[11px] sm:text-xs mt-1 tracking-tight font-medium">
            Hàng Đợi
          </span>
          {queueBadgeCount > 0 && (
            <span className="absolute top-2 right-4 px-1 min-w-[16px] h-4 rounded-full bg-[#0566d9] text-white font-mono text-[9px] font-bold flex items-center justify-center">
              {queueBadgeCount}
            </span>
          )}
        </button>

        {/* Tab 3: Thiết Bị */}
        <button
          onClick={() => onSelectTab('equipment')}
          className={`flex flex-1 flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${
            activeTab === 'equipment'
              ? 'text-[#00f0ff]'
              : 'text-[#b9cacb] hover:text-[#dbfcff]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] sm:text-[24px] ${
              activeTab === 'equipment' ? 'scale-110 drop-shadow-[0_0_8px_#00f0ff]' : ''
            }`}
          >
            speed
          </span>
          <span className="font-display text-[11px] sm:text-xs mt-1 tracking-tight font-medium">
            Thiết Bị
          </span>
        </button>

        {/* Tab 4: Cài Đặt */}
        <button
          onClick={() => onSelectTab('settings')}
          className={`flex flex-1 flex-col items-center justify-center min-w-[64px] min-h-[44px] transition-colors ${
            activeTab === 'settings'
              ? 'text-[#00f0ff]'
              : 'text-[#b9cacb] hover:text-[#dbfcff]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] sm:text-[24px] ${
              activeTab === 'settings' ? 'scale-110 drop-shadow-[0_0_8px_#00f0ff]' : ''
            }`}
          >
            settings_input_component
          </span>
          <span className="font-display text-[11px] sm:text-xs mt-1 tracking-tight font-medium">
            Cài Đặt
          </span>
        </button>
      </div>
    </nav>
  );
};
