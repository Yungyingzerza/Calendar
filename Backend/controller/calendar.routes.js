const express = require('express');
const calendarService = require('../service/calendar.service');
const calendarRouter = express.Router();

calendarRouter.post('/appointment/', async (req, res) => {
    return await calendarService.getAppointmentsByDate(req, res);
});


module.exports = calendarRouter;