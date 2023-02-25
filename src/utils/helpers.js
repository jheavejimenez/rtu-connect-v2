import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from './firebase';

/**
 *
 * @returns {boolean}
 * @description retrieves the access token and refresh token from the browser's local
 *  storage and returns a boolean indicating whether both tokens are defined or not.
 *
 */
export const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return accessToken !== 'undefined' && refreshToken !== 'undefined';
};

/**
 *
 * @param {string[]} keys
 * @description removes the access token and refresh token from the browser's local storage.
 *
 */
export const clearLocalStorage = (keys) => {
  for (const key of keys.filter((key) => localStorage.getItem(key) !== null)) {
    localStorage.removeItem(key);
  }
};

/**
 *
 * @param {string[]} keys
 * @param {string} values
 * @description sets the access token and refresh token in the browser's local storage.
 *
 */
export const setLocalStorage = (keys, values) => {
  for (const [i, key] of keys.entries()) {
    localStorage.setItem(key, values[i]);
  }
};

/**
 * @param {string} token
 * @returns {boolean}
 * @description check whether a JWT token has expired or not by checking the expiration time in the payload of the token.
 *
 */
export const isTokenExpired = (token) => {
  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));
  const exp = decoded.exp;
  return Date.now() >= exp * 1000;
};

/**
 *
 * @param  {string} value
 * @returns {string}
 * @description - remove any whitespace characters from the beginning and end of the "value" string,
 *  but it will only remove newline characters that are preceded and followed by at least one whitespace character,
 *  so it will not remove any newline characters that are not surrounded by whitespace.
 *
 */
export const contentFormatter = (value) =>
  value ? value.replace(/(?:\r?\n[\t ]*){2,}/g, '\n\n').trim() : '';

/**
 *
 * @param {string} url
 * @returns {string}
 * @description - this will replace ipfs to https so that the image can load in img src
 *
 */
export const fixURL = (url) => {
  const replacedURL = url?.replace('ipfs://', 'https://');
  return replacedURL?.concat('.ipfs.nftstorage.link');
};

/**
 *
 * @param {string} handle
 * @returns {string}
 * @description - remove .test string in user handle and remove it
 *
 */
export const fixUsername = (handle) => {
  return handle?.replace('.test', '');
};

/**
 *
 * @param file
 * @param fileName
 * @param metadata
 * @description - upload file to firebase storage
 * @returns {url}
 *
 */
export const uploadFile = (file, fileName, metadata) => {
  let url;

  const storageRef = ref(storage, fileName);
  uploadBytes(storageRef, file, metadata).then((snapshot) => {
    getDownloadURL(ref(snapshot.ref)).then((downloadURL) => {
      url = downloadURL;
    });
  });

  return url;
};
