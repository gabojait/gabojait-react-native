export function objectToQueryString(obj: { [key: string]: string | number }) {
  const keys = Object.keys(obj);
  const keyValuePairs = keys.map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
  });
  return keyValuePairs.join('&');
}
