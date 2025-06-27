const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

mongoose.connect('mongodb://localhost:27017/pawfectmatch', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: 'your-session-secret',             // replace with strong secret in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/pawfectmatch-sessions',
      collectionName: 'sessions'
    }),
    cookie: {
      httpOnly: true,
      secure: false,       // set to true if using HTTPS
      sameSite: 'lax',     // helps protect against CSRF
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

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

// Registration schema/model
const registrationSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,     // In production: HASH passwords!
    userType: String,
    registeredAt: { type: Date, default: Date.now }
});
const Registration = mongoose.model('Registration', registrationSchema);

// POST: New registration
app.post('/api/register', async (req, res) => {
    try {
        const registration = new Registration(req.body);
        await registration.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Registration.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  // Save user ID in session
  req.session.userId = user._id;
  res.json({ success: true, userId: user._id });
});

// Check session (auth status)
app.get('/api/me', (req, res) => {
  if (req.session.userId) {
    return res.json({ authenticated: true, userId: req.session.userId });
  }
  res.json({ authenticated: false });
});

// User logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;

// Only start the server if app.js is run directly
 if (require.main === module) {
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
 }