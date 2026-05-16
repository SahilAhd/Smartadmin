const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Streak = sequelize.define('Streak', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    current_streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    best_streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    last_active: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
    },
}, {
    tableName: 'streaks',
    timestamps: false,
});

module.exports = Streak;
