const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const Admin = require('../models/admin');

const loginAdmin = async (req, res) => {
    const { phone, password } = req.body;

    const admin = await Admin.findOne({ phone,});
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid Credendial' });
    }

    const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN,
    });

    res.json({ token });
}

module.exports = { loginAdmin };