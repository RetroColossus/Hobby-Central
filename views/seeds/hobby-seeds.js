const { Hobby } = require('../models');

const hobbydata = [
]

const seedHobby = () => Hobby.bulkCreate(hobbydata);

module.exports = seedHobby;