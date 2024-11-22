const User = require('../models/users.js');
const Chats = require('../models/chats.js');
const FileUrls = require('../models/fileUrls.js');

const Sequelize = require('sequelize');
const AWS = require("aws-sdk");

require('dotenv').config();


exports.postMessage = async (req, res, next) => {
    const { message, groupId } = req.body;
    try {
        const savedMessages = await Chats.create({
            message: message,
            userId: req.user.id,
            groupId: groupId || null
        });

        const user = await User.findOne({ where: { id: req.user.id } });

        res.status(200).json({
            message: "Message saved successfully",
            savedMessages: {
                id: savedMessages.id,
                message: savedMessages.message,
                userName: user.name,
                userId: user.id,
                groupId: savedMessages.groupId
            },
            success: true
        });

    } catch (error) {
        res.status(500).json({ error: "Error saving message", success: false });
        console.log(error);
    }
};
