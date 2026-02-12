const express = require('express');
const router = express.Router();

// Controllers
const AuthControllers = require('../controllers/AuthControllers');

// Middlewares
const authMiddleware = require('../middlewares/AuthMiddleware');
const { registerValidation, loginValidation } = require('../middlewares/authValidation');
const upload = require('../middlewares/uploadMiddleware');

//AUTH ROUTES

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Public API to register a new user with profile image
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: first_name
 *         type: string
 *         required: true
 *         description: First name
 *         example: Rahul
 *       - in: formData
 *         name: last_name
 *         type: string
 *         required: true
 *         description: Last name
 *         example: Sharma
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: User email
 *         example: rahul@gmail.com
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: User password
 *         example: password123 
 *       - in: formData
 *         name: profileImage
 *         type: file
 *         required: false
 *         description: Profile image
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 */

// Register user
router.post('/register', upload.single('profileImage'), registerValidation, AuthControllers.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Login using email and password (Public API)
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: User email
 *         example: rahul@gmail.com
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: User password
 *         example: password123
 *     responses:
 *       200:
 *         description: Login successful (returns JWT token)
 *       401:
 *         description: Invalid email or password
 */

// Login user
router.post('/login', loginValidation, AuthControllers.login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Get logged-in user profile
 *     description: JWT protected route. Requires Authorization header.
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */

// Get logged-in user profile (PROTECTED)
router.get('/profile', authMiddleware, AuthControllers.profile);


// Upload / Update profile image (JWT protected)
router.put(
  '/profile/image',
  authMiddleware,
  upload.single('profileImage'),
  AuthControllers.uploadProfileImage
);

module.exports = router;

