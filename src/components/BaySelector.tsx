import React from 'react';

interface BaySelectorProps {
  selectedBay: 1 | 2;
  onSelectBay: (bay: 1 | 2) => void;
  bay1StatusText?: string;
  bay2StatusText?: string;
  fps?: number;
  latencyMs?: number;
}

export const BaySelector: React.FC<BaySelectorProps> = ({
  selectedBay,
  onSelectBay,
  bay1StatusText = 'ĐANG RỬA',
  bay2StatusText = 'SẴN SÀNG',
  fps = 30,
  latencyMs = 18,
}) => {
  return (
    <section className="flex flex-col gap-2.5">
      {/* Bay Tabs */}
      <div className="flex items-center justify-between gap-2 p-1 bg-[#0a0e18] border border-[#1c1f2a] rounded-xl">
        <button
          type="button"
          id="bay1-btn"
          onClick={() => onSelectBay(1)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${
            selectedBay === 1
              ? 'bg-[#262a35] text-[#dbfcff] shadow-sm border border-[#00f0ff]/30'
              : 'text-[#b9cacb] hover:text-[#dfe2f1] hover:bg-[#1c1f2a]/60'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              selectedBay === 1 ? 'bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]' : 'bg-[#849495]'
            }`}
          ></span>
          <span className="font-display text-xs md:text-sm tracking-wider font-semibold">
            KHOANG 01
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold tracking-tight ${
              selectedBay === 1
                ? 'bg-[#00f0ff]/15 text-[#00f0ff]'
                : 'bg-[#313540] text-[#b9cacb]'
            }`}
          >
            {bay1StatusText}
          </span>
        </button>

        <button
          type="button"
          id="bay2-btn"
          onClick={() => onSelectBay(2)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${
            selectedBay === 2
              ? 'bg-[#262a35] text-[#dbfcff] shadow-sm border border-[#00f0ff]/30'
              : 'text-[#b9cacb] hover:text-[#dfe2f1] hover:bg-[#1c1f2a]/60'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              selectedBay === 2 ? 'bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]' : 'bg-[#849495]'
            }`}
          ></span>
          <span className="font-display text-xs md:text-sm tracking-wider font-semibold">
            KHOANG 02
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold tracking-tight ${
              selectedBay === 2
                ? 'bg-[#00f0ff]/15 text-[#00f0ff]'
                : 'bg-[#313540] text-[#b9cacb]'
            }`}
          >
            {bay2StatusText}
          </span>
        </button>
      </div>

      {/* HUD Diagnostics Chip Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#1c1f2a] border border-[#262a35] rounded-lg">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
          </span>
          <span className="text-[10px] md:text-xs text-[#dbfcff] font-display uppercase tracking-widest truncate font-semibold">
            AI VISION & LiDAR ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-3 text-[#b9cacb] text-xs font-mono">
          <span className="flex items-center gap-1">
            <span className="text-[#849495] font-display text-[10px]">FPS:</span>
            <span className="text-[#dbfcff] font-bold">{fps}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#3b494b]"></span>
          <span className="flex items-center gap-1">
            <span className="text-[#849495] font-display text-[10px]">LATENCY:</span>
            <span className="text-[#00f0ff] font-bold">{latencyMs}ms</span>
          </span>
        </div>
      </div>
    </section>
  );
};
