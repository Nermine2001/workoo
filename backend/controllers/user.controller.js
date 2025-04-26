const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstname, lastname, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ user, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;

        if(req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }

        await User.findByIdAndUpdate({ _id: id}, req.body);
        
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};