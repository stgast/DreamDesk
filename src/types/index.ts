export interface Device {
  id: string;
  name: string;
  type: string;
  brand: string;
  price: number;
  color: string;
  imageUrl: string | null;
  description: string | null;
  createdAt?: string;
}

export interface SetupItem {
  device: Device;
  x: number;
  y: number;
  rotation?: number;
}

export interface UserPreference {
  mouseGrip?: string;
  headphoneType?: string;
  deskSize?: string;
  budget?: string;
}
