const { address, addresses, allAddresses, createAddress, updateAddress, deleteAddress } = require('./address.resolvers'); // prettier-ignore
const { cart, carts, createCart, updateCart, deleteCart } = require('./cart.resolvers'); // prettier-ignore
const { category, categories, createCategory, updateCategory, deleteCategory } = require('./category.resolvers'); // prettier-ignore
const { gift, gifts, giftsByCategory, giftsBySearchInput, createGift, updateGift, deleteGift } = require('./gift.resolvers'); // prettier-ignore
const { order, orders, allOrders, createOrder, updateOrder, deleteOrder } = require('./order.resolvers'); // prettier-ignore
const { paymentMethod, paymentMethods, allPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } = require('./payment-method.resolvers'); // prettier-ignore
const { user, users, createUser, updateUser, deleteUser } = require('./user.resolvers'); // prettier-ignore

// prettier-ignore
const resolvers = {
	Query: {
    address, addresses, allAddresses,
    cart, carts,
    category, categories,
    gift, gifts, giftsByCategory, giftsBySearchInput,
    order, orders, allOrders,
    paymentMethod, paymentMethods, allPaymentMethods,
    user, users,
  },
	Mutation: {
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
