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
    if(rows.length > 0){
      res.json({ user: rows[0] });
    }
    else {
      res.json({ message: "No se ha encontrado un usuario con ese ID" });
    }
  } catch (error) {
    console.error(error);
  }
};

usuariosController.authenticateUser = async (req,res) => {
  const {usuario, contrasena} = req.body;
  try {
    const { rows } = await client.query(
      `SELECT usuario FROM usuarios WHERE usuario = '${usuario}' AND contrasena = '${contrasena}'`
    );
    if(rows.length > 0){
      res.json({user: rows[0]})
    }
    else{
      res.json({ error: "Las credenciales son inválidas, intente de nuevo" });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = usuariosController;
