const express = require('express');
const router = express.Router();

// Controllers
const StudentController = require('../controllers/StudentControllers');

// Middlewares
const authMiddleware = require('../middlewares/AuthMiddleware');
const {
  validateCreateStudent,
  validateUpdateStudent,
  validateStudentQuery
} = require('../middlewares/studentValidation');

// STUDENT ROUTES

/**
 * @swagger
 * tags:
 *   - name: Student
 *     description: Student CRUD APIs
 */

/**
 * @swagger
 * /api/students/create:
 *   post:
 *     tags: [Student]
 *     summary: Create a new student
 *     description: JWT protected route. Requires Authorization header.
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: Student name
 *         example: Rahul Sharma
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: Student email
 *         example: rahulstudent@gmail.com
 *       - in: formData
 *         name: age
 *         type: integer
 *         required: true
 *         description: Student age
 *         example: 22
 *       - in: formData
 *         name: course
 *         type: string
 *         required: true
 *         description: Course enrolled
 *         example: Computer Science
 *     responses:
 *       201:
 *         description: Student created successfully
 *       401:
 *         description: Unauthorized
 */

router.post(
  '/create',
  authMiddleware,
  validateCreateStudent,
  StudentController.createStudent
);

/**
 * @swagger
 * /api/students/all:
 *   get:
 *     tags: [Student]
 *     summary: Get all students
 *     description: JWT protected route. Supports pagination and search.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 5
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: rahul
 *         description: Search by name, email, or course (case-insensitive)
 *     responses:
 *       200:
 *         description: Students fetched successfully
 *       401:
 *         description: Unauthorized
 */

router.get(
  '/all',
  authMiddleware,
  validateStudentQuery,
  StudentController.getAllStudents
);

/**
 * @swagger
 * /api/students/update/{id}:
 *   put:
 *     tags: [Student]
 *     summary: Update student
 *     description: JWT protected route. Requires Authorization header.
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Student ID
 *         example: 64c7c8f2a1b2c3d4e5f6a7b8
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Student name
 *         example: Rahul updated
 *       - in: formData
 *         name: email
 *         type: string
 *         description: Student email
 *         example: rahulupdated@gmail.com
 *       - in: formData
 *         name: age
 *         type: integer
 *         description: Student age
 *         example: 23
 *       - in: formData
 *         name: course
 *         type: string
 *         description: Course enrolled
 *         example: Data Science
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       401:
 *         description: Unauthorized
 */

router.put(
  '/update/:id',
  authMiddleware,
  validateUpdateStudent,
  StudentController.updateStudent
);

/**
 * @swagger
 * /api/students/delete/{id}:
 *   delete:
 *     tags: [Student]
 *     summary: Delete student
 *     description: JWT protected route. Requires Authorization header.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string 
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       401:
 *         description: Unauthorized
 */


router.delete(
  '/delete/:id',
  authMiddleware,
  StudentController.deleteStudent
);

module.exports = router;
