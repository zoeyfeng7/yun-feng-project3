const Schema = require("mongoose").Schema;

exports.ManagerSchema = new Schema(
  {
    website: String,
    health: Number,
    accountName: {
      type: String,
      default: "green",
      require: false,
    },
    username: {
      type: String,
      require: true,
    },
  },
  { collection: "myManagerSpr2023" }
);

// const Schema = require("mongoose").Schema;

// exports.PokemonSchema = new Schema(
//   {
//     name: String,
//     health: Number,
//     color: {
//       type: String,
//       default: "green",
//       require: false,
//     },
//     username: {
//       type: String,
//       require: true,
//     },
//   },
//   { collection: "myPokemonSpr2023" }
// );
