// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

// When someone registers, encrypt password
const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, salt);

const comparePassword = (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword);

module.exports = {
  hashPassword,
  comparePassword,
};
