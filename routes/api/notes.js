const express = require('express');
const router = express.Router();
const {setupApiRoute} = require('../../helpers');
const controllers = require('../../controllers');
const middlewares = require('../../middlewares');

setupApiRoute(router, 'post', '/', [middlewares.user.authenticateUser], controllers.api.notes.create);
setupApiRoute(router, 'get', '/', [middlewares.user.authenticateUser], controllers.api.notes.get)

module.exports = router;