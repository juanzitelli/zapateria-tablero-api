const { Router } = require("express");
const router = Router();
module.exports = router;

const {
	getBestSalespeople, getSales
} = require("./../controllers/vendedoresController");

router.route("/best-salespeople").get(getBestSalespeople);
router.route("/sales").get(getSales);
