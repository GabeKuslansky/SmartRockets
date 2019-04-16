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
    console.log(metadata)
    const index = await getLatestIndex();

    const level = { index, levelStructure, metadata };
    levelsRepository.insert(level);
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

module.exports = { getLatestLevels, getLevelById, saveLevel, getLevelsStartingFromIndex }