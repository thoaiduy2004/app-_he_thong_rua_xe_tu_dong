import React from 'react';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onEmergencyStop: () => void;
  unreadCount?: number;
  isEmergencyActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
  onEmergencyStop,
  unreadCount = 2,
  isEmergencyActive = false,
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#0a0e18]/90 backdrop-blur-xl border-b border-[#1c1f2a] shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left: Brand Lockup */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            alt="AutoWash Pro Logo"
            className="h-8 w-auto object-contain shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBifg6PvOEjakt-90_MHwdnweEuF9NBh9maq6-VTde1T560GKOaBxpxpZBDMdBSiRuNVX7AYZGlzVyl29cAVv7QUOpBSPXN_Atlp9tpwaG-LfzMfGoh4dlSw0M1ssIWPr4MPHoRYp4QFkGdDLEReAmgL8ArqAmvbP4gdg1HhgzWBYy-JDU1h0b-iFzeBMmPJb9U-1SNhc86eWlaJW9i5dy-BDMMbvuw1gobWawenSC1YZVpL_ZZn8XHjw"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg tracking-tight text-[#dbfcff] font-bold truncate">
                AutoWash
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-mono tracking-wider uppercase font-semibold">
                PRO
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isEmergencyActive ? 'bg-red-500' : 'bg-[#00f0ff]'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isEmergencyActive ? 'bg-red-500' : 'bg-[#00f0ff]'}`}></span>
              </span>
              <span className="text-[10px] text-[#b9cacb] font-display uppercase tracking-widest font-semibold truncate">
                {isEmergencyActive ? 'KHẨN CẤP • DỪNG TOÀN KHU' : 'ONLINE • ĐIỀU KHIỂN'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* E-STOP Guarded Button */}
          <button
            onClick={onEmergencyStop}
            title="Dừng khẩn cấp E-STOP"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 ${
              isEmergencyActive
                ? 'bg-red-600 text-white animate-pulse border border-red-400'
                : 'bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">emergency</span>
            <span>E-STOP</span>
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            aria-label="Thông báo hệ thống"
            className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#262a35]/70 hover:bg-[#313540] text-[#b9cacb] hover:text-[#00f0ff] transition-colors border border-[#3b494b]/40 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00f0ff] text-[#00363a] font-mono text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Operator Profile */}
          <button
            onClick={onOpenProfile}
            aria-label="Tài khoản kỹ thuật viên"
            className="w-10 h-10 rounded-lg bg-[#262a35]/70 hover:bg-[#313540] border border-[#3b494b]/40 flex items-center justify-center text-[#dbfcff] hover:text-[#00f0ff] transition-colors active:scale-95"
          >
            <div className="w-7 h-7 rounded-full bg-[#dbfcff] flex items-center justify-center text-[#00363a]">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
