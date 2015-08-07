/**
 * Created by Brian on 8/6/15.
 */
import {EventEmitter} from 'events';
import http from '../core/http';
import _ from "lodash";

let _currentLocations = new Map();
let _locationRegistrations = new Map();

function fetchBusLocation(routeId) {
  return http.get(`/proxy/Location/${routeId}`);
}

function watch() {
  let fetch = async function() {
    this._locations = await fetchBusLocation(this.routeId);
    this.emit('change');
  };

  this.timer = setTimeout(fetch.bind(this), this.timeoutSeconds * 1000);
  fetch.call(this);
}

class BusLocationStore extends EventEmitter {

  constructor(routeId, timeoutSeconds=10) {
    super();

    this.routeId = routeId;
    this.timeoutSeconds = timeoutSeconds;
    this._locations = [];

    watch.call(this);
  }

  getLocations() {
    return this._locations;
  }

  dispose() {
    clearTimeout(this.timer);
    this.timer = null;
  }
}

class BusLocationStoreFactory {
  create(routeId, timeoutSeconds=10) {
    return new BusLocationStore(routeId, timeoutSeconds);
  }
}

export default new BusLocationStoreFactory();
