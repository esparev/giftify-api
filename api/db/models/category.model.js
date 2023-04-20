const { Model, DataTypes } = require('sequelize');
const modelOptions = require('../../../utils/modelOptions');

const CATEGORY_TABLE = 'category';
const options = modelOptions(false, 'Category', CATEGORY_TABLE);

const CategorySchema = {
	id: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	slug: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: true,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	createdAt: {
		allowNull: false,
		field: 'created_at',
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
};

class Category extends Model {
	static config(sequelize) {
		return { sequelize, options };
	}

	static associate(models) {
		this.hasMany(models.Gift, { as: 'gifts', foreignKey: 'categoryId' });
	}
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE };
