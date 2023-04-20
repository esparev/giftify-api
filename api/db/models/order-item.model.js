const { Model, DataTypes } = require('sequelize');
const modelOptions = require('../../../utils/modelOptions');

const ORDER_ITEM_TABLE = 'order_has_item';
const { ORDER_TABLE } = require('./order.model');
const { GIFT_TABLE } = require('./gift.model');
const options = modelOptions(false, 'OrderItem', ORDER_ITEM_TABLE);

const OrderItemSchema = {
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
	orderId: {
		allowNull: false,
		field: 'order_id',
		type: DataTypes.UUID,
		references: {
			model: ORDER_TABLE,
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
};

class OrderItem extends Model {
	static config(sequelize) {
		return { sequelize, options };
	}
}

module.exports = { OrderItem, OrderItemSchema, ORDER_ITEM_TABLE };
