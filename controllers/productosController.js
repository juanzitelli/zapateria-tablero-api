const { client } = require("./../database");
const productosController = {};

productosController.getMostSoldProducts = async (req, res) => {
  try {
    const { rows } = await client.query(`
	SELECT DISTINCT ON (id_producto) id_producto,
                   		productos.descripcion AS "Nombre",
                   		productos.precio AS "Precio",
                   		productos.talle AS "Talle",
                   		tipos_productos.descripcion AS "Categoria",
                   		marcas.descripcion AS "Marca",
                   		generos.descripcion AS "Genero",
                		SUM(cantidad)::INT AS "Ventas"
				FROM lineas_productos
				INNER JOIN productos ON productos.id = lineas_productos.id_producto
				INNER JOIN tipos_productos ON tipos_productos.id = productos.id_tipo_producto
				INNER JOIN marcas ON marcas.id = productos.id_marca
				INNER JOIN generos ON generos.id = productos.id_genero
				GROUP BY (productos.descripcion,
        				id_producto,
        				productos.descripcion,
        				productos.precio,
        				productos.talle,
        				tipos_productos.descripcion,
        				marcas.descripcion,
        				generos.descripcion)
				ORDER BY id_producto`);
    if (rows.length > 0) {
      res.json({
        products: rows.sort((a, b) => a.Ventas - b.Ventas).reverse(),
      });
    } else {
      res.json({ error: "No se pudieron obtener los productos mas vendidos" });
    }
  } catch (error) {
    console.error(error);
  }
};

productosController.getMostSoldCategories = async (req, res) => {
  try {
    const { rows } = await client.query(`
	SELECT DISTINCT ON (tipos_productos.id) tipos_productos.id,
		tipos_productos.descripcion as "Categoria",
		SUM(lineas_productos.cantidad)::INT as "Ventas" 
	FROM tipos_productos
	INNER JOIN productos on productos.id_tipo_producto = tipos_productos.id
	INNER JOIN lineas_productos on lineas_productos.id_producto = productos.id
	GROUP BY (tipos_productos.id)
	`);
    if (rows.length > 0) {
      res.json({
        categories: rows.sort((a, b) => a.Ventas - b.Ventas).reverse(),
      });
    } else {
      res.json({ error: "No se pudieron obtener las categorías mas vendidas" });
    }
  } catch (error) {
    console.error(error);
  }
};

productosController.getMostSoldBrands = async (req, res) => {
  try {
    const { rows } = await client.query(`
	SELECT DISTINCT ON (marcas.id) marcas.id,
		marcas.descripcion as "Marca",
	SUM(lineas_productos.cantidad)::INT as "Ventas" 
	FROM marcas
	INNER JOIN productos on productos.id_marca = marcas.id
	INNER JOIN lineas_productos on lineas_productos.id_producto = productos.id
	GROUP BY (marcas.id)
	`);
    if (rows.length > 0) {
      res.json({ brands: rows.sort((a, b) => a.Ventas - b.Ventas).reverse() });
    } else {
      res.json({ error: "No se han encontrado marcas" });
    }
  } catch (error) {
    console.error(error);
  }
};

productosController.getMostSoldGenres = async (req, res) => {
  try {
    const { rows } = await client.query(`
	SELECT DISTINCT ON (generos.id) generos.id,
		generos.descripcion as "Genero",
	SUM(lineas_productos.cantidad)::INT as "Ventas" 
	FROM generos
	INNER JOIN productos on productos.id_genero = generos.id
	INNER JOIN lineas_productos on lineas_productos.id_producto = productos.id
	GROUP BY (generos.id)
	`);
    if (rows.length > 0) {
      res.json({
        genres: rows.sort((a, b) => a.Ventas - b.Ventas).reverse(),
      });
    } else {
      res.json({ error: "No se han encontrado marcas" });
    }
    // res.json({ genres: rows });
  } catch (error) {
    console.error(error);
  }
};

productosController.getProducts = async (req, res) => {
  try {
    const { rows } = await client.query(`
	SELECT productos.id, productos.descripcion as "Descripcion", precio as "Precio", talle as "Talle", tipos_productos.descripcion as "Categoria", marcas.descripcion as "Marca", generos.descripcion as "Genero"
	FROM public.productos
	INNER JOIN marcas ON marcas.id = productos.id_marca
	INNER JOIN generos ON generos.id = productos.id_genero
	INNER JOIN tipos_productos ON tipos_productos.id = productos.id_tipo_producto
	ORDER BY productos.descripcion	
	`);

    if (rows.length > 0) {
      res.json({ products: rows });
    } else {
      res.json({ error: "No se ha encontrado ningun producto" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = productosController;
