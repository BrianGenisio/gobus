
class GMaps {
  createMap(lat, lng, zoom, element) {
    return new window.google.maps.Map(element, {
      center: { lat, lng},
      zoom
    });
  }

  createBusStop(lat, lng, title) {
    return new window.google.maps.Marker({
      position: { lat, lng },
      title,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 3
      }
    });
  }

  createBus(lat, lng, title) {
    return new window.google.maps.Marker({
      position: { lat, lng },
      title
    });
  }
}


export default new GMaps();
