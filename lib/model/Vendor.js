"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorInstance = void 0;
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
class VendorInstance extends sequelize_1.Model {
}
exports.VendorInstance = VendorInstance;
VendorInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isSuspended: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    flags: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    vendorphone: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: config_1.db,
    tableName: 'Vendors'
});
