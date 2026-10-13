import React from 'react';

interface CycleProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  progressPercent: number;
  timeLeftFormatted: string;
  pressureBar: number;
  flowRateLpm: number;
  isPaused: boolean;
}

export const CycleProgress: React.FC<CycleProgressProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
  progressPercent,
  timeLeftFormatted,
  pressureBar,
  flowRateLpm,
  isPaused,
}) => {
  const steps = [
    'Rửa gầm & Tráng áp lực cao',
    'Phun hóa chất bọt tuyết Active Foam',
    'Phun bọt tuyết & Chổi sườn xoay',
    'Tráng xả nước RO tinh khiết & Wax bóng',
    'Thổi khô đa hướng Contour Dryers',
  ];

  return (
    <section className="p-4 bg-[#1c1f2a] border border-[#262a35] rounded-xl space-y-3.5 shadow-md">
      {/* Header and Countdown */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isPaused ? 'bg-amber-400' : 'bg-[#00f0ff] animate-ping'
            }`}
          ></span>
          <span className="text-sm md:text-base text-[#dfe2f1] font-display font-semibold">
            TIẾN TRÌNH VẬN HÀNH
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#313540] border border-[#3b494b]/60 px-2.5 py-1 rounded">
          <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">timer</span>
          <span
            id="countdown-timer"
            className={`text-xs md:text-sm font-mono font-bold ${
              isPaused ? 'text-amber-400' : 'text-[#dbfcff]'
            }`}
          >
            {isPaused ? `${timeLeftFormatted} (TẠM DỪNG)` : timeLeftFormatted}
          </span>
        </div>
      </div>

      {/* Active Step Description */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm text-[#00f0ff] font-display font-semibold">
            BƯỚC {currentStep}/{totalSteps}: {stepTitle}
          </span>
          <span className="text-xs font-mono font-bold text-[#b9cacb]">{progressPercent}%</span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2 rounded-full bg-[#0a0e18] overflow-hidden flex">
          <div
            className="bg-[#00f0ff] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,240,255,0.4)]"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Step Micro Indicators */}
        <div className="flex items-center justify-between pt-1 px-0.5">
          {steps.map((st, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            return (
              <div key={idx} className="flex flex-col items-center gap-1 group relative">
                <div
                  className={`w-2 h-2 rounded-full transition-all ${
                    isCurrent
                      ? 'bg-[#00f0ff] ring-2 ring-[#00f0ff]/40 scale-125'
                      : isCompleted
                      ? 'bg-[#0566d9]'
                      : 'bg-[#313540]'
                  }`}
                />
                <span className="text-[9px] font-mono text-[#849495] hidden sm:block">0{stepNum}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pressure & Hydro Metrics */}
      <div className="flex items-center justify-between pt-1 border-t border-[#313540]/60 text-[#b9cacb]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">speed</span>
          <span className="text-[11px] font-display">Áp Lực Phun:</span>
          <span className="text-xs md:text-sm text-[#dfe2f1] font-bold font-mono">
            {pressureBar} Bar
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">water_drop</span>
          <span className="text-[11px] font-display">Lưu Lượng:</span>
          <span className="text-xs md:text-sm text-[#dfe2f1] font-bold font-mono">
            {flowRateLpm} L/phút
          </span>
        </div>
      </div>
    </section>
  );
};
