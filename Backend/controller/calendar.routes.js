const express = require('express');
const calendarService = require('../service/calendar.service');
const calendarRouter = express.Router();

calendarRouter.get('/appointment/', async (req, res) => {
    return await calendarService.getAppointmentsByDate(req, res);
});

calendarRouter.patch('/appointment/', async (req, res) => {
    return await calendarService.updateAppointmentsById(req, res);
});

calendarRouter.post('/appointment/', async (req, res) => {
    return await calendarService.createAppointment(req, res);
});

calendarRouter.delete('/appointment/', async (req, res) => {
    return await calendarService.deleteAppointmentById(req, res);
});

calendarRouter.get('/appointment/week', async (req, res) => {
    return await calendarService.getAppointmentsByWeek(req, res);
});

calendarRouter.get('/appointment/year/:year', async (req, res) => {
    return await calendarService.getAppointmentsByYear(req, res);
});




module.exports = calendarRouter;