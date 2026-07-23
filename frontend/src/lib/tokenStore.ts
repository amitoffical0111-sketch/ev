// Secure token storage — avoids localStorage XSS risk.
// Token is kept in memory (primary) and sessionStorage (tab persistence only).
// sessionStorage is not accessible cross-tab and is cleared on tab close.

let _memoryToken: string | null = null;

export const tokenStore = {
  get(): string | null {
    if (_memoryToken) return _memoryToken;
    if (typeof window !== 'undefined') {
      _memoryToken = sessionStorage.getItem('_t') ?? null;
    }
    return _memoryToken;
  },
  set(token: string): void {
    _memoryToken = token;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('_t', token);
    }
  },
  clear(): void {
    _memoryToken = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('_t');
    }
  },
};

// Safe JSON parse — returns null on invalid input
export function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
