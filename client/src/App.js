import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [backendData, setbackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setbackendData(data));
  }, []);

  return (
    <div>
      {typeof backendData.pets === "undefined" ? (
        <p>Loading ...</p>
      ) : (
        backendData.pets.map((pets, i) => 
          <p key={i}>{pets}</p>
        )
      )}
    </div>
  );
}

export default App;
