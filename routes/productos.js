const { Router } = require("express");
const router = Router();
module.exports = router;

const {
  getMostSoldProducts,
  getMostSoldCategories,
  getMostSoldBrands,
  getMostSoldGenres,
  getProducts
} = require("./../controllers/productosController");

router.route("/").get(getProducts)
router.route("/most-sold-products").get(getMostSoldProducts);
router.route("/most-sold-categories").get(getMostSoldCategories);
router.route("/most-sold-brands").get(getMostSoldBrands);
router.route("/most-sold-genres").get(getMostSoldGenres);
