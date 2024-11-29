(function () {
  const FieldComponent = Formio.Components.components.field;

  class GeolocationComponent extends FieldComponent {
    static schema(...extend) {
      return FieldComponent.schema({
        type: 'geolocation',
        label: 'Geolocation',
        key: 'geolocation',
        inputType: 'text',
        input: true,
        ...extend,
      });
    }

    static get builderInfo() {
      return {
        title: 'Geolocation',
        group: 'basic',
        icon: 'map-marker',
        weight: 80,
        schema: GeolocationComponent.schema(),
      };
    }

    get defaultSchema() {
      return GeolocationComponent.schema();
    }

    render() {
      return super.render(`<div class="geolocation">
        <button type="button" class="btn btn-primary" id="locate-btn">Get Location</button>
        <input type="text" class="form-control" readonly id="location-output" value="${this.dataValue || ''}">
        <div id="map" style="height: 300px; margin-top: 10px;"></div>
      </div>`);
    }

    attach(element) {
      super.attach(element);

      const locateButton = element.querySelector('#locate-btn');
      const locationOutput = element.querySelector('#location-output');
      const mapContainer = element.querySelector('#map');
      let map, marker;

      // Initialize Google Map
      const initMap = (lat = 0, lng = 0) => {
        const mapOptions = {
          center: { lat, lng },
          zoom: 8,
        };
        map = new google.maps.Map(mapContainer, mapOptions);
        marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
        });
      };

      // Update map with new location
      const updateMap = (lat, lng) => {
        const newPosition = { lat, lng };
        map.setCenter(newPosition);
        marker.setPosition(newPosition);
      };

      locateButton.addEventListener('click', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const location = `Lat: ${lat}, Long: ${lng}`;
              this.setValue(location);
              locationOutput.value = location;

              if (!map) {
                initMap(lat, lng);
              } else {
                updateMap(lat, lng);
              }
            },
            (error) => {
              locationOutput.value = 'Error getting location';
              console.error(error);
            }
          );
        } else {
          locationOutput.value = 'Geolocation not supported';
        }
      });

      return element;
    }

    setValue(value) {
      super.setValue(value);
    }
  }

  // Register the custom component in Form.io
  Formio.Components.addComponent('geolocation', GeolocationComponent);
})();
