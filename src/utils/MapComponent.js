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

      new window.google.maps.Marker({
        position: { lat: 35.6586, lng: 139.7454 },
        map,
        title: "Hello World!",
      });

      map.addListener('rightclick', (event) => {
        const latLng = event.latLng;
        // 右クリックイベントの処理
        new window.google.maps.Marker({
          position: { lat: latLng.lat(), lng: latLng.lng() },
          map,
          title: "Hello World!",
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
