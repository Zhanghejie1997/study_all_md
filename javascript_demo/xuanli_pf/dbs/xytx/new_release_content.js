var config = {
    line: {
        id: 'id', // \` bigint(20) NOT NULL AUTO_INCREMENT,
        custom_id: 'varchar', // \` bigint(20) DEFAULT NULL COMMENT '编号',
        type: 'varchar', // \` bigint(20) DEFAULT NULL COMMENT '类型ID',
        title: 'varchar', // \` varchar(1024) DEFAULT NULL COMMENT '标题',
        content: 'text', // \` text COMMENT '内容',
        select_line: 'varchar', // \` varchar(2048) DEFAULT NULL COMMENT '转向链接',
        enable: 'varchar', // \` tinyint(4) DEFAULT NULL COMMENT '是否启用（1启用，0未启用）',
        status: 'varchar', // \` tinyint(4) DEFAULT NULL COMMENT '状态（1正常，0已删除）',
        create_at: 'date', // \` datetime DEFAULT NULL COMMENT '创建时间',
        update_at: 'date', // \` datetime DEFAULT NULL COMMENT '最后一次更新时间',
        info: 'varchar', // \` varchar(256) DEFAULT NULL COMMENT '备注信息',
        order_by: 'varchar', // \` int(11) DEFAULT NULL,
        video_src: 'varchar', // \` varchar(2048) DEFAULT NULL,
        img_src: 'varchar', // \` varchar(2048) DEFAULT NULL,
        name: 'varchar', // \` varchar(255) DEFAULT NULL COMMENT '作者',
    },
    create_dbs_sql: `
        CREATE TABLE IF NOT EXISTS new_release_content (
        \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
        \`custom_id\` bigint(20) DEFAULT NULL COMMENT '编号',
        \`type\` bigint(20) DEFAULT NULL COMMENT '类型ID',
        \`title\` varchar(1024) DEFAULT NULL COMMENT '标题',
        \`content\` text COMMENT '内容',
        \`select_line\` varchar(2048) DEFAULT NULL COMMENT '转向链接',
        \`enable\` tinyint(4) DEFAULT NULL COMMENT '是否启用（1启用，0未启用）',
        \`status\` tinyint(4) DEFAULT NULL COMMENT '状态（1正常，0已删除）',
        \`create_at\` datetime DEFAULT NULL COMMENT '创建时间',
        \`update_at\` datetime DEFAULT NULL COMMENT '最后一次更新时间',
        \`info\` varchar(256) DEFAULT NULL COMMENT '备注信息',
        \`order_by\` int(11) DEFAULT NULL,
        \`video_src\` varchar(2048) DEFAULT NULL,
        \`img_src\` varchar(2048) DEFAULT NULL,
        \`name\` varchar(255) DEFAULT NULL COMMENT '作者',
        PRIMARY KEY (\`id\`),
        KEY \`idx_custom_id\` (\`custom_id\`),
        KEY \`idx_type\` (\`type\`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
    
    
    `,
}

module.exports = require("./init").init(config, __filename)