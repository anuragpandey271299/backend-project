const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const healthInfo = {
        serverName: 'Your Week List Server',
        currentTime: new Date().toLocaleString(),
        serverState: 'ACTIVE',
    };
    res.json(healthInfo);
});

module.exports = router;
