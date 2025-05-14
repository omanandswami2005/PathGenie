// import User from '../models/User.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
// import appointments from '../models/Appointment.model.js';
import bcrypt from 'bcrypt';

const constantTeachers = [
  '668ac01fbf498dba5c703408',
  '668ac03ebf498dba5c70340c',
  '668ac06abf498dba5c703410',
  '668ac090bf498dba5c703414',
];

/**
 * Add a new teacher to the system.
 * Limits the number of teachers to 10.
 * Hashes the password before saving.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {ApiError} If the teacher quota has been reached.
 */
export default {
  addTeacher: asyncHandler(async (req, res) => {
    const { name, email, password, department, subject } = req.body;

    // Limit the number of teachers
    const teachers = await User.countDocuments({ role: 'teacher' });
    if (teachers >= 10) {
      throw new ApiError(400, 'Sorry, The Teacher Quota has been reached :(');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      department,
      subject,
      role: 'teacher',
      approved: true,
      isVerified: true,
    });
    await newUser.save();

    res
      .status(201)
      .json(new ApiResponse(201, { newUser }, 'Teacher added successfully !'));
  }),

  updateTeacher: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, department, subject } = req.body;

    if (constantTeachers.includes(id)) {
      throw new ApiError(400, 'This Teacher Cannot Be Updated !');
    }

    const updatedTeacher = await User.findByIdAndUpdate(
      id,
      { name, department, subject },
      { new: true }
    );
    res
      .status(200)
      .json(
        new ApiResponse(200, { updatedTeacher }, 'Teacher updated successfully')
      );
  }),

  deleteTeacher: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (constantTeachers.includes(id)) {
      throw new ApiError(400, 'This Teacher Cannot Be Deleted !');
    }

    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json(new ApiResponse(200, null, 'Teacher deleted successfully'));
  }),

  approveStudent: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (id === '668abc8e8b7083333d78e3e4') {
      throw new ApiError(400, 'This Student Cannot Be Restricted !');
    }

    // Find the student by ID and role
    const student = await User.findOne({ _id: id, role: 'student' }).select(
      '-password -role -__v'
    );
    // Toggle the approved value
    student.approved = !student.approved;

    // Save the updated student
    await student.save();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { student },
          `Student ${student.approved ? 'APPROVED' : 'RESTRICTED'} successfully`
        )
      );
  }),

  viewAllStudents: asyncHandler(async (req, res) => {
    const limit = req.params.limit ? parseInt(req.params.limit) : 10;
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const students = await User.find({ role: 'student' })
      .skip((page - 1) * limit)
      .limit(limit);

    res
      .status(200)
      .json(new ApiResponse(200, { students }, 'Students found successfully'));
  }),

  deleteStudent: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (id == '668abc8e8b7083333d78e3e4') {
      throw new ApiError(400, 'This Student Cannot Be Deleted !');
    }
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json(new ApiResponse(200, null, 'Student deleted successfully'));
  }),

  viewAllTeachers: asyncHandler(async (req, res) => {
    const teachers = await User.find({ role: 'teacher' });
    // console .info(teachers);
    const TeacherList = teachers.map((teacher) => {
      return {
        id: teacher._id,
        name: teacher.name,
        department: teacher.department,
        subject: teacher.subject,
        email: teacher.email,
      };
    });
    res
      .status(200)
      .json(new ApiResponse(200, { TeacherList }, 'Teachers found successfully'));
  }),

  viewAllAppointments: asyncHandler(async (req, res) => {
    const appointmentsList = await appointments.find();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { appointments: appointmentsList },
          'Appointments found successfully'
        )
      );
  }),

  getAllCounts: asyncHandler(async (req, res) => {
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalStudents = await User.countDocuments({ role: 'student' });
    const approvedStudentRegistration = await User.countDocuments({
      role: 'student',
      approved: true,
    });
    const pendingStudentRegistration = await User.countDocuments({
      role: 'student',
      approved: false,
    });

    const totalAppointments = await appointments.countDocuments();

    const pendingAppointments = await appointments.countDocuments({
      status: 'Pending',
    });

    const upcomingAppointments = await appointments.countDocuments({
      date: { $gte: new Date() },
      status: { $in: ['Approved'] },
    });
    const completedAppointments = await appointments.countDocuments({
      status: 'Completed',
    });

    const canceledAppointments = await appointments.countDocuments({
      status: 'Canceled',
    });

    const allCounts = {
      totalTeachers,
      totalStudents,
      approvedStudentRegistration,
      pendingStudentRegistration,
      totalAppointments,
      pendingAppointments,
      upcomingAppointments,
      completedAppointments,
      canceledAppointments,
    };
    res
      .status(200)
      .json(new ApiResponse(200, { allCounts }, 'Counts found successfully'));
  }),

  getMonthlyData: asyncHandler(async (req, res) => {
    const appointmentData = await getMonthlyData();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { appointmentData },
          'Monthly data found successfully'
        )
      );
  }),
};

