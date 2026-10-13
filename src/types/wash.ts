export type BayStatus = 'active' | 'ready' | 'paused' | 'completed' | 'maintenance';

export interface Vehicle {
  plate: string;
  model: string;
  modelConfidence: number;
  rfidStatus: 'OK' | 'PENDING' | 'MANUAL';
  color: string;
  washPackage: string;
  arrivalTime: string;
  estimatedWaitMinutes: number;
  lane: 'AutoPass' | 'Thường';
  status: 'washing' | 'waiting' | 'ready_to_exit' | 'completed';
}

export interface TelemetrySensor {
  id: string;
  name: string;
  value: string | number;
  unit: string;
  progressPercent: number;
  normalRange: string;
  statusLabel: string;
  statusColor: 'cyan' | 'secondary' | 'emerald' | 'amber' | 'red';
  icon: string;
}

export interface WashStep {
  stepNumber: number;
  totalSteps: number;
  title: string;
  percent: number;
  pressureBar: number;
  flowRateLpm: number;
  durationSeconds: number;
}

export interface CameraFeed {
  id: string;
  name: string;
  label: string;
  viewDescription: string;
  status: 'ONLINE' | 'STANDBY';
  fps: number;
}

export interface ChemicalTank {
  id: string;
  name: string;
  type: string;
  levelPercent: number;
  volumeLiters: number;
  capacityLiters: number;
  color: string;
  dosingRateMlPerCar: number;
}

export interface EquipmentPump {
  id: string;
  name: string;
  category: string;
  pressureBar: number;
  maxPressureBar: number;
  tempCelsius: number;
  powerKw: number;
  status: 'RUNNING' | 'STANDBY' | 'WARNING';
}
