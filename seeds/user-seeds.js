const {User} = require('../models');

const userData = [
  {
   user_username: 'John Henry',
   user_password: 'test123',
  },
];

const seedUser = () =>User.bulkCreate(userData);

module.exports = seedUser;
