const Student = require('../models/StudentModel');

class StudentController {
    // CREATE student 
    static async createStudent(req, res) {
        try {
            const student = await Student.create({
                ...req.body,
                createdBy: req.user.userId
            });

            res.status(201).json({
                message: 'Student created successfully',
                student
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // FETCH all students with PAGINATION + SEARCH
    static async getAllStudents(req, res) {
        try {
            const userId = req.user.userId;

            // Query params
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const search = req.query.search || '';

            const skip = (page - 1) * limit;

            // Search condition
            const searchQuery = {
                createdBy: userId,
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { course: { $regex: search, $options: 'i' } }
                ]
            };

            // Fetch data
            const students = await Student.find(searchQuery)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            const totalStudents = await Student.countDocuments(searchQuery);

            res.status(200).json({
                message: 'Students fetched successfully',
                meta: {
                    total: totalStudents,
                    page,
                    limit,
                    totalPages: Math.ceil(totalStudents / limit)
                },
                students
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // UPDATE student
    static async updateStudent(req, res) {
        try {
            const { id } = req.params;

            const updatedStudent = await Student.findOneAndUpdate(
                { _id: id, createdBy: req.user.userId }, // ownership check
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedStudent) {
                return res.status(404).json({
                    message: 'Student not found or unauthorized'
                });
            }

            res.status(200).json({
                message: 'Student updated successfully',
                student: updatedStudent
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // DELETE
    static async deleteStudent(req, res) {
        try {
            const { id } = req.params;

            const deletedStudent = await Student.findOneAndDelete({
                _id: id,
                createdBy: req.user.userId
            });

            if (!deletedStudent) {
                return res.status(404).json({
                    message: 'Student not found or unauthorized'
                });
            }

            res.status(200).json({
                message: 'Student deleted successfully',
                studentId: id
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = StudentController;
