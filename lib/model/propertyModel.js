"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyInstance = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
class propertyInstance extends sequelize_1.Model {
}
exports.propertyInstance = propertyInstance;
propertyInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    propertyType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    readyTime: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    vendorId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true
    },
    isSuspended: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: config_1.db,
    tableName: 'property'
});
