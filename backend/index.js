const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const path = require('path');  // Import path to serve static files

const app = express();

// Middleware to handle CORS
app.use(cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    credentials: true
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use("/api", router);

// Connect to the database and start the server
const PORT = process.env.PORT || 8080;  // Corrected PORT assignment

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
