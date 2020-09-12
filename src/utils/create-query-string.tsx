export function createQueryString(object: Object) {
  const keyValuePairs = [];
  for (const key in object) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
  }
  return keyValuePairs.join('&');
}
