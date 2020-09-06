const express = require('express');
const router = express.Router();// on lie une url à l'actions avec les routes

let Category = require('../models/Category');


router.route('/').get((req, res) => {// sur / en methode get (url)
    Category.find((err, categories) => {
        if (err) {
            res.status(500).json({ message: `Error retrieving categories : ${err}` });
        }
        else {

            res.json(categories);
        }
    }).populate({path: 'products', select: 'name  price   -_id'});
});

router.route("/").post((req, res) => {

    const category = new Category(req.body);// le body contient le corps de notre requete , new appel le constructeur de classe
    category.save()
        .then(

            category => res.json(category)
        )

        .catch(
            (err) => {
                res.status(500).json({ message: `Unable to save category to database : ${err}` })
            });
});

router.route("/:id").get((req, res) => {
    const id = req.params.id;
    Category.findById(id, (err, category) => {
        if (err) {
            res.status(500).json({ message: `Error retrieving category : ${err}` });
        }
        else {
            if (category) {
                res.json(category);
            } else {

                res.status(404).json({ message: `Category ${id} not found` });
            }
        }
    })
});

router.route("/:id").delete((req, res) => {
    const id = req.params.id;
    Category.findByIdAndDelete(id, (err, category) => {
        if (err) {
            res.status(500).json({ message: `Error deleting product ${id} : ${err}` })
        } else {
            if (category) {
                res.json({ message: `Category ${id} successfully delete` })
            } else {
                res.status(404).json({ message: `Category ${id} not found` })
            }
        }
    })
})
router.route("/:id").put((req, res) => {
    const id = req.params.id;
    Category.findByIdAndUpdate(id, req.body, { new: true }, (err, category) => {// findByIdAndUpdate nous renvoi le find en premier et avec true on veux le update
        if (err) {
            res.status(500).json({
                message: `Error updating category ${id}: ${err}`
            })
        } else {
            if (category) {
                res.json(category)
            } else {
                res.status(404).json({ message: `Category ${id} not found` });
            }
        }
    })
});

module.exports = router;// on exporte le router 


