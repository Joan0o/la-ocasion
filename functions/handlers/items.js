const { db } = require('../util/admin')

exports.getAllItems = (req, res) => {
    db.collection('items').get()
        .then(data => {
            let items = [];
            data.forEach(doc => {
                items.push({...doc.data(), id: doc.id})
            })
            return res.json(items);
        })
        .catch(err => console.log(err))
}

exports.newItem = (req, res) => {
    let newItem = {
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        createdAt: new Date().toISOString()
    }

    db.collection('items')
        .add(newItem)
        .then(ref => {
            console.log(ref)
            return res.json({...newItem, id: ref.id})
        })
        .catch((err) => {
            res.status(400).json({ error: 'algo salió mal' })
            console.log(err);
        })
}


