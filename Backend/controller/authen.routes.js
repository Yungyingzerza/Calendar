const express = require('express');
const aurthenService = require('../service/authen.service');
const authenRouter = express.Router();

authenRouter.post('/verify', async (req, res) => {
    return await aurthenService.verify(req, res);
});

authenRouter.get('/refreshToken', async (req, res) => {
    return await aurthenService.refreshToken(req, res);
});

authenRouter.get('/logout', async (req, res) => {
    return await aurthenService.logout(req, res);
});

module.exports = authenRouter;