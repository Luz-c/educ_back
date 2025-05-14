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

/**
 * @swagger
 * /user/:
 *   post:
 *     summary: Cr e un nouvel utilisateur
 *     description: Cr e un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Le nom complet de l'utilisateur
 *               username:
 *                 type: string
 *                 description: Le nom d'utilisateur
 *               email:
 *                 type: string
 *                 description: L'adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *               role:
 *                 type: string
 *                 enum: [user, teacher, admin]
 *                 description: Le r le de l'utilisateur
 *               class:
 *                 type: string
 *                 description: La classe de l'utilisateur
 *     responses:
 *       201:
 *         description: L'utilisateur a  t  cr e avec succ s
 *       400:
 *         description: Le formulaire est invalide
 *       409:
 *         description: L'utilisateur existe d j 
 */

router.post("/", validateRequest(userValidation.createUserSchema), userController.create)


router.put("/:id", validateRequest(userValidation.updateUserSchema), userController.update)
router.delete("/:id", userController.remove)
router.get("/email/:email", userController.getByEmail)
router.get("/username/:username", userController.getByUsername)
router.get("/role/:role", userController.getByRole)
router.get("/class/:className", userController.getByClass)

module.exports = router
