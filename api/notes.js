const database = require("../database");
const { collections } = require("../database");
const utiities = require('../utilities');

const notes = module.exports;

const collectionName = collections.NOTES;

notes.create = async (req) => {
    const { userId } = req.user;
    const {  } = req.body; // What data can we get from frontend?

    const payload = {
        userId,
        // We need to store user's ID and note's meta-data
        createdAt: utiities.getISOTimestamp(),
        updatedAt: utiities.getISOTimestamp(),
    };

    return await database.client.collection(collectionName).thatMethod(payload) // What's the method that stores data into MongoDB?
};

notes.get = async (req) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = page*limit;

    const key = {};

    // What if I want to search via title?
    if (req.query.title)  req.query.title;

    const [data, count] = await Promise.all([
        database.client.collection(collectionName).find(key).skip(offset).limit(limit), // Oh no it's returing a cursor, how do I fix it?
        // We need to count to paginate
    ])

    // How can we return the data, paginated?
};
