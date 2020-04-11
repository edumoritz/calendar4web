const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const EventController = require('./controllers/EventController');
const PatientController = require('./controllers/PatientController');

const routes = express.Router();

routes.get('/pacientes', PatientController.index);
routes.get('/eventos', EventController.index);

routes.post('/paciente', PatientController.create);
routes.post('/evento', EventController.create);

routes.put('/paciente/:id', PatientController.change);
routes.put('/evento/:id', EventController.change);

routes.get('/paciente/:id', PatientController.getById);
routes.get('/evento/:id', EventController.getById);

routes.delete('/paciente/:id', PatientController.delete);
routes.delete('/evento/:id', EventController.delete);


module.exports = routes;