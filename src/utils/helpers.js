export const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return accessToken !== 'undefined' && refreshToken !== 'undefined';
};

export const clearLocalStorage = (keys) => {
  for (const key of keys) {
    localStorage.removeItem(key);
  }
};
