import http from '../core/http';

let _routes = null;

class BusRouteStore {
  getAll() {
    if(!_routes) _routes = http.get('http://microapi.theride.org/RouteNames');
    return _routes;
  }
}

export default new BusRouteStore();
