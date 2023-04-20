const { Model, DataTypes } = require('sequelize');
const modelOptions = require('../../../utils/modelOptions');

const CART_ITEM_TABLE = 'cart_has_item';
const { CART_TABLE } = require('./cart.model');
const { GIFT_TABLE } = require('./gift.model');
const options = modelOptions(false, 'CartItem', CART_ITEM_TABLE);

const CartItemSchema = {
	id: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	quantity: {
		allowNull: false,
		type: DataTypes.INTEGER,
		defaultValue: 1,
	},
	cartId: {
		allowNull: false,
		field: 'cart_id',
		type: DataTypes.UUID,
		references: {
			model: CART_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	giftId: {
		allowNull: false,
		field: 'gift_id',
		type: DataTypes.UUID,
		references: {
			model: GIFT_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
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
};

class CartItem extends Model {
	static config(sequelize) {
		return { sequelize, ...options };
	}
}

module.exports = { CartItem, CartItemSchema, CART_ITEM_TABLE };
