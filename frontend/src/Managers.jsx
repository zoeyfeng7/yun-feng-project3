import React, { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./Managers.css";
import "./Header.css";

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const [managerInput, setManagerInput] = useState({
    website: "",
    accountName: "",
    health: 0,
  });

  async function getAllManagers() {
    const response = await axios.get("/api/manager/");
    setManagers(response.data);
  }

  const components = [];
  for (let i = 0; i < managers.length; i++) {
    const manager = managers[i];
    const managerComponent = (
      <div>
        <Link to={"/manager/" + manager._id}>{manager.website}</Link>{" "}
        {manager.accountName} - {manager.health}
      </div>
    );
    components.push(managerComponent);
  }

  function setManagerWebsite(event) {
    const managerWebsite = event.target.value;
    setManagerInput({
      ...managerInput,
      website: managerWebsite,
    });
  }

  function setManagerAccountName(event) {
    const managerAccountName = event.target.value;
    setManagerInput({
      ...managerInput,
      accountName: managerAccountName,
    });
  }

  function setManagerHealth(event) {
    const managerHealth = event.target.value;
    setManagerInput({
      ...managerInput,
      health: managerHealth,
    });
  }

  async function createNewManager() {
    const response = await axios.post("/api/manager/", managerInput);
    setManagerInput({
      website: "",
      accountName: "",
      health: 0,
    });
    await getAllManagers();
  }

  return (
    <div>
      <Header />
      <div className="form-container">
        Website:{" "}
        <input
          className="input-field"
          value={managerInput.website}
          onInput={setManagerWebsite}
          type="text"
        ></input>
        UserName:{" "}
        <input
          className="input-field"
          value={managerInput.accountName}
          onInput={setManagerAccountName}
          type="text"
        ></input>
        Password:{" "}
        <input
          className="input-field"
          value={managerInput.health}
          onInput={setManagerHealth}
          type="number"
        ></input>
        <button className="button" onClick={createNewManager}>
          Submit New Password
        </button>
      </div>
      <div className="manager-container">{components}</div>
      <div className="center-container">
        <button className="button" onClick={getAllManagers}>
          Click here to fetch Passwords
        </button>
      </div>
    </div>
  );
}

// import React, { useState } from "react";

// import axios from "axios";
// import { Link } from "react-router-dom";
// import Header from "./Header";

// export default function Pokemons() {
//   const [pokemons, setPokemons] = useState([]);
//   const [pokemonInput, setPokemonInput] = useState({
//     name: "",
//     color: "",
//     health: 0,
//   });

//   async function getAllPokemons() {
//     const response = await axios.get("/api/pokemon/");
//     setPokemons(response.data);
//   }

//   const components = [];
//   for (let i = 0; i < pokemons.length; i++) {
//     const pokemon = pokemons[i];
//     const pokemonComponent = (
//       <div>
//         <Link to={"/pokemon/" + pokemon._id}>{pokemon.name}</Link>{" "}
//         {pokemon.color} - {pokemon.health}
//       </div>
//     );
//     components.push(pokemonComponent);
//   }

//   function setPokemonName(event) {
//     const pokemonName = event.target.value;
//     setPokemonInput({
//       ...pokemonInput,
//       name: pokemonName,
//     });
//   }

//   function setPokemonColor(event) {
//     const pokemonColor = event.target.value;
//     setPokemonInput({
//       ...pokemonInput,
//       color: pokemonColor,
//     });
//   }

//   function setPokemonHealth(event) {
//     const pokemonHealth = event.target.value;
//     setPokemonInput({
//       ...pokemonInput,
//       health: pokemonHealth,
//     });
//   }

//   async function createNewPokemon() {
//     const response = await axios.post("/api/pokemon/", pokemonInput);
//     setPokemonInput({
//       name: "",
//       color: "",
//       health: 0,
//     });
//     await getAllPokemons();
//   }

//   return (
//     <div>
//       <Header />
//       <div>{components}</div>
//       <button onClick={getAllPokemons}>Click here to fetch Passwords</button>
//       <div>
//         Name:{" "}
//         <input
//           value={pokemonInput.name}
//           onInput={setPokemonName}
//           type="text"
//         ></input>
//         Color:{" "}
//         <input
//           value={pokemonInput.color}
//           onInput={setPokemonColor}
//           type="text"
//         ></input>
//         Health:{" "}
//         <input
//           value={pokemonInput.health}
//           onInput={setPokemonHealth}
//           type="number"
//         ></input>
//         <button onClick={createNewPokemon}>Submit New Password</button>
//       </div>
//     </div>
//   );
// }
