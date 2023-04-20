const { Model, DataTypes } = require('sequelize');
const modelOptions = require('../../../utils/modelOptions');

const ADDRESS_TABLE = 'address';
const { USER_TABLE } = require('./user.model');
const options = modelOptions(false, 'Address', ADDRESS_TABLE);

const AddressSchema = {
	id: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	streetName: {
		allowNull: false,
		field: 'street_name',
		type: DataTypes.STRING,
	},
	streetNumber: {
		allowNull: false,
		field: 'street_number',
		type: DataTypes.STRING,
	},
	postalCode: {
		allowNull: false,
		field: 'postal_code',
		type: DataTypes.STRING,
	},
	city: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	area: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	locality: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	country: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	createdAt: {
		allowNull: false,
		field: 'created_at',
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	updatedAt: {
		allowNull: false,
		field: 'updated_at',
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	userId: {
		allowNull: false,
		field: 'user_id',
		type: DataTypes.UUID,
		references: {
			model: USER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

class Address extends Model {
	static config(sequelize) {
		return { sequelize, ...options };
	}

	static associate(models) {
		this.hasMany(models.Order, { as: 'orders', foreignKey: 'addressId' });
		this.belongsTo(models.User, { as: 'user' });
	}
}

module.exports = { Address, AddressSchema, ADDRESS_TABLE };
