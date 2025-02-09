const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
//const bcrypt = require("bcryptjs");
const bcrypt = require("bcrypt");
// JWT Secret Key (replace with a strong secret in production)
const JWT_SECRET = 'your_jwt_secret_key';

// Route to create a new user
router.post(
    "/createuser",
    [
        body('email', 'Invalid email').isEmail(),
        body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),
        body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
        body('location', 'Address is required').not().isEmpty()
    ],
    async (req, res) => {
        console.log("Received data:", req.body);

        // Validate the incoming data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation errors:", errors.array());
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const { name, password, email, location } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "User already exists" });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(password, salt);

            // Create new user
            const newUser = new User({
                name,
                password: secPassword,
                email,
                location
            });

            // Save user to database
            await newUser.save();
            console.log(secPassword)

            // Generate a JWT token after user creation (optional)
            const payload = { userId: newUser._id };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

            // Return response without the hashed password
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: { name: newUser.name, email: newUser.email, location: newUser.location },
                token // Optional: send token back after user creation
            });
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
    }
);

module.exports = router;
