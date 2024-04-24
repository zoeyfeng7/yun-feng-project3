const mongoose = require("mongoose");

const ManagerSchema = require("./manager.schema").ManagerSchema;

const ManagerModel = mongoose.model("ManagerModel", ManagerSchema);

function createManager(manager) {
  return ManagerModel.create(manager);
}

function returnAllManager() {
  return ManagerModel.find().exec();
}

function getManagerById(id) {
  return ManagerModel.findById(id).exec();
}

function findManagerByAccountName(websiteAccountName) {
  return ManagerModel.find({ accountName: websiteAccountName }).exec();
}

function deleteManager(managerId) {
  return ManagerModel.deleteOne({ _id: managerId }).exec();
}

function findManagerByUsername(username) {
  return ManagerModel.find({ username: username }).exec();
}

module.exports = {
  createManager,
  returnAllManager,
  getManagerById,
  findManagerByAccountName,
  deleteManager,
  findManagerByUsername,
};

// const mongoose = require("mongoose")

// const PokemonSchema = require('./pokemon.schema').PokemonSchema;

// const PokemonModel = mongoose.model("PokemonModel", PokemonSchema);

// function createPokemon(pokemon) {
//     return PokemonModel.create(pokemon);
// }

// function returnAllPokemon() {
//     return PokemonModel.find().exec();
// }

// function getPokemonById(id) {
//     return PokemonModel.findById(id).exec();
// }

// function findPokemonByColor(pokeColor) {
//     return PokemonModel.find({color: pokeColor}).exec();
// }

// function deletePokemon(pokemonId) {
//     return PokemonModel.deleteOne({_id: pokemonId}).exec();
// }

// function findPokemonByUsername(username) {
//     return PokemonModel.find({username: username}).exec();
// }

// module.exports = {
//     createPokemon,
//     returnAllPokemon,
//     getPokemonById,
//     findPokemonByColor,
//     deletePokemon,
//     findPokemonByUsername
// }
