/**
 * Gets a value from localStorage and parses it as JSON.
 */
export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (e) {
    console.error("Error parsing localStorage key:", key, e);
    return null;
  }
}

/**
 * Saves a value to localStorage as JSON.
 */
export function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to localStorage:", key, e);
  }
}

/**
 * Removes a key from localStorage.
 */
export function removeFromLocalStorage(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

/**
 * Gets a value from sessionStorage and parses it as JSON.
 */
export function getSessionData<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const value = sessionStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (e) {
    console.error("Error parsing sessionStorage key:", key, e);
    return null;
  }
}

/**
 * Saves a value to sessionStorage as JSON.
 */
export function setSessionData<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to sessionStorage:", key, e);
  }
}