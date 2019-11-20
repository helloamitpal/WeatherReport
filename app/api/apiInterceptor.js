import fetchJsonp from 'fetch-jsonp';

const fireRequest = async (method, url) => {
  const jsonp = await fetchJsonp(url, {
    jsonpCallbackFunction: 'myFunction'
  });
  const resp = await jsonp.json();
  return resp;
};

export default {
  get(url) {
    return fireRequest('GET', url);
  }
};
