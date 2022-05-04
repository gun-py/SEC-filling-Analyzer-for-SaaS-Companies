/**
 * The DefaultController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/DefaultService');
const getAttribute = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAttribute);
};

const searchCompany = async (request, response) => {
  await Controller.handleRequest(request, response, service.searchCompany);
};

const generateCSV = async (request, response) => {
  response.set('Content-Disposition', 'attachment; filename="data.csv"')
  await Controller.handleRequest(request, response, service.generateCSV);
};

const getFinancials = async (request, response) => {
  await Controller.handleRequest(request, response, service.getFinancials);
};

const getAnnouncements = async (request, response) => {
    await Controller.handleRequest(request, response, service.getAnnouncements);
};

const getFraud = async (request, response) => {
    await Controller.handleRequest(request, response, service.getFraud);
}

module.exports = {
  getAttribute,
  searchCompany,
  generateCSV,
  getFinancials,
  getAnnouncements,
  getFraud
};
