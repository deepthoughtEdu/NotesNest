const errors = require('./errors')

const helpers = module.exports;

helpers.setupApiRoute = function (router, method, name, middlewares, controller) {
	router[method](name, middlewares, helpers.tryRoute(controller, (err, res) => {
		helpers.formatApiResponse(400, res, err);
	}));
};

helpers.tryRoute = function (controller, handler) {
	if (controller && controller.constructor && controller.constructor.name === 'AsyncFunction') {
		return async function (req, res, next) {
			try {
				await controller(req, res, next);
			} catch (err) {
				if (handler) {
					return handler(err, res);
				}

				next(err);
			}
		};
	}
	return controller;
};

helpers.formatApiResponse = async (statusCode, res, payload) => {
	if (res.req.method === 'HEAD') {
		return res.sendStatus(statusCode);
	}

	if (String(statusCode).startsWith('2')) {
		res.status(statusCode).json({
			status: {
				code: 'ok',
				message: 'OK',
			},
			response: payload || {},
		});
	} else if (payload instanceof Error) {
		const message = payload.message;
		const response = {};

		const returnPayload = errors.generateHttpError(statusCode, message);
		returnPayload.response = response;

		res.status(statusCode).json(returnPayload);
	} else if (!payload) {
		res.status(statusCode).json(errors.generateHttpError(statusCode));
	}
};