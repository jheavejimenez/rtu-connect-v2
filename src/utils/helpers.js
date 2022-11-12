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

export const setLocalStorage = (keys, values) => {
  for (const [i, key] of keys.entries()) {
    console.log('values ', values);
    localStorage.setItem(key, values[i]);
  }
};

// check if jwt token is expired
export const isTokenExpired = (token) => {
  const payloadBase64 = token.split('.')[1];
  const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
  const decoded = JSON.parse(decodedJson);
  const exp = decoded.exp;
  return Date.now() >= exp * 1000;
};
