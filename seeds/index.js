
// const sequelize = require('../config/connection');
// const seedUser = require('./user-seeds');

// const seedAll = async () => {
//   await sequelize.sync({ force: true });
//   console.log('\n----- DATABASE SYNCED -----\n');

//   await seedUser();
//   console.log('\n----- USER SEEDED -----\n');

//   process.exit(0);
// };

// seedAll();

const seedUser = require('./user-seeds');
const seedPost = require('./post-seeds');
const seedComment = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUser();
    await seedPost();
    await seedComment();
    process.exit(0);
};

seedAll();

