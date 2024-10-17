require("dotenv").config();

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { connectToMongoDB, closeConnection } = require("./database");
const videoRouter = require('./videoRouter'); // Ensure the path is correct


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use('/uploads', express.static('uploads')); // Serve video files
app.use(cors());
// Proxy configuration
const options = {
  target: 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: { '^/your-video-url.mp4': '' },
};

// Use the proxy middleware
app.use('/your-video-url.mp4', createProxyMiddleware(options));

// Use the video router
app.use('/api/videos', videoRouter); // Mount the router on the /api/videos path

const startServer = async () => {
    try {
        await connectToMongoDB(); // Ensure successful connection
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error.message || error);
    }
};

// Handle server termination
process.on('SIGINT', async () => {
    await closeConnection(); // Close MongoDB connection
    console.log("Server shutting down gracefully...");
    process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    closeConnection().then(() => process.exit(1));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    closeConnection().then(() => process.exit(1));
});

// Start the server
startServer();