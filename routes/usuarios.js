const { Router } = require("express");
const router = Router();
module.exports = router;

const {
  getUsuarios,
  getUsuarioByID,
} = require("./../controllers/usuariosController");

router.route("/").get(getUsuarios);
router.route("/:id").get(getUsuarioByID);
