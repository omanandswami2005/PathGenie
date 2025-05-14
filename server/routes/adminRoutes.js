import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

/**
 * Routes for admin functionalities
 * @module adminRoutes
 * @requires express
 * @requires adminController
 * @requires authMiddleware
 */

/**
 * Route for adding a new teacher to the system
 * @route POST /teacher
 * @group Admin - Teacher
 * @param {string} name.body.required - The name of the teacher
 * @param {string} department.body.required - The department of the teacher
 * @param {string} subject.body.required - The subject of the teacher
 * @returns {Object} 200 - The newly created teacher
 * @returns {Object} 401 - If not authenticated
 * @returns {Object} 422 - If any of the required fields are missing
 */
router.post('/teacher', authMiddleware, adminController.addTeacher);

/**
 * Route for updating a teacher's details
 * @route PUT /teacher/:id
 * @group Admin - Teacher
 * @param {string} name.body - The name of the teacher
 * @param {string} department.body - The department of the teacher
 * @param {string} subject.body - The subject of the teacher
 * @returns {Object} 200 - The updated teacher
 * @returns {Object} 401 - If not authenticated
 * @returns {Object} 404 - If the teacher does not exist
 * @returns {Object} 422 - If any of the required fields are missing
 */
router.put('/teacher/:id', authMiddleware, adminController.updateTeacher);

/**
 * Route for deleting a teacher from the system
 * @route DELETE /teacher/:id
 * @group Admin - Teacher
 * @returns {Object} 200 - The deleted teacher
 * @returns {Object} 401 - If not authenticated
 * @returns {Object} 404 - If the teacher does not exist
 */
router.delete('/teacher/:id', authMiddleware, adminController.deleteTeacher);

/**
 * Route for approving a student's request to join the system
 * @route PUT /approve/:id
 * @group Admin - Student
 * @returns {Object} 200 - The approved student
 * @returns {Object} 401 - If not authenticated
 * @returns {Object} 404 - If the student does not exist
 */
router.put('/approve/:id', authMiddleware, adminController.approveStudent);

/**
 * Route for deleting a student from the system
 * @route DELETE /student/:id
 * @group Admin - Student
 * @returns {Object} 200 - The deleted student
 * @returns {Object} 401 - If not authenticated
 * @returns {Object} 404 - If the student does not exist
 */
router.delete('/student/:id', authMiddleware, adminController.deleteStudent);

router.get('/getmonthlydata', authMiddleware, adminController.getMonthlyData);

export default router;
