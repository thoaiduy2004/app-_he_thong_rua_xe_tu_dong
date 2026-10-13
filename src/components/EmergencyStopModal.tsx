import React from 'react';

interface EmergencyStopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmEStop: () => void;
  isTriggered: boolean;
  onResetEStop: () => void;
}

export const EmergencyStopModal: React.FC<EmergencyStopModalProps> = ({
  isOpen,
  onClose,
  onConfirmEStop,
  isTriggered,
  onResetEStop,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1c1f2a] border-2 border-red-500/80 rounded-2xl p-5 max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.3)] space-y-4">
        {/* Warning Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-950 flex items-center justify-center text-red-400 border border-red-500/40 shrink-0">
            <span className="material-symbols-outlined text-[28px] animate-pulse">emergency</span>
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-red-300 uppercase tracking-wider">
              {isTriggered ? 'HỆ THỐNG ĐÃ KÍCH HOẠT E-STOP' : 'XÁC NHẬN DỪNG KHẨN CẤP (E-STOP)'}
            </h3>
            <p className="text-xs text-[#b9cacb]">Interlock ngắt toàn bộ điện áp 380V & vòi phun áp lực</p>
          </div>
        </div>

        {/* Diagnostic Status Box */}
        <div className="p-3 bg-[#0a0e18] rounded-xl border border-red-900/40 text-xs space-y-2">
          <div className="flex justify-between text-[#dfe2f1]">
            <span className="text-[#849495]">Bơm cao áp 118 Bar:</span>
            <span className={`font-mono font-bold ${isTriggered ? 'text-red-400' : 'text-[#00f0ff]'}`}>
              {isTriggered ? 'ĐÃ CẮT NGUỒN' : 'ĐANG CHỜ LỆNH'}
            </span>
          </div>
          <div className="flex justify-between text-[#dfe2f1]">
            <span className="text-[#849495]">Tay robot & Chổi xoay:</span>
            <span className={`font-mono font-bold ${isTriggered ? 'text-red-400' : 'text-[#00f0ff]'}`}>
              {isTriggered ? 'KHÓA PHANH CƠ' : 'HOẠT ĐỘNG'}
            </span>
          </div>
          <div className="flex justify-between text-[#dfe2f1]">
            <span className="text-[#849495]">Van xả áp suất khẩn cấp:</span>
            <span className={`font-mono font-bold ${isTriggered ? 'text-emerald-400' : 'text-[#849495]'}`}>
              {isTriggered ? 'ĐÃ XẢ HOÀN TOÀN' : 'ĐÓNG'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-2">
          {!isTriggered ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-[#262a35] hover:bg-[#313540] text-[#dfe2f1] font-display text-xs font-semibold transition-colors"
              >
                Hủy Bỏ
              </button>
              <button
                onClick={onConfirmEStop}
                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-display text-xs font-bold uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
                <span>KÍCH HOẠT E-STOP</span>
              </button>
            </>
          ) : (
            <button
              onClick={onResetEStop}
              className="w-full py-2.5 rounded-lg bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50 font-display text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">lock_reset</span>
              <span>MỞ KHÓA & KHỞI ĐỘNG LẠI HỆ THỐNG</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
