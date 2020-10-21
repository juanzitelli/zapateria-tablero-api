const { client } = require("./../database");
const usuariosController = {};
usuariosController.getUsuarios = async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM usuarios");
    res.json({ users: rows });
  } catch (error) {
    console.error(error);
  }
};

usuariosController.getUsuarioByID = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await client.query(
      `SELECT * FROM usuarios where id = ${id}`
    );
    res.json({ user: rows[0] });
  } catch (error) {
    console.error(error);
  }
};

usuariosController.authenticateUser = async (req,res) => {
  const {usuario, contrasena} = req.body;
  try {
    const { rows } = await client.query(
      `SELECT usuario FROM usuarios WHERE usuario = ${usuario} AND contrasena = ${contrasena}`
    );
    res.json({ user: rows[0] });
  } catch (error) {
    console.error(error);
  }
}

module.exports = usuariosController;
