import {EventEmitter} from 'events';
import http from '../core/http';

let _routes = [];
let _routesPromise = null;

async function fetchBusRoutes() {
  if(_routesPromise) return;

  _routesPromise = http.get('http://microapi.theride.org/RouteNames');
  _routes = await _routesPromise;
  store.emit("change");
}

class BusRouteStore extends EventEmitter {
  getAll() {
    fetchBusRoutes();
    return _routes;
  }
}

let store = new BusRouteStore();
export default store;
