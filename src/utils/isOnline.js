export default function (path = '/favicon.ico') {
  const xhr = new (window.ActiveXObject || XMLHttpRequest)('Microsoft.XMLHTTP');

  xhr.open('HEAD', `//${window.location.host}${path}?rand=${Math.floor((1 + Math.random()) * 0x10000)}`, true);

  return new Promise(resolve => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
          return resolve(true);
        }
        resolve(false);
      }
    };
    xhr.send(null);
  });
}
