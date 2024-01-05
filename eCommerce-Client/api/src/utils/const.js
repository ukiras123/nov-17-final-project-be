const message = {
    SUCCESS : `success`,
    ERROR : `error`,
}
const FE_URL = process.env.FE_URL || 'http://localhost:3000';

module.exports = {
    message, FE_URL,
}