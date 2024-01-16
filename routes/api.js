const express = require("express");
const router = express.Router();
const bidsController = require("../controllers/bidsController");
const productsController = require("../controllers/productController");
// Bids
router.get("/bids", bidsController.getAllBids);
router.get("/bids/:id", bidsController.getBidById);
router.post("/bids", bidsController.createBid);
router.put("/bids/:id", bidsController.updateBid);
router.delete("/bids/:id", bidsController.deleteBid);

// Products
router.get("/products", productsController.getAllProducts);
router.get("/products/:id", productsController.getProductById);
router.post("/products", productsController.createProduct);
router.put("/products/:id", productsController.updateProduct);
router.delete("/products/:id", productsController.deleteProduct);

module.exports = router;
