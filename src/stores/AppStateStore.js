import {EventEmitter} from 'events';
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

let _state = {
  indicatedStops: []
};

function handleDispatch(action) {
  switch(action.type) {
    case ActionTypes.ADD_ROUTE_INDICATION:
      _state.indicatedStops.push(action.stopId);
      store.emitChange();
      break;

    case ActionTypes.REMOVE_ROUTE_INDICATION:
      let location = _state.indicatedStops.indexOf(action.stopId);
      if(location >= 0) {
        _state.indicatedStops.splice(location, 1);
        store.emitChange();
      }
      break;
  }
}

class AppStateStore extends EventEmitter {

  constructor() {
    super();

    this.dispatchToken = Dispatcher.register(handleDispatch);
  }

  emitChange() {
    this.emit('change');
  }

  getIndicatedStops() {
    return _state.indicatedStops;
  }
}



let store = new AppStateStore();
export default store;

