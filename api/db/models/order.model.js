const { Model, DataTypes } = require('sequelize');
const modelOptions = require('../../../utils/modelOptions');

const ORDER_TABLE = 'order';
const { USER_TABLE } = require('./user.model');
const { ADDRESS_TABLE } = require('./address.model');
const { PAYMENT_METHOD_TABLE } = require('./payment-method.model');
const options = modelOptions(false, 'Order', ORDER_TABLE);

const OrderSchema = {
	id: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	total: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},
	status: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	createdAt: {
		allowNull: false,
		field: 'created_at',
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
	addressId: {
		allowNull: false,
		field: 'address_id',
		type: DataTypes.UUID,
		references: {
			model: ADDRESS_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	paymentMethodId: {
		allowNull: false,
		field: 'payment_method_id',
		type: DataTypes.UUID,
		references: {
			model: PAYMENT_METHOD_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

class Order extends Model {
	static config(sequelize) {
		return { sequelize, options };
	}

	static associate(models) {
		this.belongsTo(models.PaymentMethod, { as: 'paymentMethod' });
		this.belongsTo(models.Address, { as: 'address' });
		this.belongsTo(models.User, { as: 'user' });
		this.belongsToMany(models.Gift, {
			as: 'gifts',
			through: models.OrderItem,
			foreignKey: 'orderId',
			otherKey: 'giftId',
		});
	}
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
