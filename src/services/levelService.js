const levelsRepository = require('../models/levelModel');
const userService = require('../services/userService');

const getLatestLevels = async() => {
    let levels = await levelsRepository.find({})
    .sort(x => x.createdAt.$$date)
    .limit(15);

    for(const level of levels) {
        level.author = await userService.getUserById(level.metadata.authorGoogleId);
    }
    return levels;
}

const getLevelById = async _id => {
    const level = await levelsRepository.findOne({ _id });
    level.author = await userService.getUserById(level.metadata.authorGoogleId);
    return level;
}

const saveLevel = async (levelStructure, googleId) => {
    const metadata = {
        views: 0,
        authorGoogleId: googleId
    }

    const index = await getLatestIndex();

    const level = { index, levelStructure, metadata };
    console.log(level);
    levelsRepository.insert(level);
}

const deleteLevel = async _id => await levelsRepository.remove({ _id }, { multi: true });

const updateLevel = async (levelStructure, _id) => await levelsRepository.update({ _id }, { levelStructure });

const getLevelsFromUserId = async authorGoogleId => await levelsRepository.find({ "metadata.authorGoogleId": authorGoogleId })

const trackViewLevel = async _id => {
    const level = await getLevelById(_id);
    await levelsRepository.update({ _id }, { $set:  { "metadata.views": ++level.metadata.views }});
}

const getLevelsStartingFromIndex = async index => await levelsRepository.find({index: { $gt: ctx.params.index }}).sort({ index: 1 }).limit(15)

const getLatestIndex = async() => {
    try {
        const level = await levelsRepository.find({}, {index: 1}).sort({ index: -1}).limit(1);
        return ++level[0].index || 0;
    } catch(e) {
        return 0;
    }
};

module.exports = { getLatestLevels, getLevelById, saveLevel, getLevelsStartingFromIndex, deleteLevel, updateLevel, trackViewLevel, getLevelsFromUserId }