'use strict';

const { AddressSchema, ADDRESS_TABLE } = require('../models/address.model');
const { CartSchema, CART_TABLE } = require('../models/cart.model');
const { CartItemSchema, CART_ITEM_TABLE } = require('../models/cart-item.model');
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { GiftSchema, GIFT_TABLE } = require('../models/gift.model');
const { OrderSchema, ORDER_TABLE } = require('../models/order.model');
const { OrderItemSchema, ORDER_ITEM_TABLE } = require('../models/order-item.model');
const { PaymentMethodSchema, PAYMENT_METHOD_TABLE } = require('../models/payment-method.model');
const { UserSchema, USER_TABLE } = require('../models/user.model');

module.exports = {
	async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CART_TABLE, CartSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(GIFT_TABLE, GiftSchema);
    await queryInterface.createTable(ADDRESS_TABLE, AddressSchema);
    await queryInterface.createTable(PAYMENT_METHOD_TABLE, PaymentMethodSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(CART_ITEM_TABLE, CartItemSchema);
    await queryInterface.createTable(ORDER_ITEM_TABLE, OrderItemSchema);
	},

	async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_ITEM_TABLE);
    await queryInterface.dropTable(CART_ITEM_TABLE);
    await queryInterface.dropTable(ADDRESS_TABLE);
    await queryInterface.dropTable(PAYMENT_METHOD_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CART_TABLE);
    await queryInterface.dropTable(GIFT_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);

	},
};
