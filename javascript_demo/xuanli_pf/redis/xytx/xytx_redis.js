var config = {
    redis_name: 'xytx',
    time: 6000 * 1000,
    prefix_key: 'xytx_test',
}

module.exports = require('./init')(config)