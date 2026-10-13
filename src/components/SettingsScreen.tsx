import React, { useState } from 'react';

export const SettingsScreen: React.FC = () => {
  const [minConfidence, setMinConfidence] = useState(95);
  const [safetyClearance, setSafetyClearance] = useState(0.45);
  const [wheelTolerance, setWheelTolerance] = useState(3.0);
  const [autoOpenBarrier, setAutoOpenBarrier] = useState(true);
  const [audibleAlarms, setAudibleAlarms] = useState(true);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="flex flex-col space-y-4 pb-6">
      {/* Settings Header */}
      <div className="p-4 bg-[#1c1f2a] border border-[#262a35] rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">tune</span>
          </div>
          <div>
            <h2 className="text-sm md:text-base font-display font-bold text-[#dbfcff]">
              THIẾT LẬP THÔNG SỐ AI & AN TOÀN KHOANG
            </h2>
            <p className="text-xs text-[#b9cacb]">
              Ngưỡng quang học Machine Vision, quét LiDAR 3D và barrier tự động
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-3.5 py-2 rounded-lg bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/40 font-display text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">save</span>
          <span>Lưu Cấu Hình</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-xs text-emerald-200 font-display flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
          <span>Đã lưu và đồng bộ toàn bộ tham số vào bộ điều khiển PLC Siemens!</span>
        </div>
      )}

      {/* AI Vision & LiDAR Settings */}
      <section className="p-4 bg-[#1c1f2a] border border-[#262a35] rounded-xl space-y-4">
        <span className="text-xs font-display font-semibold text-[#dfe2f1] uppercase tracking-wider block">
          NGƯỠNG THUẬT TOÁN AI VISION & CỰ LY ROBOT
        </span>

        {/* Clearance Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#b9cacb] font-display">Khoảng cách an toàn tay gantry:</span>
            <span className="text-[#00f0ff] font-mono font-bold">{safetyClearance.toFixed(2)} m</span>
          </div>
          <input
            type="range"
            min="0.35"
            max="0.65"
            step="0.01"
            value={safetyClearance}
            onChange={(e) => setSafetyClearance(parseFloat(e.target.value))}
            className="w-full accent-[#00f0ff] bg-[#0a0e18] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#849495] font-mono">
            <span>0.35m (Sát sơn)</span>
            <span>0.45m (Khuyên dùng)</span>
            <span>0.65m (Rộng)</span>
          </div>
        </div>

        {/* Confidence Floor */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#b9cacb] font-display">Độ tin cậy nhận diện xe (LPR/Contour):</span>
            <span className="text-[#00f0ff] font-mono font-bold">{minConfidence}%</span>
          </div>
          <input
            type="range"
            min="80"
            max="99"
            step="1"
            value={minConfidence}
            onChange={(e) => setMinConfidence(parseInt(e.target.value))}
            className="w-full accent-[#00f0ff] bg-[#0a0e18] cursor-pointer"
          />
        </div>

        {/* Wheel Offset Tolerance */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#b9cacb] font-display">Dung sai lệch tâm bánh xe laser:</span>
            <span className="text-[#00f0ff] font-mono font-bold">±{wheelTolerance.toFixed(1)} cm</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="6.0"
            step="0.5"
            value={wheelTolerance}
            onChange={(e) => setWheelTolerance(parseFloat(e.target.value))}
            className="w-full accent-[#00f0ff] bg-[#0a0e18] cursor-pointer"
          />
        </div>
      </section>

      {/* Safety Interlocks & Toggles */}
      <section className="p-4 bg-[#1c1f2a] border border-[#262a35] rounded-xl space-y-3">
        <span className="text-xs font-display font-semibold text-[#dfe2f1] uppercase tracking-wider block">
          CƠ CHẾ BẢO VỆ TỰ ĐỘNG & BÁO ĐỘNG
        </span>

        <div className="flex items-center justify-between py-2 border-b border-[#262a35]">
          <div>
            <span className="text-xs sm:text-sm font-display font-semibold text-[#dbfcff] block">
              Tự Động Nâng Cửa Xả Sau Khi Rửa
            </span>
            <span className="text-[11px] text-[#b9cacb]">
              Cửa cuốn khoang tự động mở khi chu trình sấy hoàn thành
            </span>
          </div>
          <button
            onClick={() => setAutoOpenBarrier(!autoOpenBarrier)}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
              autoOpenBarrier ? 'bg-[#00f0ff]' : 'bg-[#313540]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#00363a] shadow-md transition-transform ${
                autoOpenBarrier ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-xs sm:text-sm font-display font-semibold text-[#dbfcff] block">
              Còi Báo Động Khi Phát Hiện Dị Vật Sàn
            </span>
            <span className="text-[11px] text-[#b9cacb]">
              Phát âm thanh còi hú khi LiDAR phát hiện người hoặc vật cản lạ
            </span>
          </div>
          <button
            onClick={() => setAudibleAlarms(!audibleAlarms)}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
              audibleAlarms ? 'bg-[#00f0ff]' : 'bg-[#313540]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#00363a] shadow-md transition-transform ${
                audibleAlarms ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>
      </section>

      {/* Facility & Operator Info */}
      <section className="p-4 bg-[#1c1f2a] border border-[#262a35] rounded-xl space-y-2">
        <span className="text-xs font-display font-semibold text-[#dfe2f1] uppercase tracking-wider block">
          THÔNG TIN TRẠM & KỸ THUẬT VIÊN TRỰC
        </span>
        <div className="p-3 bg-[#0a0e18] rounded-xl border border-[#262a35] text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[#849495]">Trạm:</span>
            <span className="text-[#dbfcff] font-mono">AutoWash PRO - Cơ Sở A5 Cầu Giấy</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#849495]">Kỹ thuật viên:</span>
            <span className="text-[#dbfcff] font-mono">Nguyễn Minh Quân (SCADA L4)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#849495]">Ca trực:</span>
            <span className="text-[#00f0ff] font-mono">Ca Sáng (07:00 - 15:00)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#849495]">Phiên bản Firmware:</span>
            <span className="text-[#adc6ff] font-mono">v4.2.8-RT-INDUSTRIAL</span>
          </div>
        </div>
      </section>
    </div>
  );
};
