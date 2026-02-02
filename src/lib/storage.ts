const KEY = "desk-setup-saved-configs";

export interface SavedConfig {
  id: string;
  name: string;
  deviceIds: string[];
  layout: Array<{ id: string; deviceId: string; slotId: string; x?: number; y?: number }>;
  savedAt: string;
}

export function getSavedConfigs(): SavedConfig[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveConfig(config: Omit<SavedConfig, "id" | "savedAt">): SavedConfig {
  const configs = getSavedConfigs();
  const newOne: SavedConfig = {
    ...config,
    id: `config-${Date.now()}`,
    savedAt: new Date().toISOString(),
  };
  configs.unshift(newOne);
  localStorage.setItem(KEY, JSON.stringify(configs));
  return newOne;
}

export function deleteConfig(id: string): void {
  const configs = getSavedConfigs().filter((c) => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(configs));
}
