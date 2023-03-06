import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Matcher } from 'interweave';
import { URL_PATTERN } from 'interweave-autolink';
import Link from 'next/link';
import { createElement } from 'react';

import { BLOCK_LIST_URL, NFT_STORAGE_GATEWAY, ZERO_ADDRESS } from './constants';
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
export const getNFTStorageLink = (url) => {
  const gateway = NFT_STORAGE_GATEWAY;
  return url.replace('https://ipfs.io/ipfs/', gateway).replace('ipfs://', gateway);
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
  const storageRef = ref(storage, fileName);

  return uploadBytes(storageRef, file, metadata).then((snapshot) => {
    return getDownloadURL(ref(snapshot.ref));
  });
};

/**
 *
 * @param {string} username
 * @description - convert username to lowercase and remove spaces and special characters
 * @returns {string}
 *
 */
export const formatUsername = (username) => {
  return username
    .toLowerCase()
    .replace('@', '')
    .replace(/[^\dA-Za-z]/g, '');
};

/**
 *
 * @param {string} address
 * @returns {`https://cdn.stamp.fyi/avatar/eth:${string}?s=250`}
 * @description - get stamp.fyi avatar url
 *
 */
export const getStampFyiUrl = (address) => {
  return `https://cdn.stamp.fyi/avatar/eth:${address.toLowerCase()}?s=250`;
};

/**
 *
 * @param {string} profile
 * @returns {`https://cdn.stamp.fyi/avatar/eth:${string}?s=250`|string}
 * @description - get avatar url
 *
 */
export const getAvatarUrl = (profile) => {
  if (
    BLOCK_LIST_URL.includes(profile?.picture?.original?.url) ||
    BLOCK_LIST_URL.includes(profile?.picture?.uri)
  ) {
    return getStampFyiUrl(profile?.ownedBy ?? ZERO_ADDRESS);
  }

  return getNFTStorageLink(
    profile?.picture?.original?.url ??
      profile?.picture?.uri ??
      getStampFyiUrl(profile?.ownedBy ?? ZERO_ADDRESS)
  );
};

/**
 *
 * @param url
 * @returns {string}
 * @description - add protocol to url if it doesn't have one
 *
 */
function addProtocolIfNeeded(url) {
  if (!url.match(/^https?:\/\//)) {
    url = `http://${url}`;
  }
  return url;
}

/**
 *
 * @param children
 * @param url
 * @returns {JSX.Element}
 * @constructor
 * @description - create a link component that will open in a new tab if the url is external
 *
 */
const Url = ({ url }) => {
  const href = addProtocolIfNeeded(url);

  console.log('url', url);
  return (
    <Link href={href} legacyBehavior={true} rel={'noopener'}>
      <a
        className={'text-blue-500 hover:text-blue-700'}
        onClick={(event) => event.stopPropagation()}
        target={'_blank'}
      >
        {url}
      </a>
    </Link>
  );
};

/**
 *
 * @description - Matcher for identifying and replacing URLs in a string
 * @returns {JSX.Element}
 * @constructor
 * @extends Matcher
 * @example
 * <UrlMatcher>
 *
 */
export class UrlMatcher extends Matcher {
  replaceWith(children, props) {
    return createElement(Url, props);
  }

  getPattern() {
    return URL_PATTERN;
  }

  // Get the HTML tag name for rendering matches
  asTag() {
    return 'a';
  }

  // Match a URL in a string and return the relevant information
  match(string) {
    const response = this.doMatch(string, this.getPattern(), this.handleMatches, true);

    if (response?.valid) {
      const { host } = response;
      const tld = host.slice(host.lastIndexOf('.') + 1).toLowerCase();

      // Exclude certain top-level domains from matching
      if ('lens'.includes(tld)) {
        response.valid = false;
      }
    }

    return response;
  }

  // Extract and return the URL, host, and full path information from a URL match
  handleMatches(matches) {
    return {
      url: matches[0],
      host: matches[3],
      fullPath: (matches[4] ?? '') + (matches[5] ?? '') + (matches[6] ?? '')
    };
  }
}

/**
 *
 * @description - Matcher for identifying and replacing markdown code blocks in a string
 * @returns {JSX.Element}
 * @constructor
 * @extends Matcher
 * @example
 * <MDCodeMatcher>
 *   <code className={"text-sm bg-gray-300 rounded-lg "}>{children}</code>
 *
 */
export class MDCodeMatcher extends Matcher {
  replaceWith(children, props) {
    return <code className={'text-sm bg-gray-300 rounded-lg '}>{children}</code>;
  }

  asTag() {
    return 'code';
  }

  match(value) {
    return this.doMatch(
      value,
      /`(.*?)`/u,
      (matches) => ({
        match: matches[1]
      }),
      true
    );
  }
}
