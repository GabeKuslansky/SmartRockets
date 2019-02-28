const DataStore = require('nedb-promises');

const levelsRepository = DataStore.create({
    filename: __dirname + '/../db/levels.db',
    autoload: true
});

module.exports = levelsRepository;