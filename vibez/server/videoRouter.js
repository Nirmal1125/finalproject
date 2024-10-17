const express = require('express');
const multer = require('multer');
const path = require('path');
const { getCollection } = require('./database'); // Update the path to your database module

const router = express.Router();

// Configure storage for uploaded videos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded videos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid naming conflicts
    }
});

const upload = multer({ storage });

// Route to upload a video
router.post('/upload', upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded.' });
    }

    const collection = getCollection(); // Get the MongoDB collection

    try {
        // Store video information in the database
        const videoData = {
            filename: req.file.filename,
            path: req.file.path,
            uploadDate: new Date(),
        };
        
        await collection.insertOne(videoData);
        res.status(200).send({ message: 'Video uploaded successfully!', filePath: req.file.path });
    } catch (error) {
        console.error('Error saving video info to database:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route to get a video by filename
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename); // Adjust the path if necessary

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status || 500).send({ message: 'Error sending file' });
        }
    });
});

// Route to list all videos
router.get('/', async (req, res) => {
    const collection = getCollection();
    
    try {
        const videos = await collection.find({}).toArray();
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error retrieving videos:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;