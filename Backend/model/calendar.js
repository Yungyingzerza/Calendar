const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');

const Calendar = sequelize.define('Calendar', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    start:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    end:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Calendar;