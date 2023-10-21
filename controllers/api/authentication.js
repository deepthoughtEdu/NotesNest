const helpers = require('../../helpers');
const apiHandlers = require('../../api');

const authenticationController = module.exports;

authenticationController.registerUser = async (req, res) => {
	helpers.formatApiResponse(200, res, await apiHandlers.authentication.registerUser(req));
};