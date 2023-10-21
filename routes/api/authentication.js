const express = require('express');
const router = express.Router();
const helpers = require('../../helpers');
const controllers = require('../../controllers');

helpers.setupApiRoute(router, 'post', '/register', [], controllers.api.authentication.registerUser)

module.exports = router;