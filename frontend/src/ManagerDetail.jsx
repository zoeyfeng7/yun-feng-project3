import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ManagerDetail() {
  const [managerDetails, setManagerDetails] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  async function fetchAndSetManager() {
    const managerResponse = await axios.get("/api/manager/" + params.managerId);
    setManagerDetails(managerResponse.data);
  }

  useEffect(function () {
    fetchAndSetManager();
  }, []);

  async function deleteManager() {
    const response = await axios.delete("/api/manager/" + params.managerId);
    navigate("/");
  }

  return (
    <div>
      <div>Website: {managerDetails.website}</div>
      <div>AccountName: {managerDetails.accountName}</div>
      <div>Password: {managerDetails.websitePassword}</div>
      <button onClick={deleteManager}>Delete Me!</button>
    </div>
  );
}

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";

// export default function PokemonDetail() {
//   const [pokemonDetails, setPokemonDetails] = useState({});
//   const navigate = useNavigate();
//   const params = useParams();

//   async function fetchAndSetPokemon() {
//     const pokemonResponse = await axios.get("/api/pokemon/" + params.pokemonId);
//     setPokemonDetails(pokemonResponse.data);
//   }

//   useEffect(function () {
//     fetchAndSetPokemon();
//   }, []);

//   async function deletePokemon() {
//     const response = await axios.delete("/api/pokemon/" + params.pokemonId);
//     navigate("/");
//   }

//   return (
//     <div>
//       <div>Name: {pokemonDetails.name}</div>
//       <div>Color: {pokemonDetails.color}</div>
//       <div>Health: {pokemonDetails.health}</div>
//       <button onClick={deletePokemon}>Delete Me!</button>
//     </div>
//   );
// }
