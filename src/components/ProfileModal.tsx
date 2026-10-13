import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e18]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1c1f2a] border border-[#262a35] rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#262a35] pb-3">
          <h3 className="text-base font-display font-bold text-[#dbfcff]">
            HỒ SƠ KỸ THUẬT VIÊN VẬN HÀNH
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#262a35] flex items-center justify-center text-[#b9cacb]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex items-center gap-3.5 p-3 bg-[#0a0e18] rounded-xl border border-[#262a35]">
          <div className="w-12 h-12 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/50 flex items-center justify-center text-[#00f0ff] font-display font-bold text-lg">
            MQ
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-[#dfe2f1]">Nguyễn Minh Quân</h4>
            <span className="text-[11px] text-[#00f0ff] font-mono">ID: TECH-AW-8920</span>
            <div className="text-[10px] text-[#b9cacb] mt-0.5">Chứng chỉ Tự động hóa & SCADA L4</div>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-[#262a35]">
            <span className="text-[#849495]">Trực tại khoang:</span>
            <span className="text-[#dbfcff] font-mono font-semibold">Khoang 01 & 02</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#262a35]">
            <span className="text-[#849495]">Thời gian ca trực:</span>
            <span className="text-[#dbfcff] font-mono font-semibold">07:00 - 15:00</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#262a35]">
            <span className="text-[#849495]">Số xe đã rửa hôm nay:</span>
            <span className="text-[#00f0ff] font-mono font-bold">48 Xe</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#849495]">Tỷ lệ đạt chuẩn AI:</span>
            <span className="text-emerald-400 font-mono font-bold">100% Không Lỗi</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 text-xs font-display font-semibold transition-colors"
        >
          Xác Nhận & Quay Lại
        </button>
      </div>
    </div>
  );
};
