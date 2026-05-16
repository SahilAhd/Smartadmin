const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. SIGNUP LOGIC (The "Signer") ---
exports.signup = async (req, res) => {
    const { full_name, contact_number, email, adhar_number, age, password } = req.body;

    try {
        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save everything to MySQL
        const sql = `INSERT INTO users 
            (full_name, contact_number, email, adhar_number, age, password) 
            VALUES (?, ?, ?, ?, ?, ?)`;

        await db.execute(sql, [full_name, contact_number, email, adhar_number, age, hashedPassword]);

        res.status(201).json({ message: "User Identity Registered Successfully" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Email or Adhar already registered." });
        }
        res.status(500).json({ message: "System Database Error" });
    }
};

// --- 2. LOGIN LOGIC (The "Checker") ---
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Search for user in MySQL
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ message: "System Error: Credentials not found." });
        }

        const user = users[0];

        // Compare the typed password with the encrypted one in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "System Error: Password Mismatch." });
        }

        // Create the "Security Badge" (JWT Token)
        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }
        );

        res.json({
            token,
            user: { id: user.id, name: user.full_name }
        });

    } catch (error) {
        res.status(500).json({ message: "Authentication Logic Failure" });
    }
};