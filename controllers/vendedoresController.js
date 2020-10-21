const { client } = require("./../database");
vendedoresController = {}

vendedoresController.getBestSalespeople = async (req,res) => {
	try {
    const { rows } = await client.query(`
	SELECT DISTINCT ON (vendedores.id) vendedores.id,
		vendedores.nombre_completo as "Vendedor",
	SUM(lineas_productos.cantidad)::INT as "Ventas" 
	FROM vendedores
	INNER JOIN ventas on ventas.id_vendedor = vendedores.id
	INNER JOIN lineas_productos_ventas on lineas_productos_ventas.id_venta = ventas.id
	INNER JOIN lineas_productos on lineas_productos_ventas.id_linea_producto = lineas_productos.id
	INNER JOIN productos on lineas_productos.id_producto = productos.id
	GROUP BY (vendedores.id)
	`);
    res.json({ salespeople: rows });
  } catch (error) {
    console.error(error);
  }
}

vendedoresController.getSales = async (req,res) => {
	try {
		const { rows } = await client.query(`
		SELECT
  			vendedores.nombre_completo as "Vendedor", 
			ventas.fecha as "Fecha",
  			productos.descripcion as "Producto",
  			lineas_productos.cantidad as "Cantidad"
		FROM ventas
  		INNER JOIN vendedores on ventas.id_vendedor = vendedores.id
  		INNER JOIN lineas_productos_ventas on lineas_productos_ventas.id_venta = ventas.id
  		INNER JOIN lineas_productos on lineas_productos_ventas.id_linea_producto = lineas_productos.id
  		INNER JOIN productos on productos.id = lineas_productos.id_producto
		ORDER BY(vendedores.nombre_completo)`);
		  res.json({ sales: rows });
	} catch (error) {
		console.error(error)
	}
}

module.exports = vendedoresController;