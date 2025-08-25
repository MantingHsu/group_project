const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bcrypt = require('bcryptjs')

const Registration = require('./models/Registration')

require('dotenv').config()
const app = express()

// ---- DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

// ---- Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI_SESSIONS,
    collectionName: 'sessions'
  }),
  cookie: {
    httpOnly: true,
    secure: false,               // set true in production (HTTPS)
    sameSite: 'lax',
    maxAge: 1000*60*60*24
  }
}))

// ---- Animals (kept from your original)
const animalSchema = new mongoose.Schema({
  type: String,
  name: String,
  image: String,
  description: String
})
const Animal = mongoose.model('Animal', animalSchema)

app.get('/api/animals', async (req,res) => {
  const animals = await Animal.find()
  res.json(animals)
})

app.post('/api/animals', async (req,res) => {
  const animal = new Animal(req.body)
  await animal.save()
  res.json(animal)
})

app.get('/api/seed', async (req,res) => {
  const count = await Animal.countDocuments()
  if (count === 0) {
    await Animal.create([
      { type:'Dogs', name:'Husky', image:'images/IMG_7073.JPG', description:'Friendly and energetic Husky.' },
      { type:'Cats', name:'Momo', image:'images/cat1.png', description:'Curious and playful cat.' },
      { type:'Small Animals', name:'Rabbit', image:'images/rabbit.jpeg', description:'Small fluffy rabbit.' }
    ])
    return res.send('Database seeded!')
  }
  res.send('Database already seeded.')
})

// ---- Auth
app.post('/api/register', async (req,res) => {
  try {
    const { username, email, password } = req.body
    const exists = await Registration.findOne({ email })
    if (exists) return res.status(409).json({ success:false, message:'Email already registered' })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await Registration.create({ username, email, passwordHash })

    // set session
    req.session.userId = user._id.toString()
    res.json({ success:true, userId: user._id })
  } catch (err) {
    res.status(500).json({ success:false, message: err.message })
  }
})

app.post('/api/login', async (req,res) => {
  const { email, password } = req.body
  const user = await Registration.findOne({ email })
  if (!user) return res.status(401).json({ success:false, message:'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ success:false, message:'Invalid credentials' })

  req.session.userId = user._id.toString()
  res.json({ success:true, userId: user._id })
})

app.get('/api/me', (req,res) => {
  if (req.session.userId) return res.json({ authenticated:true, userId: req.session.userId })
  res.json({ authenticated:false })
})

app.post('/api/logout', (req,res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ success:false, message:'Logout failed' })
    res.clearCookie('connect.sid')
    res.json({ success:true })
  })
})

// ---- Start (single listen only)
const PORT = process.env.PORT || 3000
if (require.main === module) {
  app.listen(PORT, () => console.log(`API on :${PORT}`))
}
module.exports = app
