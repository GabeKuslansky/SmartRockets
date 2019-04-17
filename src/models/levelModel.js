const DataStore = require('nedb-promises');

const levelsRepository = DataStore.create({
    filename: __dirname + '/../database/levels.db',
    autoload: true,
    timestampData: true,
});
    
// levelsRepository.ensureIndex({ fieldName: '_id', unique: true });

module.exports = levelsRepository;