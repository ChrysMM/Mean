//routes pour la manip des entités
const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const { route } = require('./helloworld.route');
let Category = require("../models/Category");

router.route('/').get((req, res) => {
    Product.find((err, products) => {
        if (err) {
            res.status(500).json({ message: `Error retrieving products : ${err}` });
        }
        else {
            res.json(products);
        }
    });
});

router.route('/').post((req, res) => {

    const product = new Product(req.body);
    product.save().then(
        (product) => {
            Category.findOne({ name: req.body.category }, (err, category) => {
                if (category) {
                    category.products.push(product);
                    category.save();
                    res.json(product)
                }
            })
        })
        .catch(
            err => res.json({ message: `Unable to save product to database : ${err}` })
        );


});


router.route("/:id").get((req, res) => {
    const id = req.params.id;
    Product.findById(id, (err, product) => {
        if (err) {
            res.status(400).json({ message: `Error retrieving product : ${err}` });
        }
        else {
            if (product) {
                res.json(product);
            } else {

                res.status(404).json({ message: `Product ${id} not found` });
            }
        }
    })
});

router.route("/:id").delete((req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id, (err, product) => {
        if (err) {
            res.status(500).json({ message: `Error deleting product ${id} : ${err}` })
        } else {
            if (product) {
                res.json({ message: `Product ${id} successfuly delete` })
            } else {
                res.status(404).json({ message: `Product ${id} not found` })
            }
        }
    })
})
router.route("/:id").put((req, res) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { new: true }, (err, product) => {
        if (err) {
            res.status(500).json({
                message: `Error updating product ${id}: ${err}`
            })
        } else {
            if (product) {
                res.json(product)
            } else {
                res.status(404).json({ message: `Product ${id} not found` });
            }
        }
    })
});

module.exports = router;