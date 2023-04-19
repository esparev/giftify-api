const { Address, AddressSchema } = require('./address.model');
const { CartItem, CartItemSchema } = require('./cart-item.model');
const { Cart, CartSchema } = require('./cart.model');
const { Category, CategorySchema } = require('./category.model');
const { Gift, GiftSchema } = require('./gift.model');
const { OrderItem, OrderItemSchema } = require('./order-item.model');
const { Order, OrderSchema } = require('./order.model');
const { PaymentMethod, PaymentMethodSchema } = require('./payment-method.model');
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Gift.init(GiftSchema, Gift.config(sequelize));
  PaymentMethod.init(PaymentMethodSchema, PaymentMethod.config(sequelize));
	Address.init(AddressSchema, Address.config(sequelize));
  Cart.init(CartSchema, Cart.config(sequelize));
  CartItem.init(CartItemSchema, CartItem.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderItem.init(OrderItemSchema, OrderItem.config(sequelize));

  User.associate(sequelize.models);
  PaymentMethod.associate(sequelize.models);
	Address.associate(sequelize.models);
  Category.associate(sequelize.models);
  Gift.associate(sequelize.models);
  Cart.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
