
class GMaps {
  createMap(lat, lng, zoom, element) {
    return new window.google.maps.Map(element, {
      center: { lat, lng},
      zoom
    });
  }

  createBusStop(lat, lng, title, isTimeStop, id) {
    let color = isTimeStop ? 'green' : 'black';
    let marker = new window.google.maps.Marker({
      position: { lat, lng },
      title,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 3,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: color
      }
    });
    marker.stopId = id;
    return marker;
  }

  createBus(lat, lng, title) {
    return new window.google.maps.Marker({
      position: { lat, lng },
      title
    });
  }
}


export default new GMaps();
