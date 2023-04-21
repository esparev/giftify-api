const { login } = require('./auth.resolvers');
const { address, addresses, createAddress, updateAddress, deleteAddress } = require('./address.resolvers'); // prettier-ignore
const { cart, carts, createCart, updateCart, deleteCart } = require('./cart.resolvers'); // prettier-ignore
const { category, categories, createCategory, updateCategory, deleteCategory } = require('./category.resolvers'); // prettier-ignore
const { gift, gifts, createGift, updateGift, deleteGift } = require('./gift.resolvers'); // prettier-ignore
const { order, orders, createOrder, updateOrder, deleteOrder } = require('./order.resolvers'); // prettier-ignore
const { paymentMethod, paymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } = require('./payment-method.resolvers'); // prettier-ignore
const { user, users, createUser, updateUser, deleteUser } = require('./user.resolvers'); // prettier-ignore

// prettier-ignore
const resolvers = {
	Query: {
    address, addresses,
    cart, carts,
    category, categories,
    gift, gifts,
    order, orders,
    paymentMethod, paymentMethods,
    user, users,
  },
	Mutation: {
    login,
    createAddress, updateAddress, deleteAddress,
    createCart, updateCart, deleteCart,
    createCategory, updateCategory, deleteCategory,
    createGift, updateGift, deleteGift,
    createOrder, updateOrder, deleteOrder,
    createPaymentMethod, updatePaymentMethod, deletePaymentMethod,
    createUser, updateUser, deleteUser,
  },
};

module.exports = resolvers;
