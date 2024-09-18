const User = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

function isstringinvalid(string) {
    if (string == undefined || string.length === 0) {
        return true
    } else {
        return false
    }
}

exports.signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(phone) || isstringinvalid(password)) {
            return res.status(400).json({ err: "Bad parameters . Something is missing" })
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ err: "User already exists." });
        }
        const saltrounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltrounds);

        await User.create({
             name:name, email:email, phone:phone, password: hashedpassword });
        res.status(201).json({ message: 'Successfuly create new user' });

    } catch (err) {
        console.log("signup error",err);
        res.status(500).json(err);
    }

}




function generateAccessToken(id, name, ispremiumuser) {
    const secretkey = process.env.JWT_SECRET_KEY;
    console.log(secretkey);
    return jwt.sign({ userId: id, name: name, ispremiumuser }, 'secretkey')
};

exports.generateAccessToken = generateAccessToken;