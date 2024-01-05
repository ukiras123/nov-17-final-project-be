const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const  hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, salt);

const comparePassword = (plainPassword, hashPassword) => bcrypt.compareSync(plainPassword, hashPassword);

module.exports = {hashPassword, comparePassword}