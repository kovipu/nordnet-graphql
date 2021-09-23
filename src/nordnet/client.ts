import fetch, { Headers, Response } from 'node-fetch';
import { URLSearchParams } from 'url';

import { username, password } from '../config';
import { Account } from './types';

const API_URL = 'https://www.nordnet.fi/';

let cookies: Record<string, string> = {};

// Outward facing API functions.

const getAccounts = async (): Promise<Array<Account>> => {
  const response = await _request('accounts');
  return response.json();
}

// Internal stuff.

const _request = async (request: string): Promise<Response> => {
  const response = await fetch(`${API_URL}api/2/${request}`, {
    headers: {
      cookie: joinCookies(cookies),
    }
  });

  if (response.status === 401) {
    await _login();
    return _request(request);
  }

  return response;
}

const _login = async () => {
  const loginResponse = await fetch(`${API_URL}api/2/login/anonymous`, {
    method: 'POST',
  });

  cookies = parseCookies(loginResponse.headers);

  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const authResponse = await fetch(`${API_URL}api/2/authentication/basic/login`, {
    method: 'POST',
    body: params,
    headers: {
      cookie: joinCookies(cookies)
    }
  });

  const { NOW, xsrf } = parseCookies(authResponse.headers);
  cookies.NOW = NOW;
  cookies.xsrf = xsrf;
}

// Helpers.

const parseCookies = (headers: Headers) => {
  const rawCookies = headers.raw()['set-cookie'];
  const parsed: Record<string, string> = {};
  rawCookies.forEach((cookie) => {
    const [key, value] = cookie.split(';')[0].split('=');
    parsed[key] = value;
  });

  return parsed;
}

const joinCookies = (cookies: Record<string, string>) => {
  return Object.keys(cookies).map((key) => `${key}=${cookies[key]}`).join('; ');
}

export { getAccounts };