const express = require('express');
const { getUser, deleteUser, getAllVerifiedUsers, getAllUnverifiedUsers, activate2FA, deactivate2FA } = require('../controllers/private');
const { protect, isAdmin } = require('../middlewares/authProtect');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDTO:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AdminDTO:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */


/**
  * @swagger
  * tags:
  *   name: User
  */

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDTO'
 *     responses:
 *       200:
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminDTO'
 *     responses:
 *       200:
 *       500:
 *         description: Some server error
 */


router.route('/user').get(protect, getUser);
router.route("/activate2FA/:id").post(protect, activate2FA)
router.route("/deactivate2FA/:id").post(protect, deactivate2FA)

router.route('/admin/all-verified-users').get(protect, isAdmin, getAllVerifiedUsers);
router.route('/admin/all-unverified-users').get(protect, isAdmin, getAllUnverifiedUsers);
router.route('/admin/delete-user/:id').delete(protect, isAdmin, deleteUser);



 

module.exports = router