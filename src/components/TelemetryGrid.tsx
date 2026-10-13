import React from 'react';

interface TelemetryGridProps {
  robotDistance: number;
  roofSensorOffsetCm: number;
  mirrorSealedPercent: number;
  obstacleCount: number;
}

export const TelemetryGrid: React.FC<TelemetryGridProps> = ({
  robotDistance,
  roofSensorOffsetCm,
  mirrorSealedPercent,
  obstacleCount,
}) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs md:text-sm text-[#dfe2f1] font-display uppercase tracking-wider font-semibold">
          QUAN TRẮC BẢO VỆ PHƯƠNG TIỆN (AI TELEMETRY)
        </span>
        <span className="text-[10px] md:text-xs text-[#00f0ff] font-mono font-bold tracking-tight">
          4/4 CẢM BIẾN OK
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {/* Sensor 1: Robot Arm Clearance */}
        <div className="p-3 bg-[#1c1f2a] border border-[#262a35] rounded-xl flex flex-col justify-between space-y-2 hover:border-[#00f0ff]/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#b9cacb] font-display">Khoảng Cách Tay Robot</span>
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              precision_manufacturing
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl md:text-2xl text-[#dbfcff] font-bold font-mono">
              {robotDistance.toFixed(2)}
            </span>
            <span className="text-[11px] text-[#b9cacb] font-display">mét</span>
          </div>
          {/* Distance bar track */}
          <div className="w-full bg-[#0a0e18] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#00f0ff] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(10, (robotDistance / 0.6) * 100))}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#b9cacb] font-display">
            <span>Chuẩn: 0.40 - 0.50m</span>
            <span className="text-[#00f0ff] font-semibold">TỐI ƯU</span>
          </div>
        </div>

        {/* Sensor 2: Roof Obstacle / Roof Rack */}
        <div className="p-3 bg-[#1c1f2a] border border-[#262a35] rounded-xl flex flex-col justify-between space-y-2 hover:border-[#adc6ff]/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#b9cacb] font-display">Cảm Biến Nóc / Baga</span>
            <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">roofing</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl md:text-2xl text-[#adc6ff] font-bold font-mono">
              +{roofSensorOffsetCm}
            </span>
            <span className="text-[11px] text-[#b9cacb] font-display">cm nâng chổi</span>
          </div>
          <div className="w-full bg-[#0a0e18] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0566d9] h-full rounded-full transition-all duration-300"
              style={{ width: '85%' }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#b9cacb] font-display">
            <span>Phát hiện giá nóc</span>
            <span className="text-[#adc6ff] font-semibold">ĐÃ BẢO VỆ</span>
          </div>
        </div>

        {/* Sensor 3: Glass & Mirror Sealed Check */}
        <div className="p-3 bg-[#1c1f2a] border border-[#262a35] rounded-xl flex flex-col justify-between space-y-2 hover:border-[#00f0ff]/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#b9cacb] font-display">Kính & Gương Chiếu Hậu</span>
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              sensor_window
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl md:text-2xl text-[#dbfcff] font-bold font-mono">
              {mirrorSealedPercent}%
            </span>
            <span className="text-[11px] text-[#b9cacb] font-display">khép kín</span>
          </div>
          <div className="w-full bg-[#0a0e18] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#00f0ff] h-full rounded-full transition-all duration-300"
              style={{ width: `${mirrorSealedPercent}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#b9cacb] font-display">
            <span>Áp lực kính kín khít</span>
            <span className="text-[#00f0ff] font-semibold">AN TOÀN</span>
          </div>
        </div>

        {/* Sensor 4: Floor Obstacle Sonar */}
        <div className="p-3 bg-[#1c1f2a] border border-[#262a35] rounded-xl flex flex-col justify-between space-y-2 hover:border-[#00f0ff]/30 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#b9cacb] font-display">Dị Vật Sàn Rửa</span>
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">radar</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl md:text-2xl text-[#dbfcff] font-bold font-mono">
              {obstacleCount.toFixed(2)}
            </span>
            <span className="text-[11px] text-[#b9cacb] font-display">vật cản</span>
          </div>
          <div className="w-full bg-[#0a0e18] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#00f0ff] h-full rounded-full transition-all duration-300"
              style={{ width: '100%' }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#b9cacb] font-display">
            <span>Quét sàn 360° LiDAR</span>
            <span className="text-[#00f0ff] font-semibold">THÔNG SUỐT</span>
          </div>
        </div>
      </div>
    </section>
  );
};
