const express = require('express');
const router = express.Router();

router.post('/data', (req, res) => {
    try {
        // Ensure both global variables are defined
        if (!global.items || !global.itemCategory) {
            return res.status(404).send("No data found");
        }

        // Log global variables to the console
        console.log("Items:", global.items);
        console.log("Item Categories:", global.itemCategory);

        // Send both items and itemCategory as a response
        res.status(200).send({
            items: global.items,
            itemCategory: global.itemCategory
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
