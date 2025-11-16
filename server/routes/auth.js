const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' })
    }
    
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword })
    await user.save()
    
    res.status(201).json({ userId: user._id, username: user.username })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    
    res.json({ userId: user._id, username: user.username })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router