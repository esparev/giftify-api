const Joi = require('joi');

// Data rules
const id = Joi.string().uuid({ version: 'uuidv4' });
const streetName = Joi.string().max(100);
const streetNumber = Joi.string().max(10);
const postalCode = Joi.string().max(10);
const city = Joi.string().max(100);
const area = Joi.string().max(100);
const locality = Joi.string().max(100);
const country = Joi.string().max(100);
const userId = Joi.string().uuid({ version: 'uuidv4' });

const getAddressSchema = Joi.object({
	id: id.required(),
});

const createAddressSchema = Joi.object({
	streetName: streetName.required(),
	streetNumber: streetNumber.required(),
	postalCode: postalCode.required(),
	city: city.required(),
	area: area.required(),
	locality: locality.required(),
	country: country.required(),
	userId: userId.required(),
});

const updateAddressSchema = Joi.object({
	streetName,
	streetNumber,
	postalCode,
	city,
	area,
	locality,
	country,
});

module.exports = { getAddressSchema, createAddressSchema, updateAddressSchema };
