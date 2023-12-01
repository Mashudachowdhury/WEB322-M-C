const { DataTypes } = require("sequelize");

// define the order model
module.exports = (sequelize) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

     // define the relation with user and product models
  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.belongsTo(models.Product);
  };

  return Order;
};