const database = require("../database");
const { collections } = require("../database");
const utiities = require('../utilities');

const notes = module.exports;

const collectionName = collections.NOTES;

notes.create = async (req) => {
    const { userId } = req.user;
    const { title, content } = req.body;

    const payload = {
        uid: userId,
        title,
        content,
        createdAt: utiities.getISOTimestamp(),
        updatedAt: utiities.getISOTimestamp(),
    };

    return await database.client.collection(collectionName).insertOne(payload);
};

notes.get = async (req) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = page*limit;

    const key = {};

    if (req.query.title) key.title = req.query.title;

    const [data, count] = await Promise.all([
        database.client.collection(collectionName).find(key).skip(offset).limit(limit).toArray(),
        database.client.collection(collectionName).countDocuments(key)
    ])

    return utiities.paginate(`/api/request/${req.url}`, data, count, limit, page);
};
