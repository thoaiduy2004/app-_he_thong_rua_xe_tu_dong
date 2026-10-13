import React, { useState } from 'react';
import { CHEMICAL_TANKS, PUMP_STATIONS } from '../data/mockData';

export const EquipmentScreen: React.FC = () => {
  const [tanks, setTanks] = useState(CHEMICAL_TANKS);
  const [testingItem, setTestingItem] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleTestActuator = (label: string) => {
    setTestingItem(label);
    setActionMessage(`Đang chạy kiểm thử: ${label}...`);
    setTimeout(() => {
      setTestingItem(null);
      setActionMessage(`Hoàn tất kiểm thử ${label}. Áp suất và van điện từ đạt chuẩn.`);
      setTimeout(() => setActionMessage(null), 3000);
    }, 1500);
  };

  const handleRefillTank = (tankId: string) => {
    setTanks((prev) =>
      prev.map((t) => (t.id === tankId ? { ...t, levelPercent: 100, volumeLiters: t.capacityLiters } : t))
    );
    setActionMessage('Đã châm đầy bồn hóa chất thành công!');
    setTimeout(() => setActionMessage(null), 3000);
  };

  return (
    <div className="flex flex-col space-y-4 pb-6">
      {/* SCADA Status Overview */}
      <div className="p-4 bg-[#1c1f2a] border border-[#262a35] rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
          </div>
          <div>
            <h2 className="text-sm md:text-base font-display font-bold text-[#dbfcff]">
              HỆ THỐNG THIẾT BỊ SCADA & BƠM CAO ÁP
            </h2>
            <p className="text-xs text-[#b9cacb]">
              Điện áp 380V 3 Pha • Khí nén 8.5 Bar • Nước tinh khiết RO sẵn sàng
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
          TẤT CẢ KHẢ DỤNG
        </span>
      </div>

      {actionMessage && (
        <div className="p-3 bg-[#0a0e18] border border-[#00f0ff]/40 rounded-xl text-xs text-[#00f0ff] font-display flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
          <span>{actionMessage}</span>
        </div>
      )}

      {/* High Pressure Pumps Grid */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-[#dfe2f1] font-display uppercase tracking-wider font-semibold">
            TRẠM BƠM VÀ QUẠT CÔNG NGHIỆP
          </span>
          <span className="text-xs text-[#00f0ff] font-mono">4/4 ĐỘNG CƠ BÌNH THƯỜNG</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PUMP_STATIONS.map((pump) => (
            <div
              key={pump.id}
              className="p-3.5 bg-[#1c1f2a] border border-[#262a35] rounded-xl flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-display font-semibold text-[#dbfcff]">
                    {pump.name}
                  </h4>
                  <span className="text-[11px] text-[#b9cacb] font-display">{pump.category}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                    pump.status === 'RUNNING'
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30'
                      : 'bg-[#313540] text-[#b9cacb]'
                  }`}
                >
                  {pump.status === 'RUNNING' ? 'ĐANG CHẠY' : 'CHỜ LỆNH'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-[#0a0e18] p-2.5 rounded-lg border border-[#262a35] text-center">
                <div>
                  <span className="text-[10px] text-[#849495] font-display block">Áp Suất</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#dbfcff]">
                    {pump.pressureBar} Bar
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#849495] font-display block">Nhiệt Độ</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#adc6ff]">
                    {pump.tempCelsius}°C
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#849495] font-display block">Công Suất</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#00f0ff]">
                    {pump.powerKw} kW
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chemical Dosing Reservoirs */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-[#dfe2f1] font-display uppercase tracking-wider font-semibold">
            BỒN HÓA CHẤT & NƯỚC RO SPOT-FREE
          </span>
          <span className="text-xs text-[#adc6ff] font-mono">ĐỊNH LƯỢNG TỰ ĐỘNG</span>
        </div>

        <div className="space-y-2.5">
          {tanks.map((tank) => (
            <div
              key={tank.id}
              className="p-3 bg-[#1c1f2a] border border-[#262a35] rounded-xl flex flex-col space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-display font-semibold text-[#dbfcff]">
                    {tank.name}
                  </span>
                  <span className="text-[11px] text-[#b9cacb] block font-display">
                    {tank.type} • Tiêu hao ~{tank.dosingRateMlPerCar} ml/xe
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#dbfcff]">
                    {tank.volumeLiters}/{tank.capacityLiters} L ({tank.levelPercent}%)
                  </span>
                  {tank.levelPercent < 70 && (
                    <button
                      onClick={() => handleRefillTank(tank.id)}
                      className="px-2 py-0.5 rounded bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/40 text-[10px] font-display font-medium"
                    >
                      Nạp Đầy
                    </button>
                  )}
                </div>
              </div>

              {/* Tank Fill Level Bar */}
              <div className="w-full bg-[#0a0e18] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${tank.levelPercent}%`,
                    backgroundColor: tank.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manual Actuator Testing Panel */}
      <section className="p-4 bg-[#1c1f2a] border border-[#262a35] rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-display font-semibold text-[#dfe2f1] uppercase tracking-wider">
            BẢNG THỬ NGHIỆM THỦ CÔNG (ACTUATOR OVERRIDES)
          </span>
          <span className="text-[11px] text-[#849495] font-mono">DÀNH CHO KỸ THUẬT VIÊN</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => handleTestActuator('Phun Nước Áp Lực 118 Bar')}
            disabled={!!testingItem}
            className="p-2.5 rounded-lg bg-[#262a35] hover:bg-[#313540] text-[#dbfcff] border border-[#3b494b]/60 text-xs font-display font-medium flex flex-col items-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px] text-[#00f0ff]">water</span>
            <span>Thử Vòi Phun</span>
          </button>

          <button
            onClick={() => handleTestActuator('Định Lượng Bọt Tuyết')}
            disabled={!!testingItem}
            className="p-2.5 rounded-lg bg-[#262a35] hover:bg-[#313540] text-[#dbfcff] border border-[#3b494b]/60 text-xs font-display font-medium flex flex-col items-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px] text-[#adc6ff]">soap</span>
            <span>Thử Bọt Tuyết</span>
          </button>

          <button
            onClick={() => handleTestActuator('Quạt Thổi Khí Nóng')}
            disabled={!!testingItem}
            className="p-2.5 rounded-lg bg-[#262a35] hover:bg-[#313540] text-[#dbfcff] border border-[#3b494b]/60 text-xs font-display font-medium flex flex-col items-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffd19c]">mode_fan</span>
            <span>Thử Tuabin Sấy</span>
          </button>

          <button
            onClick={() => handleTestActuator('Hiệu Chuẩn Cảm Biến LiDAR & Laser')}
            disabled={!!testingItem}
            className="p-2.5 rounded-lg bg-[#262a35] hover:bg-[#313540] text-[#dbfcff] border border-[#3b494b]/60 text-xs font-display font-medium flex flex-col items-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px] text-[#00f0ff]">radar</span>
            <span>Ping Cảm Biến</span>
          </button>
        </div>
      </section>
    </div>
  );
};
