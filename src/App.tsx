import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BaySelector } from './components/BaySelector';
import { CctvHud } from './components/CctvHud';
import { TelemetryGrid } from './components/TelemetryGrid';
import { CycleProgress } from './components/CycleProgress';
import { DamageAuditModal } from './components/DamageAuditModal';
import { EmergencyStopModal } from './components/EmergencyStopModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ProfileModal } from './components/ProfileModal';
import { BottomNav, TabId } from './components/BottomNav';
import { QueueScreen } from './components/QueueScreen';
import { EquipmentScreen } from './components/EquipmentScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { INITIAL_VEHICLE_BAY1, INITIAL_VEHICLE_BAY2, QUEUE_VEHICLES } from './data/mockData';
import { Vehicle } from './types/wash';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('control');
  const [selectedBay, setSelectedBay] = useState<1 | 2>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isEmergencyTriggered, setIsEmergencyTriggered] = useState(false);
  const [isDamageAuditOpen, setIsDamageAuditOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Vehicles
  const [bay1Vehicle] = useState<Vehicle>(INITIAL_VEHICLE_BAY1);
  const [bay2Vehicle, setBay2Vehicle] = useState<Vehicle>(INITIAL_VEHICLE_BAY2);
  const [queueList, setQueueList] = useState<Vehicle[]>(QUEUE_VEHICLES);
  const [snapshots, setSnapshots] = useState<Array<{ time: string; url: string; note: string }>>([]);

  // Telemetry real-time values
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(135); // 02:15
  const [pressureBar, setPressureBar] = useState(118);
  const [flowRateLpm, setFlowRateLpm] = useState(45);
  const [robotDistance, setRobotDistance] = useState(0.45);
  const [fps, setFps] = useState(30);
  const [latencyMs, setLatencyMs] = useState(18);

  // Active vehicle based on selected bay
  const currentVehicle = selectedBay === 1 ? bay1Vehicle : bay2Vehicle;

  // Real-time ticking cycle simulation
  useEffect(() => {
    if (isPaused || isCompleted || isEmergencyTriggered) return;

    const interval = setInterval(() => {
      setTotalSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });

      // Realistic telemetry subtle fluctuations
      setPressureBar(118 + Math.floor(Math.sin(Date.now() / 1500) * 3));
      setFlowRateLpm(45 + Math.floor(Math.cos(Date.now() / 2000) * 2));
      setRobotDistance(0.45 + Number((Math.sin(Date.now() / 3000) * 0.01).toFixed(2)));
      setFps(29 + Math.floor(Math.random() * 3));
      setLatencyMs(17 + Math.floor(Math.random() * 3));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isCompleted, isEmergencyTriggered]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTakeSnapshot = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newSnap = {
      time: timeStr,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf_r0FReJtBOEenVx9alU0PwdsqUZK9AuIWcMLsYlNv6a-ZOH5Jgv90Q-cvf-4r_Mu32q5B9_FwmHL9AoCjoElHLGVNLBUO874L_SrVDKtYAnJADCXdn_f2WBZAlu4E6tMsP0AQTLpVdLhKvGhYFBkk5yVjSlWDHx8IgbGpPAIgl3L9QXEynUlF9BlTrPQvQo5HvzuQh0N_-DeLyHtes_2EUgL6dh-ITE7bhJwy90R3D38m43AXuByaA',
      note: `Góc Cam ${timeStr} - Mặt sơn hoàn hảo`,
    };
    setSnapshots((prev) => [newSnap, ...prev]);
    showToast(`Đã chụp lưu vết giám sát quang học AI cho xe ${currentVehicle.plate}`);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    showToast(isPaused ? 'Đã tiếp tục chu trình rửa khoang' : 'Đã tạm dừng khoang an toàn');
  };

  const handleCompleteWash = () => {
    setIsCompleted(true);
    setTotalSecondsLeft(0);
    showToast(`Đã hoàn thành chu trình rửa cho xe ${currentVehicle.plate}. Cửa xả khoang tự động nâng lên.`);
  };

  const handleTriggerEmergencyStop = () => {
    setIsEmergencyTriggered(true);
    setIsPaused(true);
    showToast('KHẨN CẤP: ĐÃ NGẮT TOÀN BỘ NGUỒN ĐIỆN VÀ BƠM ÁP LỰC!');
  };

  const handleResetEmergencyStop = () => {
    setIsEmergencyTriggered(false);
    setIsEmergencyOpen(false);
    setIsPaused(false);
    showToast('Đã mở khóa an toàn và khôi phục hệ thống tự động.');
  };

  const handleAssignToBay2 = (vehicle: Vehicle) => {
    setBay2Vehicle({ ...vehicle, status: 'washing' });
    setQueueList((prev) => prev.filter((v) => v.plate !== vehicle.plate));
    setSelectedBay(2);
    setActiveTab('control');
    showToast(`Đã điều phối xe ${vehicle.plate} (${vehicle.model}) vào Khoang 02!`);
  };

  const handleAddQueueVehicle = (newCar: Vehicle) => {
    setQueueList((prev) => [...prev, newCar]);
    showToast(`Đã quét mã nhận diện cho xe ${newCar.plate} vào hàng đợi!`);
  };

  // Format countdown string MM:SS
  const mins = Math.floor(totalSecondsLeft / 60);
  const secs = totalSecondsLeft % 60;
  const timeLeftFormatted = isCompleted
    ? '00:00 - HOÀN TẤT'
    : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="bg-[#0f131d] min-h-screen text-[#dfe2f1] flex flex-col font-body antialiased selection:bg-[#00f0ff] selection:text-[#00363a]">
      {/* Top App Header */}
      <Header
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onEmergencyStop={() => setIsEmergencyOpen(true)}
        isEmergencyActive={isEmergencyTriggered}
        unreadCount={4}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#0a0e18]/95 border border-[#00f0ff] text-[#dbfcff] shadow-2xl text-xs sm:text-sm font-display flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200 max-w-md w-[90%]">
          <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">verified</span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-4 pb-28 flex flex-col">
        {/* TAB 1: ĐIỀU KHIỂN (Control & Machine Vision Telemetry) */}
        {activeTab === 'control' && (
          <div className="flex flex-col w-full space-y-4">
            {/* 1. Bay Selector & HUD Chip Bar */}
            <BaySelector
              selectedBay={selectedBay}
              onSelectBay={(bay) => setSelectedBay(bay)}
              bay1StatusText={isCompleted && selectedBay === 1 ? 'HOÀN THÀNH' : isPaused && selectedBay === 1 ? 'TẠM DỪNG' : 'ĐANG RỬA'}
              bay2StatusText={selectedBay === 2 && bay2Vehicle.status === 'washing' ? 'ĐANG RỬA' : 'SẴN SÀNG'}
              fps={fps}
              latencyMs={latencyMs}
            />

            {/* 2. Machine Vision AI Live HUD Feed */}
            <CctvHud
              vehicle={currentVehicle}
              robotDistanceMeters={robotDistance}
              alignmentOffsetCm={1.2}
              alignmentConfidencePercent={99.8}
              onTakeSnapshot={handleTakeSnapshot}
              isPaused={isPaused || isEmergencyTriggered}
            />

            {/* 3. Real-time AI Telemetry Grid (4/4 Sensors) */}
            <TelemetryGrid
              robotDistance={robotDistance}
              roofSensorOffsetCm={12}
              mirrorSealedPercent={100}
              obstacleCount={0.0}
            />

            {/* 4. Live Wash Cycle Progress & Fluid Dynamics */}
            <CycleProgress
              currentStep={isCompleted ? 5 : 3}
              totalSteps={5}
              stepTitle={
                isCompleted
                  ? 'Chu trình rửa hoàn thành - Đang mở cửa xả'
                  : 'Phun bọt tuyết & Chổi sườn xoay'
              }
              progressPercent={isCompleted ? 100 : 60}
              timeLeftFormatted={timeLeftFormatted}
              pressureBar={isEmergencyTriggered ? 0 : pressureBar}
              flowRateLpm={isEmergencyTriggered ? 0 : flowRateLpm}
              isPaused={isPaused || isEmergencyTriggered}
            />

            {/* 5. Inspection Audit Card & Technician Commands */}
            <section className="space-y-3">
              {/* AI Damage Audit Preview Card */}
              <button
                type="button"
                onClick={() => setIsDamageAuditOpen(true)}
                className="w-full p-3 bg-[#262a35] hover:bg-[#313540] rounded-xl flex items-center justify-between text-left transition-colors border border-[#3b494b]/40 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0a0e18] flex items-center justify-center shrink-0 text-[#00f0ff] border border-[#262a35]">
                    <span className="material-symbols-outlined text-[22px]">document_scanner</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm text-[#dbfcff] font-display font-semibold">
                      Báo Cáo Quét Vết Xước (AI Damage Audit)
                    </span>
                    <span className="text-[11px] text-[#b9cacb] truncate font-display">
                      0 phát hiện mới • Khớp hồ sơ lúc xe vào cổng
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#00f0ff]">chevron_right</span>
              </button>

              {/* Technician Actuators: Pause & Complete Wash */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* Pause Bay Action */}
                <button
                  type="button"
                  id="pause-btn"
                  onClick={handleTogglePause}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-display text-xs sm:text-sm font-semibold transition-all active:scale-95 border ${
                    isPaused
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/40'
                      : 'bg-[#313540] hover:bg-[#353944] text-[#ffb4ab] border-[#3b494b]/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isPaused ? 'play_circle' : 'pause_circle'}
                  </span>
                  <span>{isPaused ? 'Tiếp Tục Rửa' : 'Tạm Dừng Khoang'}</span>
                </button>

                {/* Finish Wash Override */}
                <button
                  type="button"
                  onClick={handleCompleteWash}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#0566d9] hover:bg-[#0566d9]/90 text-[#e6ecff] font-display text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 border border-[#adc6ff]/30"
                >
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  <span>Hoàn Thành Rửa</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: HÀNG ĐỢI (Queue Management) */}
        {activeTab === 'queue' && (
          <QueueScreen
            vehicles={queueList}
            onAssignToBay2={handleAssignToBay2}
            onAddVehicle={handleAddQueueVehicle}
          />
        )}

        {/* TAB 3: THIẾT BỊ (Equipment SCADA & Pumps) */}
        {activeTab === 'equipment' && <EquipmentScreen />}

        {/* TAB 4: CÀI ĐẶT (Settings & Calibration) */}
        {activeTab === 'settings' && <SettingsScreen />}
      </main>

      {/* Modals & Dialogs */}
      <DamageAuditModal
        isOpen={isDamageAuditOpen}
        onClose={() => setIsDamageAuditOpen(false)}
        vehicle={currentVehicle}
        snapshotList={snapshots}
      />

      <EmergencyStopModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onConfirmEStop={handleTriggerEmergencyStop}
        isTriggered={isEmergencyTriggered}
        onResetEStop={handleResetEmergencyStop}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClear={() => {
          showToast('Đã xóa tất cả thông báo hệ thống.');
          setIsNotificationsOpen(false);
        }}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        queueBadgeCount={queueList.length}
      />
    </div>
  );
}
