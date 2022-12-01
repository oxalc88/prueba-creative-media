const { Router } = require("express");

const {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
} = require("../controllers/tarea.controllers");

const router = Router();

router.get("/task", getTareas);
router.get("/task/:idTarea", getTareaById);
router.post("/task", createTarea);
router.put("/task/:idTarea", updateTarea);
router.delete("/task/:idTarea", deleteTarea);

module.exports = router;
