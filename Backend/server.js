const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes   = require('./routes/auth');
const taskRoutes   = require('./routes/tasks');
const noteRoutes   = require('./routes/notes');
const streakRoutes = require('./routes/streak');
const aiRoutes     = require('./routes/ai');

// 1. CONFIGURATION
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. MIDDLEWARE
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// 3. ROUTES
app.use('/api/auth',   authRoutes);
app.use('/api/tasks',  taskRoutes);
app.use('/api/notes',  noteRoutes);
app.use('/api/streak', streakRoutes);
app.use('/api/ai',     aiRoutes);

// 4. BASE ROUTE - test if server is alive
app.get('/', (req, res) => {
    res.send('SmartAdmin Backend is Online...');
});

// 5. TEST DATABASE CONNECTION + START SERVER
sequelize.authenticate()
    .then(() => {
        console.log('✅ MySQL Connected successfully');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err.message);
    });
