var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '140.119.19.17',
        port: 3306,
        user: 'kmlab',
        password: 'kmlab',
        database: 'elife'
    },
    pool: {
        min: 0,
        max: 7
    }
});

module.exports = knex;
