const tryParse = (val: string): any => {
  try {
    return JSON.parse(val);
  } catch {
    return null;
  }
};

export const Constants = {
  baseUrl: tryParse(`import.meta.env`)?.VITE_API_BASE || '',
  apiPath: '/api/v1',
};
