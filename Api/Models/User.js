const { DataTypes } = require("sequelize");
const db = require('../db/db');


const User = db.define("User", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true // checks for email format
    }
  },
  role: {
    type: DataTypes.ENUM,
    values: ['user', 'admin','leader'],
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  income: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  createBy: {
    type: DataTypes.BIGINT,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  }
});

User.associate = (models) => {
  User.belongsTo(models.Company, { foreignKey: "CmpRid", as: "company" });
  User.hasMany(models.Donation, { foreignKey: "userId", as: "donations" }); // FIXED
};



module.exports = User;
