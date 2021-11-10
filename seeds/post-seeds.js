const { Post } = require("../models");

const postData = [
  {
    title: "Lorem Ipsum I",
    post:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user_id: 1,
  },

];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
