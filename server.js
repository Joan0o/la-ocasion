require('dotenv').config()

const path = require('path')

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const DIST_DIR = path.join(__dirname, './dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

app.use(express.static(DIST_DIR)); // NEW

app.get('/', (req, res) => res.sendFile(HTML_FILE))

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const itemsRouter = require('./routes/items.js')
app.use('/items', itemsRouter)

app.listen(3000, () => console.log('server running'))
