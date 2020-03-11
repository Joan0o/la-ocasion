const { db } = require('../util/admin')

exports.getAllItems = (req, res) => {
    db.collection('items').get()
        .then(data => {
            let items = [];
            data.forEach(doc => {
                items.push(doc.data())
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
        .then(doc => {
            return res.json({ message: `document ${doc.id} created succesfully` })
        })
        .catch((err) => {
            res.status(500).json({ error: 'algo salió mal' })
            console.log(err);
        })
}


