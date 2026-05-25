require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: '*'
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected');
})
.catch((error) => {
    console.log(error);
});

// Schema
const ContactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

// Model
const Contact = mongoose.model('Contact', ContactSchema);

// API Route
app.post('/api/contact', async (req, res) => {

    try {

        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });

        await newContact.save();

        res.status(200).json({
            success: true,
            message: 'Consultation request saved successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });

    }

});

// Test Route
app.get('/', (req, res) => {
    res.send('Backend Running');
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});