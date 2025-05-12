/**
 * Routes pour le modèle User
 */
const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const validateRequest = require("../middlewares/validateRequest")
const { userValidation } = require("../validations")

// Routes utilisateur
router.get("/", userController.getAll)
router.get("/:id", userController.getOne)
router.post("/", validateRequest(userValidation.createUserSchema), userController.create)
router.put("/:id", validateRequest(userValidation.updateUserSchema), userController.update)
router.delete("/:id", userController.remove)
router.get("/email/:email", userController.getByEmail)
router.get("/username/:username", userController.getByUsername)
router.get("/role/:role", userController.getByRole)
router.get("/class/:className", userController.getByClass)

module.exports = router
