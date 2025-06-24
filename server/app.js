const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/pawfectmatch', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// Animal schema/model
const animalSchema = new mongoose.Schema({
    type: String,
    name: String,
    image: String,
    description: String
});
const Animal = mongoose.model('Animal', animalSchema);

// GET all animals
app.get('/api/animals', async (req, res) => {
    const animals = await Animal.find();
    res.json(animals);
});

// POST a new animal
app.post('/api/animals', async (req, res) => {
    const animal = new Animal(req.body);
    await animal.save();
    res.json(animal);
});

// SEED endpoint for easy testing
app.get('/api/seed', async (req, res) => {
    const count = await Animal.countDocuments();
    if (count === 0) {
        await Animal.create([
            {
                type: "Dogs",
                name: "Husky",
                image: "image/Screen Shot 2024-05-21 at 10.10.49 PM.png",
                description: "Friendly and energetic Husky."
            },
            {
                type: "Cats",
                name: "Momo",
                image: "image/Screen Shot 2024-05-21 at 10.11.12 PM.png",
                description: "Curious and playful cat."
            },
            {
                type: "Small Animals",
                name: "Rabbit",
                image: "image/Screen Shot 2024-05-21 at 10.09.41 PM.png",
                description: "Small fluffy rabbit."
            }
        ]);
        res.send('Database seeded!');
    } else {
        res.send('Database already seeded.');
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));
