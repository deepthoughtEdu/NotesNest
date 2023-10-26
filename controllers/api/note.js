const helpers = require('../../helpers');
const apiHandlers = require('../../api');

const noteController = module.exports;

noteController.get = async (req, res) => {
	helpers.formatApiResponse(200, res, await apiHandlers.note.get(req));
};

noteController.create = async (req, res) => {
	helpers.formatApiResponse(200, res, await apiHandlers.note.create(req));
};