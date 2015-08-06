/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import request from 'superagent';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const getBaseUrl = (() => {
  let baseUrl;
  return () => baseUrl || (baseUrl = ExecutionEnvironment.canUseDOM ? '' :
    process.env.WEBSITE_HOSTNAME ?
      `http://${process.env.WEBSITE_HOSTNAME}` :
      `http://127.0.0.1:${global.server.get('port')}`);
})();

let _cache = new Map();

const http = {

  get: function(path) {

    if(_cache.has(path)) return _cache.get(path);

    let result = new Promise((resolve, reject) => {
      request
        .get(getBaseUrl() + path)
        .accept('application/json')
        .end((err, res) => {
          _cache.delete(path);

          if (err) {
            if (err.status === 404) {
              resolve(null);
            } else {
              reject(err);
            }
          } else {
            resolve(res.body);
          }
        });
    });

    _cache.set(path, result);

    return result;
  }



};

export default http;
