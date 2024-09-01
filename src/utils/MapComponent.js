import React, { useState, useEffect, useRef } from 'react';
import RegistSpot from './RegistSpot';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [showComponent, setShowComponent] = useState(false);
  const [position, setPosition] = useState({lat : 0, lng : 0});
  const infowindowRef = useRef(null);

  const handleButtonClick = (latLng) => {
    setPosition({lat: latLng.lat(), lng: latLng.lng()});
    setShowComponent(true);
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const api_key = process.env.REACT_APP_API_KEY;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}`;
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

      infowindowRef.current = new window.google.maps.InfoWindow({
        content: '<button id="regist-sopt">地点を登録する</button>',
      });

      map.addListener('rightclick', (event) => {
        const latLng = event.latLng;
        const marker = new window.google.maps.Marker({
          position: { lat: latLng.lat(), lng: latLng.lng() },
          map,
        });

        infowindowRef.current.open({
          anchor: marker,
          map,
        });

        window.google.maps.event.addListenerOnce(infowindowRef.current, 'domready', () => {
          const button = document.getElementById('regist-sopt');
          if (button) {
            button.addEventListener('click', () => handleButtonClick(latLng));
          }
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
      <RegistSpot showFlag={showComponent} setShowComponent={setShowComponent} position={position}/>
    </div>
  );
};

export default MapComponent;
