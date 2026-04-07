// ============================================
// DreamDesk — сохранённые сборки (localStorage)
// ============================================

export const SAVED_CONFIGS_KEY = "dreamdesk-saved-configs";

export interface SavedConfigItem {
  name: string;
  category: string;
  price: number;
}

export interface SavedConfig {
  id: string;
  name: string;
  items: SavedConfigItem[];
  totalPrice: number;
  savedAt: string;
}

export function loadSavedConfigs(): SavedConfig[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SAVED_CONFIGS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveConfigToStorage(config: SavedConfig): void {
  const list = loadSavedConfigs();
  list.unshift(config);
  localStorage.setItem(SAVED_CONFIGS_KEY, JSON.stringify(list));
}

export function deleteSavedConfig(id: string): void {
  const list = loadSavedConfigs().filter((c) => c.id !== id);
  localStorage.setItem(SAVED_CONFIGS_KEY, JSON.stringify(list));
}
