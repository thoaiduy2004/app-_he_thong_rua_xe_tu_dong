import React from 'react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onClear,
}) => {
  if (!isOpen) return null;

  const logs = [
    {
      id: '1',
      title: 'Quét Thẻ RFID AutoPass Thành Công',
      desc: 'Xe VinFast VF8 Plus (30K - 889.92) đã trừ phí gói Diamond Ceramic tự động.',
      time: '08:42:15',
      type: 'success',
      icon: 'check_circle',
    },
    {
      id: '2',
      title: 'Hiệu Chuẩn Căn Tâm Bánh Xe Laser Hoàn Tất',
      desc: 'Độ lệch tâm bánh xe: +1.2cm (nằm trong ngưỡng an toàn cho phép ±3.0cm).',
      time: '08:42:30',
      type: 'info',
      icon: 'radar',
    },
    {
      id: '3',
      title: 'Bảo Vệ Giá Nóc / Baga Kích Hoạt',
      desc: 'Cảm biến siêu âm nóc phát hiện thanh giá nóc thể thao; tự động nâng chổi trần +12cm.',
      time: '08:43:00',
      type: 'warning',
      icon: 'roofing',
    },
    {
      id: '4',
      title: 'Áp Suất Bơm Cao Áp Triplex 118 Bar Ổn Định',
      desc: 'Áp lực phun 118 Bar • Lưu lượng 45 L/phút • Nhiệt độ motor 41.5°C đạt chuẩn.',
      time: '08:43:45',
      type: 'info',
      icon: 'speed',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e18]/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#1c1f2a] border-l border-[#262a35] h-full flex flex-col p-4 sm:p-5 shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#262a35] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff]">notifications_active</span>
            <h3 className="font-display font-bold text-base text-[#dbfcff]">
              NHẬT KÝ SỰ KIỆN KHOANG & TELEMETRY
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#262a35] hover:bg-[#313540] flex items-center justify-center text-[#b9cacb]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
          {logs.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#0a0e18] border border-[#262a35] space-y-1 hover:border-[#00f0ff]/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-display font-semibold text-[#dbfcff] flex items-center gap-1.5">
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      item.type === 'success'
                        ? 'text-emerald-400'
                        : item.type === 'warning'
                        ? 'text-amber-400'
                        : 'text-[#00f0ff]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.title}
                </span>
                <span className="text-[10px] text-[#849495] font-mono">{item.time}</span>
              </div>
              <p className="text-[11px] text-[#b9cacb] pl-6">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-[#262a35] pt-3 flex gap-2">
          <button
            onClick={onClear}
            className="flex-1 py-2 rounded-lg bg-[#262a35] text-xs font-display font-medium text-[#b9cacb] hover:text-[#dfe2f1]"
          >
            Đánh Dấu Đã Đọc
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-[#00f0ff]/20 text-xs font-display font-semibold text-[#00f0ff] border border-[#00f0ff]/40"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
