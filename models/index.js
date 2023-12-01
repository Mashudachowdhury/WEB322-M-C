const { Sequelize } = require("sequelize");
const OrderModel = require("../models/order");
const UserModel = require("../models/user");
const ProductModel = require("../models/product");

// setting up the database connection
const sequelize = new Sequelize("SenecaDB", "cchand3", "4WsMO5BvjoVC", {
  host: "ep-round-leaf-68528432-pooler.us-east-2.aws.neon.tech",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  },
  logging: false,
});

// creating models
const Order = OrderModel(sequelize);
const User = UserModel(sequelize);
const Product = ProductModel(sequelize);

// establishing relationships
User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);

// syncing up with the database
sequelize.sync();

// sending the models out for use
module.exports = {
  Order,
  User,
  Product,
};