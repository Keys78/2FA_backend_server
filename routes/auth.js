const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, verifyOTP, resendOTP } = require('../controllers/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDTO:
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
 *     LoginDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Verify2FADTO:
 *       type: object
 *       required:
 *         - otp
 *       properties:
 *         otp:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ResendOTP_DTO:
 *       type: object
 *       required:
 *         - otp
 */


/**
  * @swagger
  * tags:
  *   name: User Auth
  */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: create a new user
 *     tags: [User Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDTO'
 *     responses:
 *       200:
 *         description: user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterDTO'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [User Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: 
 */

/**
 * @swagger
 * /verify2FA/{id}:
 *  post:
 *    tags: [User Auth]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Verify2FADTO'
 *    responses:
 *      200:
 *        description: 
 */

// /**
//  * @swagger
//  * /resend-otp/{id}:
//  *  post:
//  *    tags: [User Auth]
//  *    parameters:
//  *      - in: path
//  *        name: id
//  *        schema:
//  *          type: string
//  *        required: true
//  *    requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            $ref: '#/components/schemas/ResendOTP_DTO'
//  *    responses:
//  *      200:
//  *        description: 
//  */



router.route("/verify2FA/:id").post(verifyOTP)
router.post("/register", async (req, res, next) => { await register(req.body, 'user', res, next) });
router.route("/login").post(login)
router.route("/resend-otp/:id").post(resendOTP)
router.route("/:id/verify/:token").post(verifyEmail)




module.exports = router