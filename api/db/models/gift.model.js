const { Model, DataTypes } = require('sequelize');
const modelOptions = require('../../../utils/modelOptions');

const GIFT_TABLE = 'gift';
const { CATEGORY_TABLE } = require('./category.model');
const options = modelOptions(false, 'Gift', GIFT_TABLE);

const GiftSchema = {
	id: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	description: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	price: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},
	image: {
		allowNull: false,
		type: DataTypes.STRING,
		validate: {
			isUrl: true,
		},
	},
	rating: {
		allowNull: false,
		type: DataTypes.INTEGER,
		defaultValue: 0,
		validate: {
			min: 0,
			max: 5,
		},
	},
	quantity: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	createdAt: {
		allowNull: false,
		field: 'created_at',
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	categoryId: {
		allowNull: false,
		field: 'category_id',
		type: DataTypes.UUID,
		references: {
			model: CATEGORY_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

class Gift extends Model {
	static config(sequelize) {
		return { sequelize, options };
	}

	static associate(models) {
		this.belongsTo(models.Category, { as: 'category' });
		this.belongsToMany(models.Cart, {
			as: 'carts',
			through: models.CartItem,
			foreignKey: 'giftId',
			otherKey: 'cartId',
		});
		this.belongsToMany(models.Order, {
			as: 'orders',
			through: models.OrderItem,
			foreignKey: 'giftId',
			otherKey: 'orderId',
		});
	}
}

module.exports = { Gift, GiftSchema, GIFT_TABLE };
