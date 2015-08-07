import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

class SystemActionCreators {
  indicateBusStop(stopId) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_ROUTE_INDICATION,
      stopId
    });

    setTimeout(() => Dispatcher.dispatch({
      type: ActionTypes.REMOVE_ROUTE_INDICATION,
      stopId
    }), 3000);
  }
}

export default new SystemActionCreators();
