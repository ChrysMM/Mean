const express = require('express');
const app = express();
const router = express.Router();

router.route("/").get((req, res) => {
    res.json({ message: 'Hello, World !' });
})
module.exports = router; 
