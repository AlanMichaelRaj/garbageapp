const express = require('express');
const router = express.Router();
const User = require("../models/User");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = 'your_jwt_secret_key'; // Use the same secret as in createuser.js

// Login route
router.post('/loginuser', async (req, res) => {
    const { email, password } = req.body;
    //console.log("Received login request for:", email); 
console.log(req.body)
    try {
        // Check if the user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("User not found:", email); // Debug log
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }
        console.log( "passworddb",password, user.password,"reqpassword")
        // Compare the hashed password
        const isMatch = await bcrypt.compare(password,user.password);
       console.log(isMatch)
        if (!isMatch) {
            console.log("Password does not match for user:", email); // Debug log

            // If the password doesn't match, but the hash algorithm may be outdated,
            // rehash the password and update the database
           
            

            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        console.log("Password match successful for user:", email); // Debug log

        // Generate a JWT token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        console.log("Login successful for user:", email); // Debug log

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

module.exports = router;
