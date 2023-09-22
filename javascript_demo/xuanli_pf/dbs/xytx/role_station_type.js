var config = {
    line: {
        id: 'id', // \` bigint(20) NOT NULL AUTO_INCREMENT,
        name: 'varchar', // \` varchar(1024) DEFAULT NULL COMMENT '类型名称',
        level: 'varchar', // \` tinyint(4) DEFAULT NULL COMMENT '类型级别',
        link: 'varchar', // \` varchar(2048) DEFAULT NULL COMMENT '转向链接',
        p_path: 'varchar', // \` varchar(1024) DEFAULT NULL COMMENT '层级路径',
        status: 'varchar', // \` tinyint(4) DEFAULT NULL COMMENT '状态（1正常，0已删除）',
        create_at: 'date', // \` datetime DEFAULT NULL COMMENT '创建时间',
        update_at: 'date', // \` datetime DEFAULT NULL COMMENT '最后一次更新时间',
        info: 'varchar', // \` varchar(256) DEFAULT NULL COMMENT '备注信息',
        order_by: 'varchar', // \` int(11) DEFAULT NULL,
    },
    create_dbs_sql: `
    CREATE TABLE IF NOT EXISTS role_station_type (
        \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
        \`name\` varchar(1024) DEFAULT NULL COMMENT '类型名称',
        \`level\` tinyint(4) DEFAULT NULL COMMENT '类型级别',
        \`link\` varchar(2048) DEFAULT NULL COMMENT '转向链接',
        \`p_path\` varchar(1024) DEFAULT NULL COMMENT '层级路径',
        \`status\` tinyint(4) DEFAULT NULL COMMENT '状态（1正常，0已删除）',
        \`create_at\` datetime DEFAULT NULL COMMENT '创建时间',
        \`update_at\` datetime DEFAULT NULL COMMENT '最后一次更新时间',
        \`info\` varchar(256) DEFAULT NULL COMMENT '备注信息',
        \`order_by\` int(11) DEFAULT NULL,
        PRIMARY KEY (\`id\`),
        KEY \`idx_level\` (\`level\`),
        KEY \`idx_p_path\` (\`p_path\`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
    
    `,
}

module.exports = require("./init").init(config, __filename)