import React, { useState, useRef } from 'react';
import { Vehicle } from '../types/wash';

interface CctvHudProps {
  vehicle: Vehicle;
  robotDistanceMeters: number;
  alignmentOffsetCm: number;
  alignmentConfidencePercent: number;
  onTakeSnapshot: () => void;
  isPaused?: boolean;
}

export const CctvHud: React.FC<CctvHudProps> = ({
  vehicle,
  robotDistanceMeters,
  alignmentOffsetCm,
  alignmentConfidencePercent,
  onTakeSnapshot,
  isPaused = false,
}) => {
  const [activeCam, setActiveCam] = useState<'CAM 01' | 'CAM 02' | 'CAM 03'>('CAM 01');
  const [isLightOn, setIsLightOn] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSnapshotClick = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);
    onTakeSnapshot();
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section className="relative w-full rounded-xl overflow-hidden bg-[#0a0e18] border border-[#262a35] shadow-xl flex flex-col">
      {/* CCTV Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] bg-[#0a0e18] overflow-hidden select-none"
      >
        {/* Camera Image Feed */}
        <div className="w-full h-full relative overflow-hidden">
          <img
            id="cctv-frame"
            alt="Futuristic industrial automated car wash bay CCTV camera"
            className={`w-full h-full object-cover transition-all duration-500 ${
              isZoomed ? 'scale-125' : 'scale-100'
            } ${
              isLightOn ? 'brightness-105 contrast-105' : 'brightness-75 contrast-125 saturate-50'
            }`}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVgci15T-N0lpGAnyvS-NGB1K7rn3A-pRIhoo3ogZ1IfbJfcG8-er-KA0bxAXfhnH5VO8LngZB-5YJAJQTShVk9jB1UbG91E6APow24jUpzatyAUFI1Ut1fExYYS5t7bv4Mp483V_cqR9q--es8IKf_XbOTGpCRMAAFzsGGPqtn0oNYTOZHY_d1ENSauvezWhamRNWQ3O1GQCJybOdJZhLGlvWEvKHmwe2EsYJ9YlcqjoiHHqnGgJ10Q"
          />

          {/* Shutter Flash Animation */}
          {isFlashing && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xs transition-opacity duration-300 pointer-events-none z-30"></div>
          )}

          {/* Subtle Machine Vision Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          {/* Pause Overlay if bay is paused */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-20 pointer-events-none">
              <div className="px-4 py-2 rounded-lg bg-red-950/90 border border-red-500 text-red-200 flex items-center gap-2 shadow-2xl">
                <span className="material-symbols-outlined text-red-400 animate-pulse">pause_circle</span>
                <span className="font-display font-bold text-sm tracking-widest uppercase">
                  KHOANG ĐANG TẠM DỪNG AN TOÀN
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Top Overlay Controls */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          {/* Live Record Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0a0e18]/85 backdrop-blur-md pointer-events-auto border border-[#262a35]/60 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-[10px] text-red-400 font-bold font-mono tracking-wider uppercase">
              ● LIVE REC
            </span>
            <span className="text-[10px] text-[#b9cacb] font-mono pl-1 border-l border-[#3b494b] ml-1">
              {activeCam === 'CAM 01' ? 'CAM 04' : activeCam}
            </span>
          </div>

          {/* Camera Switcher Toggles */}
          <div className="flex items-center gap-1 bg-[#0a0e18]/85 backdrop-blur-md p-1 rounded-lg pointer-events-auto border border-[#262a35]/60">
            <button
              onClick={() => setActiveCam('CAM 01')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
                activeCam === 'CAM 01'
                  ? 'text-[#00f0ff] bg-[#00f0ff]/20'
                  : 'text-[#b9cacb] hover:text-[#00f0ff]'
              }`}
            >
              CAM 01
            </button>
            <button
              onClick={() => setActiveCam('CAM 02')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
                activeCam === 'CAM 02'
                  ? 'text-[#00f0ff] bg-[#00f0ff]/20'
                  : 'text-[#b9cacb] hover:text-[#00f0ff]'
              }`}
            >
              CAM 02
            </button>
            <button
              onClick={() => setActiveCam('CAM 03')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
                activeCam === 'CAM 03'
                  ? 'text-[#00f0ff] bg-[#00f0ff]/20'
                  : 'text-[#b9cacb] hover:text-[#00f0ff]'
              }`}
            >
              CAM 03
            </button>
          </div>
        </div>

        {/* AI Machine Vision Spatial Targets & HUD Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 z-10">
          {/* Central Reticle & Bounding Box */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Crosshairs */}
            <div className="absolute inset-x-8 top-1/2 h-px bg-[#00f0ff]/20 pointer-events-none"></div>
            <div className="absolute inset-y-6 left-1/2 w-px bg-[#00f0ff]/20 pointer-events-none"></div>

            {/* Dynamic Bounding Contour Box */}
            <div className="relative w-4/5 h-3/5 rounded-lg border border-[#00f0ff]/40 bg-[#00f0ff]/5 p-2 flex flex-col justify-between shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              {/* Detection Label Tag */}
              <div className="self-start -mt-4 bg-[#0a0e18]/90 backdrop-blur-sm border border-[#00f0ff]/30 px-2 py-0.5 rounded flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-[13px] text-[#00f0ff]">smart_toy</span>
                <span className="text-[10px] text-[#dbfcff] font-display font-semibold">
                  {vehicle.model}
                </span>
                <span className="text-[10px] text-[#00f0ff] px-1 rounded bg-[#00f0ff]/20 font-mono font-bold">
                  {vehicle.modelConfidence}%
                </span>
              </div>

              {/* Gantry Distance Indicator */}
              <div className="self-end bg-[#0a0e18]/90 backdrop-blur-sm border border-[#00f0ff]/30 px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[12px] text-[#00f0ff]">straighten</span>
                <span className="text-[10px] text-[#dfe2f1] font-display">Cự ly tay robot:</span>
                <span className="text-[10px] text-[#00f0ff] font-bold font-mono">
                  {robotDistanceMeters.toFixed(2)}m
                </span>
              </div>

              {/* Vehicle License Plate (ANPR/LPR Tag) */}
              <div className="self-center mt-auto mb-1 bg-[#262a35]/95 backdrop-blur-sm border border-[#00f0ff]/40 px-2.5 py-1 rounded flex items-center gap-2 shadow-lg">
                <span className="material-symbols-outlined text-[15px] text-[#00f0ff]">badge</span>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-bold text-[#dbfcff] font-mono tracking-wider">
                    {vehicle.plate}
                  </span>
                  <span className="text-[9px] text-[#b9cacb] font-display flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
                    RFID AutoPass {vehicle.rfidStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Laser Wheel Alignment Sensor HUD at Bottom */}
          <div className="flex items-center justify-between bg-[#0a0e18]/90 border border-[#1c1f2a] px-3 py-1.5 rounded-lg backdrop-blur-sm pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">radar</span>
              <span className="text-[10px] md:text-xs text-[#dfe2f1] font-display font-medium">
                Căn Tâm Bánh Xe:
              </span>
              <span className="text-[10px] md:text-xs text-[#00f0ff] font-mono font-bold">
                {alignmentOffsetCm >= 0 ? `+${alignmentOffsetCm.toFixed(1)}` : alignmentOffsetCm.toFixed(1)}cm (KHỚP {alignmentConfidencePercent.toFixed(1)}%)
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-mono font-semibold">
              AN TOÀN
            </span>
          </div>
        </div>
      </div>

      {/* Live Feed Micro-Actions Toolbar */}
      <div className="flex items-center justify-between p-2.5 bg-[#171b26] border-t border-[#1c1f2a] gap-2">
        <button
          onClick={handleSnapshotClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#1c1f2a] hover:bg-[#262a35] text-[#dfe2f1] border border-[#262a35] transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">camera</span>
          <span className="text-xs font-display font-medium">Chụp Lưu Vết</span>
        </button>

        <button
          onClick={() => setIsLightOn(!isLightOn)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#1c1f2a] hover:bg-[#262a35] text-[#dfe2f1] border border-[#262a35] transition-colors active:scale-95"
        >
          <span
            className={`material-symbols-outlined text-[16px] ${
              isLightOn ? 'text-[#adc6ff]' : 'text-[#849495]'
            }`}
          >
            wb_incandescent
          </span>
          <span className="text-xs font-display font-medium">
            Đèn Khoang: {isLightOn ? 'BẬT' : 'TẮT'}
          </span>
        </button>

        <button
          onClick={() => setIsZoomed(!isZoomed)}
          title={isZoomed ? 'Thu nhỏ' : 'Phóng to'}
          className={`flex items-center justify-center w-10 h-9 rounded-lg border transition-colors active:scale-95 ${
            isZoomed
              ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/40'
              : 'bg-[#1c1f2a] hover:bg-[#262a35] text-[#dbfcff] border-[#262a35]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isZoomed ? 'zoom_out' : 'zoom_in'}
          </span>
        </button>

        <button
          onClick={handleToggleFullscreen}
          title="Toàn màn hình camera"
          className="flex items-center justify-center w-10 h-9 rounded-lg bg-[#1c1f2a] hover:bg-[#262a35] text-[#dbfcff] border border-[#262a35] transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">fullscreen</span>
        </button>
      </div>
    </section>
  );
};
