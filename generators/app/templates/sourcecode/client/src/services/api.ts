const baseUrl = import.meta.env.VITE_API_BASE + '/api/v1';

const getUrl = (path: string, data?: unknown) => {
  let result = baseUrl;
  if (!!path) result += path;
  if (!!data) {
    let qs = '';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
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
