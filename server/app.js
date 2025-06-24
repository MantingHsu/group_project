const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Allow front-end to call API
const app = express();

mongoose.connect('mongodb://localhost:27017/pawfectmatch', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// Example Animal model
const animalSchema = new mongoose.Schema({
    type: String,
    name: String,
    image: String,
    description: String
});
const Animal = mongoose.model('Animal', animalSchema);

// Example API endpoint: Get all animals
app.get('/api/animals', async (req, res) => {
    const animals = await Animal.find();
    res.json(animals);
});

// Example: Add new animal
app.post('/api/animals', async (req, res) => {
    const animal = new Animal(req.body);
    await animal.save();
    res.json(animal);
});

app.listen(3000, () => console.log('Server started on port 3000'));
