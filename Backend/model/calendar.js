const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');

const Calendar = sequelize.define('Calendar', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
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