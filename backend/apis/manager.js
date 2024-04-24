const express = require("express");
const router = express.Router();
const ManagerModel = require("../db/manager/manager.model");
const jwt = require("jsonwebtoken");

const managerDb = [
  {
    website: "pikachu",
    accountName: "yellow",
    websitePassword: "123",
  },
  {
    website: "charizard",
    accountName: "red",
    websitePassword: "123",
  },
  {
    website: "squirtle",
    accountName: "yellow",
    websitePassword: "123",
  },
];

router.get("/findAccountName/:accountName", async function (request, response) {
  const accountName = request.params.accountName;

  const matchingManager = await ManagerModel.findManagerByAccountName(
    accountName
  );
  response.send(matchingManager);
});

router.post("/", async function (request, response) {
  const newManager = request.body;

  const username = request.cookies.username;

  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
  } catch (e) {
    return response.status(404).send("Invalid request");
  }

  newManager.username = decryptedUsername;

  try {
    const createManagerResponse = await ManagerModel.createManager(newManager);
    console.log(createManagerResponse);
    return response.send(
      "Manager Successfully Created: " + createManagerResponse
    );
  } catch (error) {
    return response.status(500).send(error);
  }
});

router.get("/", function (request, response) {
  const username = request.cookies.username;

  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
  } catch (e) {
    return response.status(404).send("Invalid request");
  }

  ManagerModel.findManagerByUsername(decryptedUsername)
    .then(function (dbResponse) {
      response.cookie("managerCount", dbResponse.length + 1);
      response.send(dbResponse);
    })
    .catch(function (error) {
      response.status(500).send(error);
    });
});

router.get("/:id", function (request, response) {
  const managerId = request.params.id;

  ManagerModel.getManagerById(managerId)
    .then(function (dbResponse) {
      response.send(dbResponse);
    })
    .catch(function (error) {
      response.status(500).send(error);
    });
});

router.get("/find", function (req, res) {
  const accountName = req.query.accountName;

  if (!accountName) {
    return res.send(managerDb);
  }

  const output = [];

  for (let manager of managerDb) {
    if (manager.accountName === accountName) {
      output.push(manager);
    }
  }

  res.send(output);
});

router.get("/pikachu", function (req, res) {
  res.send("This is the pikachu");
});

router.get("/", function (req, res) {
  res.send("This is the the base manager route");
});

router.delete("/:managerId", async function (req, response) {
  const managerId = req.params.managerId;

  const deleteResponse = await ManagerModel.deleteManager(managerId);
  return response.send("Successfully delete manager!");
});

router.post("/", function (req, res) {
  res.send("This is how you'll create new manager");
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const PokemonModel = require("../db/pokemon/pokemon.model");
// const jwt = require("jsonwebtoken");

// const pokemonDb = [
//   {
//     name: "pikachu",
//     color: "yellow",
//     health: 100,
//   },
//   {
//     name: "charizard",
//     color: "red",
//     health: 200,
//   },
//   {
//     name: "squirtle",
//     color: "yellow",
//     health: 150,
//   },
// ];

// router.get("/findColor/:color", async function (request, response) {
//   const color = request.params.color;

//   const matchingPokemon = await PokemonModel.findPokemonByColor(color);
//   response.send(matchingPokemon);
// });

// router.post("/", async function (request, response) {
//   const newPokemon = request.body;

//   const username = request.cookies.username;

//   let decryptedUsername;
//   try {
//     decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
//   } catch (e) {
//     return response.status(404).send("Invalid request");
//   }

//   newPokemon.username = decryptedUsername;

//   try {
//     const createPokemonResponse = await PokemonModel.createPokemon(newPokemon);
//     console.log(createPokemonResponse);
//     return response.send(
//       "Pokemon Successfully Created: " + createPokemonResponse
//     );
//   } catch (error) {
//     return response.status(500).send(error);
//   }
// });

// router.get("/", function (request, response) {
//   const username = request.cookies.username;

//   let decryptedUsername;
//   try {
//     decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
//   } catch (e) {
//     return response.status(404).send("Invalid request");
//   }

//   PokemonModel.findPokemonByUsername(decryptedUsername)
//     .then(function (dbResponse) {
//       response.cookie("pokemonCount", dbResponse.length + 1);
//       response.send(dbResponse);
//     })
//     .catch(function (error) {
//       response.status(500).send(error);
//     });
// });

// router.get("/:id", function (request, response) {
//   const pokemonId = request.params.id;

//   PokemonModel.getPokemonById(pokemonId)
//     .then(function (dbResponse) {
//       response.send(dbResponse);
//     })
//     .catch(function (error) {
//       response.status(500).send(error);
//     });
// });

// router.get("/find", function (req, res) {
//   const color = req.query.color;

//   if (!color) {
//     return res.send(pokemonDb);
//   }

//   const output = [];

//   for (let pokemon of pokemonDb) {
//     if (pokemon.color === color) {
//       output.push(pokemon);
//     }
//   }

//   res.send(output);
// });

// router.get("/pikachu", function (req, res) {
//   res.send("This is the pikachu");
// });

// router.get("/", function (req, res) {
//   res.send("This is the the base pokemon route");
// });

// router.delete("/:pokemonId", async function (req, response) {
//   const pokemonId = req.params.pokemonId;

//   const deleteResponse = await PokemonModel.deletePokemon(pokemonId);
//   return response.send("Successfully delete pokemon!");
// });

// router.post("/", function (req, res) {
//   res.send("This is how you'll create new pokemon");
// });

// module.exports = router;
