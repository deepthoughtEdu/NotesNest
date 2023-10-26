const database = require('../database');
const {collections} = require('../database');
const utilities = require('../utilities');

const noteApi = module.exports;

noteApi.get = async (request) => {
    const { userId } = request.user;

    const limit = parseInt(request.query.limit) || 5;
    const page = parseInt(request.query.page) || 0;
    const offset = page*limit;
    const key = { uid: userId }

    const [notes, count] = await Promise.all([
        database.client.collection(collections.NOTES).find(key).skip(offset).limit(limit).toArray(),
        database.client.collection(collections.NOTES).countDocuments(key)
    ]);

    return utilities.paginate(`/api/note${request.url}`, notes, count, limit, page);
}

noteApi.create = async (request) => {
    const {user} = request;
    const {content, title} = request.body;

    const timestamp = utilities.getISOTimestamp();
    const note = {};

    note.uid = user.userId;
    note.title = title;
    note.content = content;
    note.createdAt = timestamp;
    note.updatedAt = timestamp;

    return await database.client.collection(collections.NOTES).insertOne(note);
}