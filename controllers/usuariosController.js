const { client } = require('./../database')
const usuariosController = {}
console.log("query", client.query)
usuariosController.getUsuarios = async (req,res) => {
  let users = [];
  try {
    const { rows } = await client.query("SELECT * FROM usuarios");
	res.json({ users: rows });
  } catch (error) {
    console.error(error);
  }
  
};

usuariosController.getUsuarioByID = async (req,res) => {
  const { id } = req.params;
  try {
    const { rows } = await client.query(
      `SELECT * FROM usuarios where id = ${id}`
    );
    res.json({ user: rows[0] });
  } catch (error) {
    console.error(error)
  }
  return user;
};


module.exports = usuariosController