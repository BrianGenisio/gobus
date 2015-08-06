import {EventEmitter} from 'events';
import http from '../core/http';
import _ from "lodash";

let _routes = null;
let _stops = new Map();

async function fetchBusRoutesAsync() {
  if(_routes) return;

  _routes = await http.get('http://microapi.theride.org/RouteNames');
  store.emit("change");
}

async function fetchRouteStopsAsync(routeId) {
  if(_stops.has(routeId)) return;

  _stops.set(routeId, await http.get(`http://microapi.theride.org/StopsOnRoute/${routeId}`));
  store.emit("change");
}


class BusRouteStore extends EventEmitter {
  getRoutes() {
    fetchBusRoutesAsync();
    return _routes || [];
  }

  getRoute(routeId) {
    return _.findLast(this.getRoutes(), r => r.routeOffsetID === parseInt(routeId));
  }

  getStops(routeId) {
    fetchRouteStopsAsync(routeId);
    return _stops.has(routeId) ? _stops.get(routeId) : [];
  }
}

let store = new BusRouteStore();
export default store;
