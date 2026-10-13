import React, { useState } from 'react';
import { Vehicle } from '../types/wash';

interface QueueScreenProps {
  vehicles: Vehicle[];
  onAssignToBay2: (vehicle: Vehicle) => void;
  onAddVehicle: (newVehicle: Vehicle) => void;
}

export const QueueScreen: React.FC<QueueScreenProps> = ({
  vehicles,
  onAssignToBay2,
  onAddVehicle,
}) => {
  const [filterLane, setFilterLane] = useState<'ALL' | 'AutoPass' | 'Thường'>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlate, setNewPlate] = useState('51H - 772.19');
  const [newModel, setNewModel] = useState('BMW 330i M Sport');
  const [newPackage, setNewPackage] = useState('Gói Cao Cấp Diamond Ceramic');

  const filteredVehicles = vehicles.filter(
    (v) => filterLane === 'ALL' || v.lane === filterLane
  );

  const handleCreateCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlate.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const vehicle: Vehicle = {
      plate: newPlate.toUpperCase(),
      model: newModel,
      modelConfidence: 99.2,
      rfidStatus: 'OK',
      color: 'Xanh Mineral Blue',
      washPackage: newPackage,
      arrivalTime: timeStr,
      estimatedWaitMinutes: vehicles.length * 3,
      lane: 'AutoPass',
      status: 'waiting',
    };
    onAddVehicle(vehicle);
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col space-y-4 pb-6">
      {/* Header Banner */}
      <div className="p-4 bg-[#1c1f2a] border border-[#262a35] rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">traffic</span>
          </div>
          <div>
            <h2 className="text-sm md:text-base font-display font-bold text-[#dbfcff]">
              ĐIỀU PHỐI HÀNG ĐỢI & VÀO KHOANG
            </h2>
            <p className="text-xs text-[#b9cacb]">
              Cổng nhận diện LPR & làn RFID AutoPass đang hoạt động
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-2 rounded-lg bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/40 font-display text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span className="hidden sm:inline">Quét Xe Mới</span>
        </button>
      </div>

      {/* Lane Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-[#0a0e18] border border-[#1c1f2a] rounded-xl">
        <button
          onClick={() => setFilterLane('ALL')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-display font-medium transition-colors ${
            filterLane === 'ALL'
              ? 'bg-[#262a35] text-[#00f0ff] border border-[#00f0ff]/30'
              : 'text-[#b9cacb] hover:text-[#dfe2f1]'
          }`}
        >
          Tất cả ({vehicles.length})
        </button>
        <button
          onClick={() => setFilterLane('AutoPass')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-display font-medium transition-colors ${
            filterLane === 'AutoPass'
              ? 'bg-[#262a35] text-[#00f0ff] border border-[#00f0ff]/30'
              : 'text-[#b9cacb] hover:text-[#dfe2f1]'
          }`}
        >
          Làn RFID AutoPass
        </button>
        <button
          onClick={() => setFilterLane('Thường')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-display font-medium transition-colors ${
            filterLane === 'Thường'
              ? 'bg-[#262a35] text-[#00f0ff] border border-[#00f0ff]/30'
              : 'text-[#b9cacb] hover:text-[#dfe2f1]'
          }`}
        >
          Làn Soát Vé Thường
        </button>
      </div>

      {/* Vehicle Queue Cards */}
      <div className="space-y-3">
        {filteredVehicles.map((car, index) => (
          <div
            key={car.plate}
            className="p-3.5 bg-[#1c1f2a] border border-[#262a35] hover:border-[#00f0ff]/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors shadow-sm"
          >
            {/* Left Info */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a0e18] border border-[#262a35] flex items-center justify-center text-xs font-mono font-bold text-[#00f0ff] shrink-0 mt-0.5">
                #{index + 1}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm md:text-base font-bold text-[#dbfcff] tracking-wider">
                    {car.plate}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase ${
                      car.lane === 'AutoPass'
                        ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                        : 'bg-[#313540] text-[#b9cacb]'
                    }`}
                  >
                    {car.lane}
                  </span>
                  <span className="text-[10px] text-[#849495] font-mono">
                    {car.arrivalTime}
                  </span>
                </div>
                <div className="text-xs text-[#dfe2f1] font-display font-medium">
                  {car.model} • <span className="text-[#b9cacb]">{car.color}</span>
                </div>
                <div className="text-[11px] text-[#adc6ff] mt-0.5 truncate">
                  {car.washPackage}
                </div>
              </div>
            </div>

            {/* Right Status & Action */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#262a35]">
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-[#849495] font-display block">Ước tính chờ:</span>
                <span className="text-xs font-mono font-bold text-[#00f0ff]">
                  ~{car.estimatedWaitMinutes} phút
                </span>
              </div>

              <button
                onClick={() => onAssignToBay2(car)}
                className="px-3 py-2 rounded-lg bg-[#0566d9] hover:bg-[#0566d9]/80 text-[#e6ecff] font-display text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">input</span>
                <span>Vào Khoang 02</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Car Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0e18]/85 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCar}
            className="bg-[#1c1f2a] border border-[#262a35] rounded-2xl p-5 max-w-md w-full space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#262a35] pb-3">
              <h3 className="text-base font-display font-bold text-[#dbfcff]">
                MÔ PHỎNG QUÉT XE VÀO CỔNG (LPR/RFID)
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-[#262a35] flex items-center justify-center text-[#b9cacb]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#b9cacb] font-display block mb-1">
                  Biển số xe:
                </label>
                <input
                  type="text"
                  value={newPlate}
                  onChange={(e) => setNewPlate(e.target.value)}
                  className="w-full bg-[#0a0e18] border border-[#262a35] rounded-lg px-3 py-2 text-sm font-mono text-[#dbfcff] focus:border-[#00f0ff] outline-none"
                  placeholder="30K - 999.88"
                />
              </div>

              <div>
                <label className="text-xs text-[#b9cacb] font-display block mb-1">
                  Dòng xe nhận diện AI:
                </label>
                <input
                  type="text"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  className="w-full bg-[#0a0e18] border border-[#262a35] rounded-lg px-3 py-2 text-sm font-display text-[#dbfcff] focus:border-[#00f0ff] outline-none"
                  placeholder="VinFast VF9 / Mercedes C300"
                />
              </div>

              <div>
                <label className="text-xs text-[#b9cacb] font-display block mb-1">
                  Gói dịch vụ đã đăng ký:
                </label>
                <select
                  value={newPackage}
                  onChange={(e) => setNewPackage(e.target.value)}
                  className="w-full bg-[#0a0e18] border border-[#262a35] rounded-lg px-3 py-2 text-xs font-display text-[#dbfcff] focus:border-[#00f0ff] outline-none"
                >
                  <option value="Gói Cao Cấp Diamond Ceramic">Gói Cao Cấp Diamond Ceramic (Đầy đủ)</option>
                  <option value="Gói Tiêu Chuẩn Super Foam">Gói Tiêu Chuẩn Super Foam (Bọt tuyết + Sấy)</option>
                  <option value="Gói Rửa Nhanh Touchless Express">Gói Rửa Nhanh Touchless Express</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-lg bg-[#262a35] text-[#b9cacb] font-display text-xs font-semibold"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-lg bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50 font-display text-xs font-semibold"
              >
                Xác Nhận Thêm Vào Hàng Đợi
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
