// @ts-check
const express = require('express');
const passport = require('passport');
const AddressService = require('../services/address.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
	checkRoles,
	belongsToUserById,
} = require('../../middlewares/auth.handler');

const router = express.Router();
const service = new AddressService();
const {
	getAddressSchema,
	createAddressSchema,
	updateAddressSchema,
} = require('../schemas/address.schema');

const getAllAddresses = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const addresses = await service.find();
		res.status(200).json(addresses);
	} catch (error) {
		next(error);
	}
};

const getAddresses = async (req, res, next) => {
	try {
		const { id } = req.params;
		belongsToUserById(id);
		checkRoles(['admin']);
		const addresses = await service.findByUser(id);
		res.status(200).json(addresses);
	} catch (error) {
		next(error);
	}
};

const getAddress = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const address = await service.findOne(id);
		res.status(200).json(address);
	} catch (error) {
		next(error);
	}
};

const createAddress = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const body = req.body;
		const newAddress = await service.create(body);
		res.status(201).json({ newAddress, message: 'address created' });
	} catch (error) {
		next(error);
	}
};

const updateAddress = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const body = req.body;
		const updatedAddress = await service.update(id, body);
		res.status(200).json({ updatedAddress, message: 'address updated' });
	} catch (error) {
		next(error);
	}
};

const deleteAddress = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const deletedAddress = await service.delete(id);
		res.status(200).json({ deletedAddress, message: 'address deleted' });
	} catch (error) {
		next(error);
	}
};

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	getAllAddresses
);
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getAddressSchema, 'params'),
	getAddress
);
router.get(
	'/user/:id',
	passport.authenticate('jwt', { session: false }),
	getAddresses
);
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createAddressSchema, 'body'),
	createAddress
);
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getAddressSchema, 'params'),
	validatorHandler(updateAddressSchema, 'body'),
	updateAddress
);
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	deleteAddress
);

module.exports = router;
