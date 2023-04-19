const Joi = require('joi');

// Data rules
const id = Joi.number().integer();
const streetName = Joi.string().max(100);
const streetNumber = Joi.string().max(10);
const postalCode = Joi.string().max(10);
const locality = Joi.string().max(100);
const area = Joi.string().max(100);
const country = Joi.string().max(100);

const getAddressSchema = Joi.object({
	id: id.required(),
});

const createAddressSchema = Joi.object({
	streetName: streetName.required(),
	streetNumber: streetNumber.required(),
	postalCode: postalCode.required(),
	locality: locality.required(),
	area: area.required(),
	country: country.required(),
});

const updateAddressSchema = Joi.object({
	streetName,
	streetNumber,
	postalCode,
	locality,
	area,
	country,
});

module.exports = { getAddressSchema, createAddressSchema, updateAddressSchema };
