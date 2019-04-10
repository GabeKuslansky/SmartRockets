const levelsRepository = require('../models/levelModel');

class LevelService {

    constructor() {
        this.latestLevels = [];
    }
    
    async getLatestLevels(count) {
        await levelsRepository.find({})
        .sort(x => x.date)
        .limit(count);
    }

    async findById(id) {
        await levelsRepository.findOne({ _id: ctx.params.id });
    }
}


module.exports = LevelService;