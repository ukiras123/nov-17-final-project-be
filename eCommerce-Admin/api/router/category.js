const express = require('express');
const { message: { SUCCESS } } = require('../utils/const');
const {
  registerUser, verifyUser, loginUser, getAdminInfo, logOutUser, generateOTP, resetPassword,
} = require('../controller/userController');
const { adminRegistrationValidation, accountVerificationValidation, loginValidation } = require('../middleware/joiValidation/adminValidation');
const { auth, refreshAuth } = require('../middleware/authMiddleware');
const { deleteSession } = require('../model/session/SessionModel');
const { updateAdmin } = require('../model/user/UserModel');
const {
  createCategory, getCategories, getACategory, updateACategory, deleteACategory, createCategoryController, getCategoriesController, getACategoryController, updateACategoryController, deleteACategoryController,
} = require('../controller/categoryController');
const { createCategoryValidation } = require('../middleware/joiValidation/categoryValidation');

const categoryRouter = express.Router();

// Category CRUD
categoryRouter.post('/', createCategoryValidation, createCategoryController);
categoryRouter.get('/', getCategoriesController);
categoryRouter.get('/:_id', getACategoryController);
categoryRouter.put('/:_id', updateACategoryController);
categoryRouter.delete('/:_id', deleteACategoryController);

module.exports = {
  categoryRouter,
};
