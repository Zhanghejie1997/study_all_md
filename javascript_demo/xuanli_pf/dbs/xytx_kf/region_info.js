var config = {
    line: {
        id: 'id', 
        region_id: 'varchar',
        region_name: 'varchar', 
        create_at: 'date', 
        is_delete: 'varchar',
    },
    create_dbs_sql: `
    CREATE TABLE IF NOT EXISTS region_info (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`region_id\` varchar(64) DEFAULT NULL COMMENT '区服id',
        \`region_name\` varchar(64) DEFAULT NULL COMMENT '区服名字',
        \`create_at\` datetime DEFAULT NULL COMMENT '创建时间',
        \`is_delete\` varchar(4) DEFAULT '0' COMMENT '是否删除',
        PRIMARY KEY (\`id\`),
        KEY \`idx_region_id\` (\`region_id\`),
        KEY \`idx_is_delete\` (\`is_delete\`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 comment='区服信息';
    `,
}

module.exports = require("./init").init(config, __filename)