const {MongoClient} = require('mongodb');
const config = require('../config.json');

const databaseIndex = module.exports;
const {info} = console;

databaseIndex.collections = require('./collections');
databaseIndex.client = null;

databaseIndex.initializeConnection = async function () {
    const {database, mongoUri} = config;

    if (!mongoUri) {
        throw new Error('mongoUri is required for connection to mongodb severs');
    }

    if (!database) {
        throw new Error('Database name is required for connection');
    }

    const client = new MongoClient(mongoUri, {connectTimeoutMS: 90000});

    var connection = await client.connect();   
    databaseIndex.client = connection.db(database); 

    info('Established connection with ' + database);

}