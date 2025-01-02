// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://adityadeb:eCunNWFwpyZpHdul@testid.hyqwjw5.mongodb.net/?retryWrites=true&w=majority&appName=gauhati_dairy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Order Schema
const orderSchema = new mongoose.Schema({
    date: Date,
    products: [{
        name: String,
        quantity: Number
    }],
    totalItems: Number
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// Routes
app.post('/api/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/orders', async (req, res) => {
    try {
        await Order.deleteMany({});
        res.json({ message: 'All orders deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
