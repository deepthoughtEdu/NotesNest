const express = require('express');
const router = express.Router();

const {setupApiRoute} = require('../../helpers');
const controllers = require('../../controllers');
const middlewares = require('../../middlewares');

setupApiRoute(router, 'get', '/', [middlewares.user.authenticateUser], controllers.api.note.get);
setupApiRoute(router, 'post', '/', [middlewares.user.authenticateUser, middlewares.checkRequired.bind(null, ['title', 'content'])], controllers.api.note.create);

module.exports = router;