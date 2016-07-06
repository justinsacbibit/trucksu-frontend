import React from 'react';
import fetch from 'isomorphic-fetch';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
let _apiUrl;
let _avatarUrl;
let _socketUrl;
if (process.env.NODE_ENV === 'production') {
  _apiUrl = 'https://api.trucksu.com';
  _avatarUrl = 'https://a.trucksu.com';
  _socketUrl = 'wss://rt.trucksu.com';
} else {
  const apiPort = process.env.API_PORT || 8080;
  _apiUrl = `http://localhost:${apiPort}/api`;
  _avatarUrl = `http://localhost:${apiPort}/a`;
  _socketUrl = `ws://localhost:${apiPort}/socket`;
}

export function apiUrl(path) {
  return _apiUrl + path;
}

export function avatarUrl(path) {
  return _avatarUrl + path;
}

export function socketUrl() {
  return _socketUrl;
}

function buildHeaders() {
  const authToken = localStorage.getItem('trucksuAuthToken');

  return { ...defaultHeaders, Authorization: authToken };
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

export function httpGet(url) {

  return fetch(_apiUrl + url, {
    headers: buildHeaders(),
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpPost(url, data) {
  const body = JSON.stringify(data);

  return fetch(_apiUrl + url, {
    method: 'post',
    headers: buildHeaders(),
    body,
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpPostFile(url, body) {
  const headers = buildHeaders();
  delete headers['Content-Type'];

  return fetch(_apiUrl + url, {
    method: 'post',
    headers,
    body,
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpDelete(url) {
  return fetch(_apiUrl + url, {
    method: 'delete',
    headers: buildHeaders(),
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function setDocumentTitle(title) {
  document.title = `${title} | Trucksu`;
}

export function renderErrorsFor(errors, ref) {
  if (!errors) {
    return false;
  }

  return errors.map((error, i) => {
    if (error[ref]) {
      return (
        <div key={i} className='error'>
          {error[ref]}
        </div>
      );
    }

    return null;
  });
}
