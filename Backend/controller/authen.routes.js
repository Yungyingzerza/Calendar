const express = require('express');
const aurthenService = require('../service/authen.service');
const authenRouter = express.Router();

authenRouter.post('/verify', async (req, res) => {
    return await aurthenService.verify(req, res);
});

module.exports = authenRouter;