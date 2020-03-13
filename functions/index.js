const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({origin: true}))

const { getAllItems, newItem } = require('./handlers/items')
const { signup, login } = require('./handlers/users')
const fbAuth = require('./util/fbAuth')

app.get('/items', getAllItems)
app.post('/items', fbAuth, newItem)
app.post('/signup', signup)
app.post('/login', login)

exports.api = functions.https.onRequest(app)