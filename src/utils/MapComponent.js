import React, { useEffect, useRef } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const api_key = process.env.REACT_APP_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=` + api_key;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 35.6586, lng: 139.7454 },
        zoom: 15,
      });

      // new window.google.maps.Marker({
      //   position: { lat: 35.6586, lng: 139.7454 },
      //   map,
      //   title: "Hello World!",
      // });

      const contentString =
      '<div class="ks_pin">'
      + '<div class="mb5"><a href="'
      + 'https://ja.wikipedia.org/wiki/%E6%9D%B1%E4%BA%AC%E3%82%BF%E3%83%AF%E3%83%BC'
      + '" class="btn btn-sm btn-default mb5"'
      + '>'
      + 'この地点を登録する'
      + '</a></div>'
      + '</div>';

      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });

      map.addListener('rightclick', (event) => {
        const latLng = event.latLng;
        // 右クリックイベントの処理
        const marker = new window.google.maps.Marker({
          position: { lat: latLng.lat(), lng: latLng.lng() },
          map,
          title: "Hello World!",
        });

        infowindow.open({
          anchor: marker,
          map,
        });

      });
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '800px' }}
    >
    </div>
  );
};

export default MapComponent;
