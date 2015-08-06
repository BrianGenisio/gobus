import {EventEmitter} from 'events';
import http from '../core/http';
import _ from "lodash";

let _routes = [];
let _routesPromise = null;

async function fetchBusRoutesAsync() {
  if(_routesPromise) return;

  _routesPromise = http.get('http://microapi.theride.org/RouteNames');
  _routes = await _routesPromise;
  store.emit("change");
}

class BusRouteStore extends EventEmitter {
  getAll() {
    fetchBusRoutesAsync();
    return _routes;
  }

  get(id) {
    fetchBusRoutesAsync();
    return _.findLast(_routes, r => r.routeOffsetID === parseInt(id));
  }
}

let store = new BusRouteStore();
export default store;
