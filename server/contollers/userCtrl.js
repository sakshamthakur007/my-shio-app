const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

const userCtrl = {
    register: async (req, res) => {
        try {
            console.log("Register endpoint hit");
            const { name, email, password } = req.body;
            console.log("Request body:", req.body);

            // Check if user already exists
            const user = await Users.findOne({ email });
            if (user) {
                console.log("User already exists");
                return res.status(400).json({ msg: "Email already registered" });
            }

            // Validate password length
            if (password.length < 6) {
                console.log("Password too short");
                return res.status(400).json({ msg: "Password should be at least 6 characters" });
            }

            // Hash the password
            const passwordHash = await bcrypt.hash(password, 10);
            console.log("Password hashed");

            // Create new user
            const newUser = new Users({
                name,
                email,
                password: passwordHash
            });

            // Save the new user to the database
            await newUser.save();
            console.log("New user saved", newUser);

            // Create JWT for authentication
            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: "/user/refresh_token"
            });
            console.log("Access token created:", accessToken);

            // Send success response with token
            res.json({ msg: "Register success", accessToken });
        } catch (error) {
            console.error("Error during registration:", error.message);
            return res.status(500).json({ msg: error.message });
        }
    },
    refreshtoken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshToken;
            if (!rf_token) return res.status(400).json({ msg: "Please login or register" });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login or register" });
                const accessToken = createAccessToken({ id: user.id });
                res.json({accessToken });
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: "User does not exist" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Incorrect password" });
            }

            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: "/user/refresh_token"
            });
            res.json({ accessToken });

        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', { path: "/user/refresh_token" });
            return res.json({ msg: "Logged out" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getuser: async (req,res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");
            if(!user) return res.status(400).json({msg:"User Not Found"})
            res.json(user)

        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
 };

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl;
