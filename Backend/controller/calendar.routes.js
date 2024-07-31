const express = require('express');
const calendarService = require('../service/calendar.service');
const calendarRouter = express.Router();

calendarRouter.get('/appointment/', async (req, res) => {
    return await calendarService.getAppointmentsByDate(req, res);
});


module.exports = calendarRouter;