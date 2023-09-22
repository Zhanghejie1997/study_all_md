
var config = {
    line: {
        "id": "id", // `id` int(11) NOT NULL,
        "type": "varchar", // `number` varchar(255) DEFAULT NULL,
        "page": "varchar", // `number` varchar(255) DEFAULT NULL,
        "i_type": "varchar", // `number` varchar(255) DEFAULT NULL,
        "created_time": "date", // `created_time` datetime DEFAULT NULL,
    },
    create_dbs_sql: `
        CREATE TABLE IF NOT EXISTS \`add_point\` (
        \`id\` int(11) NOT NULL AUTO_INCREMENT,
        \`type\` varchar(255) DEFAULT NULL COMMENT '',
        \`page\` varchar(255) DEFAULT NULL COMMENT '',
        \`i_type\` varchar(255) DEFAULT NULL COMMENT '',
        \`created_time\` datetime DEFAULT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
    `,
}

module.exports = require("./init").init(config, __filename)