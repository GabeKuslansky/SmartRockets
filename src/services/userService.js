const userRepository = require('../models/userModel');

const getUserById = async googleId => await userRepository.findOne({ googleId });

const saveUser = async rawUser => {
    const user = { name: rawUser.nickname, googleId: rawUser.id, avatar: rawUser.image.url };
    userRepository.update({ googleId: user.googleId}, user, { upsert: true });
}

module.exports = { getUserById, saveUser }