const Task = require("../models/tarea");

const getTareas = (req, res) => {
  Task.find({})
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
    });
};
const getTareaById = (req, res) => {
  const { idTarea } = req.params;
  Task.findById(idTarea)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};

const createTarea = (req, res) => {
  const { text } = req.body;
  Task.create({
    text: text,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

const updateTarea = (req, res) => {
  const { idTarea } = req.params;
  const { realizado } = req.body;

  Task.findByIdAndUpdate(
    idTarea,
    // [{ $set: { realizado: { $eq: [false, "$realizado"] } } }],
    // { new: true }
    { realizado: realizado },
    { new: true }
  )
    .then((d) => res.json(d))
    .catch((err) => {
      res.json(err);
    });
};

const deleteTarea = (req, res) => {
  const { idTarea } = req.params;
  Task.findByIdAndDelete(idTarea)
    .then((d) => res.json(d))
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
};
