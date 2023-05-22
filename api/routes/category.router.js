// @ts-check
const express = require('express');
const passport = require('passport');
const CategoryService = require('../services/category.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();
const service = new CategoryService();
const {
	getCategorySchema,
	createCategorySchema,
	updateCategorySchema,
} = require('../schemas/category.schema');

const getCategories = async (req, res, next) => {
	try {
		const categories = await service.find();
		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
};

const getCategory = async (req, res, next) => {
	try {
		const { id } = req.params;
		const category = await service.findOne(id);
		res.status(200).json(category);
	} catch (error) {
		next(error);
	}
};

const createCategory = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const body = req.body;
		const newCategory = await service.create(body);
		res.status(201).json({ newCategory, message: 'category created' });
	} catch (error) {
		next(error);
	}
};

const updateCategory = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const { id } = req.params;
		const body = req.body;
		const updatedCategory = await service.update(id, body);
		res.status(200).json({ updatedCategory, message: 'category updated' });
	} catch (error) {
		next(error);
	}
};

const deleteCategory = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const { id } = req.params;
		const deletedCategory = await service.delete(id);
		res.status(200).json({ deletedCategory, message: 'category deleted' });
	} catch (error) {
		next(error);
	}
};

router.get('/', getCategories);
router.get('/:id', validatorHandler(getCategorySchema, 'params'), getCategory);
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createCategorySchema, 'body'),
	createCategory
);
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getCategorySchema, 'params'),
	validatorHandler(updateCategorySchema, 'params'),
	updateCategory
);
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	deleteCategory
);

module.exports = router;
