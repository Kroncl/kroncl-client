export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_access_token');
  }
  return null;
};

export const getCurrentUser = (): any => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('auth_user_data');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const clearAuthData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_access_token');
    localStorage.removeItem('auth_user_data');
    localStorage.removeItem('auth_expires_at');
  }
};