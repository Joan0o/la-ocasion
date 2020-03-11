const express = require('express')
const router = express.Router()

const Item = require('../models/item.js')

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find()
        res.json(items)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one item
router.get('/:id', getItem, (req, res) => {
    res.json(res.item)
})

// Create one item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        brand: req.body.brand ? req.body.brand : '-',
        price: req.body.price,
        img: req.body.img ? req.body.img : '-',
    })

    try {
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

// Update one item
router.patch('/:id', getItem, async (req, res) => {

    if (req.body.name !== null)
        res.item.name = req.body.name

    if (req.body.price !== null)
        res.item.price = req.body.price

    try {
        const newItem = await res.item.save()
        res.json(newItem)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete one item
router.delete('/:id', getItem, async (req, res) => {
    try {
        await res.item.remove()
        res.json({ message: 'Producto eliminado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getItem(req, res, next) {
    try {
        item = await Item.findById(req.params.id)
        if (item == null) {
            return res.status(404).json({ message: 'No se puede encontrar' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.item = item
    next()
}

module.exports = router