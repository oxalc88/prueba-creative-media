require("dotenv").config();
const mongoose = require("mongoose");
const server = require("./app.js");
const config = require("./src/config.js");
require("./src/models/tarea");

mongoose
  .connect(
    `mongodb+srv://${config.database_name}:${config.database_pass}@$${config.database_cluster}`
  )
  .then(() => {
    console.log("Conectado correctamente a MongoDB");

    server.listen(config.PORT, () => {
      console.log("El servidor esta corriendo en ", config.PORT);
    });
  })
  .catch((err) => console.log(err));
