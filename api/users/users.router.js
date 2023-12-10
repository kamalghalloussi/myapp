const express = require("express");
const usersController = require("./users.controller");
const authMiddleware = require("./middlewares/auth"); 
const router = express.Router();

// Utiliser le middleware d'authentification pour protéger les routes si nécessaire
router.use("/:id", authMiddleware.verifyUser); 

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", authMiddleware.requireAdmin, usersController.update); 
router.delete("/:id", authMiddleware.requireAdmin, usersController.delete); 

module.exports = router;
