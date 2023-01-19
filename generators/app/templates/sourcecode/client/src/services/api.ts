import { Constants } from '@/data';

const getBaseUrl = () => Constants.baseUrl + Constants.apiPath;

const getUrl = (path: string, data?: unknown) => {
  let result = getBaseUrl();
  if (!!path) result += path.startsWith('/') ? path : '/' + path;
  if (!!data) {
    let qs = '';
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (!!qs) qs += '&';
        else qs += '?';
        qs += `${key}=${data[key]}`;
      }
    }
    result += qs;
  }
  return result;
};

const get = async (path: string, data?: unknown) => {
  const url = getUrl(path, data);
  const r = await fetch(url);
  if (r.ok) return await r.json();
  throw new Error(r.statusText);
};

const post = async (path: string, data?: unknown) => {
  const url = getUrl(path);
  const r = await fetch(url, {
    method: 'POST',
    body: !!data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (r.ok) return await r.json();
  throw new Error(r.statusText);
};

export { get, post };
