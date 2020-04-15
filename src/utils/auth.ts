const LOCAL_STORAGE_KEY = 'delvifyDashboardReportingAppToken';

export interface LoginData {
  email: string;
  password: string;
}

export const isBrowser = () => typeof window !== 'undefined';

// TODO: move to cookie.
export const getToken = (): string => (
  isBrowser() && window.localStorage.getItem(LOCAL_STORAGE_KEY)
);

export const setToken = (token: string): void => (
  isBrowser() && window.localStorage.setItem(LOCAL_STORAGE_KEY, token)
);

export const logout = (callback: () => any): void => {
  setToken('');
  callback();
};
