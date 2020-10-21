const { Router } = require("express");
const router = Router();
module.exports = router;

const {
  getUsuarios,
  getUsuarioByID,
  authenticateUser
} = require("./../controllers/usuariosController");

router.route("/").get(getUsuarios);
router.route("/:id").get(getUsuarioByID);
router.route("/login").post(authenticateUser);
