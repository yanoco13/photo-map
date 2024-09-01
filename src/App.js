import React from "react";
import axios from 'axios';
import MapComponent from "./utils/MapComponent";
import RegistSpot from "./utils/RegistSpot";

function App() {
  axios.get('http://localhost:8080/api/users')
  .then(resonse => {
    console.log(resonse);
})
  return (
    <>
      <h1>photo-map</h1>
      <div className="App">
        <MapComponent />
      </div>
    </>
  );
}

export default App;
