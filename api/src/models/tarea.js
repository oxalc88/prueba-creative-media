const mongoose = require("mongoose");

let tareaSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: [3, "Mínimo 3 letras"],
    maxlength: [140, "Resume tu tarea a máximo un twitt"],
    required: true,
  },
  realizado: {
    type: Boolean,
    default: false,
  },
  taskCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Tarea = mongoose.model("Tarea", tareaSchema);

module.exports = Tarea;
