const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Message = sequelize.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: Sequelize.TEXT(),
        allowNull: false
    },
  date_time: {
    type: Sequelize.DATE, 
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
  },
},

{
    timestamps: false

});

module.exports = Message;