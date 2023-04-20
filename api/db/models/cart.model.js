const { Model, DataTypes } = require('sequelize');
const modelOptions = require('../../../utils/modelOptions');

const CART_TABLE = 'cart';
const { USER_TABLE } = require('./user.model');
const options = modelOptions(false, 'Cart', CART_TABLE);

const CartSchema = {
	id: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	quantity: {
		allowNull: false,
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	total: {
		allowNull: false,
		type: DataTypes.FLOAT,
		defaultValue: 0,
		validate: {
			min: 0,
		},
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

class Cart extends Model {
	static config(sequelize) {
		return { sequelize, ...options };
	}

	static associate(models) {
		this.belongsTo(models.User, { as: 'user' });
		this.belongsToMany(models.Gift, {
			as: 'gifts',
			through: models.CartItem,
			foreignKey: 'cartId',
			otherKey: 'giftId',
		});
	}
}

module.exports = { Cart, CartSchema, CART_TABLE };
