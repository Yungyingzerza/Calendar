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
    startHour:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startMinute:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    endHour:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    endMinute:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    day:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    month:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Calendar;