const DataStore = require('nedb-promises');;

const usersRepository = DataStore.create({
    filename: __dirname + '/../database/users.db',
    autoload: true,
    timestampData: true
});

usersRepository.ensureIndex({ fieldName: 'googleId', unique: true });

module.exports = usersRepository;