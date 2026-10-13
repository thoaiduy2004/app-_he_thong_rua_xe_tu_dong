import React, { useState } from 'react';
import { Vehicle } from '../types/wash';

interface DamageAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  snapshotList?: Array<{ time: string; url: string; note: string }>;
}

export const DamageAuditModal: React.FC<DamageAuditModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  snapshotList = [],
}) => {
  const [selectedAngle, setSelectedAngle] = useState<'door' | 'front' | 'rear'>('door');
  const [isExported, setIsExported] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExported(true);
    setTimeout(() => setIsExported(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e18]/85 backdrop-blur-md flex flex-col justify-end sm:justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#1c1f2a] border border-[#262a35] rounded-2xl p-4 sm:p-6 flex flex-col space-y-4 max-w-xl mx-auto w-full shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#262a35] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[24px]">verified</span>
            <div>
              <h2 className="text-base sm:text-lg text-[#dfe2f1] font-display font-semibold">
                Quét Lỗi Sơn & Vết Xước 3D (AI Damage Audit)
              </h2>
              <p className="text-xs text-[#b9cacb] font-mono">
                Xe {vehicle.plate} • {vehicle.model}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a35] hover:bg-[#313540] flex items-center justify-center text-[#b9cacb] hover:text-[#dfe2f1] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Angle Filter Chips */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#849495] font-display">Vị trí:</span>
          <button
            onClick={() => setSelectedAngle('door')}
            className={`px-2.5 py-1 rounded text-xs font-display font-medium transition-colors ${
              selectedAngle === 'door'
                ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40'
                : 'bg-[#262a35] text-[#b9cacb]'
            }`}
          >
            Sườn Trái & Cửa
          </button>
          <button
            onClick={() => setSelectedAngle('front')}
            className={`px-2.5 py-1 rounded text-xs font-display font-medium transition-colors ${
              selectedAngle === 'front'
                ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40'
                : 'bg-[#262a35] text-[#b9cacb]'
            }`}
          >
            Ca-lăng Trước & Nắp Ca-pô
          </button>
          <button
            onClick={() => setSelectedAngle('rear')}
            className={`px-2.5 py-1 rounded text-xs font-display font-medium transition-colors ${
              selectedAngle === 'rear'
                ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40'
                : 'bg-[#262a35] text-[#b9cacb]'
            }`}
          >
            Đuôi Xe & Cánh Gió
          </button>
        </div>

        {/* Dual Inspection Photos Comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#b9cacb] font-display">
                Lúc Xe Vào (08:42:10)
              </span>
              <span className="text-[10px] text-[#00f0ff] font-mono">Quét LPR Đầu</span>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-lg bg-[#0a0e18] border border-[#262a35] overflow-hidden group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt="Optical contour check"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrvau4h4kw0iyPVoOxeMEDz4Kxvnp1RCKMK3aR4u8nWcI5eoCrSeRUxvSFmURWuFHwcr9J4r_8A-45ZBKam0TIfSElMlZjeg--ct4qN5bFtoMHuBAFCJpa2ugeCgvwQw9KXxxuEufy4lahwQjPChH5BmIfAmmF4qiIVgiDiKsR5rkJgcCEqGiGTnpax6dN5p2dU0UmRoPNMSHPjFQsZfBaEfe8GppDY7CDWEIdQLj5-n3FONcoB1VhUQ"
              />
              <div className="absolute top-1.5 left-1.5 bg-[#0a0e18]/80 text-[#dbfcff] font-mono text-[9px] px-1.5 py-0.5 rounded border border-[#262a35]">
                BENCHMARK #01
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#b9cacb] font-display">
                Hiện Tại (08:44:05)
              </span>
              <span className="text-[10px] text-[#adc6ff] font-mono">Bọt Tuyết Bơm</span>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-lg bg-[#0a0e18] border border-[#262a35] overflow-hidden group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt="CCTV inspection snapshot"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf_r0FReJtBOEenVx9alU0PwdsqUZK9AuIWcMLsYlNv6a-ZOH5Jgv90Q-cvf-4r_Mu32q5B9_FwmHL9AoCjoElHLGVNLBUO874L_SrVDKtYAnJADCXdn_f2WBZAlu4E6tMsP0AQTLpVdLhKvGhYFBkk5yVjSlWDHx8IgbGpPAIgl3L9QXEynUlF9BlTrPQvQo5HvzuQh0N_-DeLyHtes_2EUgL6dh-ITE7bhJwy90R3D38m43AXuByaA"
              />
              <div className="absolute top-1.5 left-1.5 bg-[#0a0e18]/80 text-[#00f0ff] font-mono text-[9px] px-1.5 py-0.5 rounded border border-[#00f0ff]/40">
                ACTIVE CYCLE #02
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Snapshots Taken by Operator */}
        {snapshotList.length > 0 && (
          <div className="p-2.5 bg-[#0a0e18] rounded-lg border border-[#262a35] space-y-1.5">
            <span className="text-xs text-[#b9cacb] font-display font-medium">
              Ảnh chụp lưu vết thủ công trong ca ({snapshotList.length} ảnh):
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {snapshotList.map((sn, idx) => (
                <div key={idx} className="shrink-0 flex items-center gap-2 bg-[#1c1f2a] px-2 py-1 rounded text-xs font-mono">
                  <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">photo_camera</span>
                  <span>{sn.time}</span>
                  <span className="text-[#849495]">{sn.note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Report Card */}
        <div className="p-3 bg-[#0a0e18] border border-[#262a35] rounded-xl flex items-center justify-between text-[#dfe2f1]">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-[#dbfcff] font-display font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>
              Tình trạng bề mặt: AN TOÀN 100%
            </span>
            <span className="text-[11px] text-[#b9cacb] font-display">
              Đã đồng bộ biên bản điện tử bảo hiểm AutoWash Care
            </span>
          </div>
          <span className="material-symbols-outlined text-[#00f0ff] text-[24px]">
            format_image_left
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleExport}
            className="flex-1 py-2.5 rounded-lg bg-[#262a35] hover:bg-[#313540] text-[#dbfcff] font-display text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 border border-[#3b494b]/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isExported ? 'check_circle' : 'receipt_long'}
            </span>
            <span>{isExported ? 'Đã Xuất Biên Bản PDF' : 'Xuất Hồ Sơ Giám Sát'}</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/40 font-display text-xs sm:text-sm font-semibold transition-colors"
          >
            Đóng Cửa Sổ Báo Cáo
          </button>
        </div>
      </div>
    </div>
  );
};
