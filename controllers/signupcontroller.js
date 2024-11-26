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


exports.userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });

        //case1 - if the emailId is incorrect
        if (!user) {
            return res.status(404).json({ error: "Incorrect email, User not found", success: false });
        }

        //case2 if the emailId is correct
        const match = await bcrypt.compare(password, user.password);  //matching the entered password with the hashed password stored in database
        if (match) {
            return res.status(200).json({ data: user, message: "User logged in successfully", success: true, token: generateAccessToken(user.id, user.name) });

        } else {
            return res.status(401).json({ error: "Incorrect password", success: false });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.generateAccessToken = generateAccessToken;