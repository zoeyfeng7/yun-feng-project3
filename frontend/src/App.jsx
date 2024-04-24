import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import CreateUser from "./CreateUser";
import Managers from "./Managers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [imgUrl, setImageUrl] = useState("");
//   const [err, setError] = useState("");

//   async function makeAnAPIRequest() {
//     setError("");
//     let response = await axios.get("https://randombig.cat/roar.json");
//     setImageUrl(response.data.url);
//   }

//   return (
//     <div>
//       <div>Hello, click to generate a cat image</div>
//       <button onClick={makeAnAPIRequest}>Generate</button>
//       {err ? err : null}
//       {imgUrl ? <img src={imgUrl} height={600} width={600} /> : null}
//     </div>
//   );
// }

// export default App;
