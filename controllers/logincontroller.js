const User = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateAccessToken(id, name) {
    const secretkey = process.env.JWT_SECRET_KEY;
    console.log(secretkey);
    return jwt.sign({ userId: id, name: name }, 'secretkey')
};
exports.generateAccessToken = generateAccessToken;

function isstringinvalid(string) {
    if (string == undefined || string.length === 0) {
        return true
    } else {
        return false
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (isstringinvalid(email) || isstringinvalid(password)) {
            return res.status(400).json({ message: 'Email id or password is missing', success: false });
        }

        const user = await User.findAll({ where: { email } });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    console.error(err); // Log the error on the server
                    return res.status(500).json({ message: 'Internal Server Error', success: false });
                }
                if (result === true) {
                    return res.status(200).json({
                        success: true,
                        message: "User logged in successfully",
                        token: generateAccessToken(user[0].id, user[0].name)
                    });
                } else {
                    return res.status(401).json({ success: false, message: 'User is not authorized' });
                }
            });
        } else {
            return res.status(404).json({ success: false, message: 'User does not exist' });
        }
    } catch (err) {
        console.error(err); // Log the error on the server
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};