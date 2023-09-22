var config = {
    line          : {
        id          : 'id',
        order_id    : 'varchar',
        server_id   : 'varchar',
        pf_id       : 'varchar',
        qd_id       : 'varchar',
        num_id      : 'varchar',
        total_price : 'varchar',
        pay_amount  : 'varchar',
        operator    : 'varchar',
        order_type  : 'varchar',
        lose_type   : 'varchar',
        app_id      : 'varchar',
        created_time: 'date',
    },
    create_dbs_sql: `
    create table if not exists \`orders\` (
       \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`order_id\` varchar(128) NOT NULL,
      \`server_id\` int(11) DEFAULT NULL,
      \`pf_id\` varchar(32) DEFAULT NULL,
      \`qd_id\` varchar(32) DEFAULT NULL,
      \`num_id\` varchar(128) DEFAULT NULL,
      \`total_price\` int(11) DEFAULT NULL,
      \`pay_amount\` varchar(64) DEFAULT NULL,
      \`operator\` varchar(64) NOT NULL,
      \`order_type\` varchar(64) DEFAULT NULL,
      \`lose_type\` varchar(64) DEFAULT NULL,
      \`created_time\` datetime NOT NULL,
      \`app_id\` varchar(32) DEFAULT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`idx_created_time\` (\`created_time\`) USING BTREE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `,
}

module.exports = require("./init").init(config, __filename)