const express = require('express');
const router = express.Router();
const {setupApiRoute} = require('../../helpers');
const controllers = require('../../controllers');
const middlewares = require('../../middlewares');

// We need a route to get notes
setupApiRoute(router, '//what could be here?', '/', [middlewares.user.authenticateUser], controllers.api.notes.create);

// Another to get the notes
setupApiRoute(router, '//what could be here?', '/', [middlewares.user.authenticateUser], controllers.api.notes.get)

module.exports = router;