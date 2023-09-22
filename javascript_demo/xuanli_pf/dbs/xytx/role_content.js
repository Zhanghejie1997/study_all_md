var config = {
    line: {
        id: 'id', // \` bigint(20) NOT NULL AUTO_INCREMENT,
        custom_id: 'varchar', // \` bigint(20) DEFAULT NULL COMMENT '编号',
        enable: 'varchar', // \` tinyint(4) DEFAULT NULL COMMENT '是否启用（1启用，0未启用）',
        status: 'varchar', // \` tinyint(4) DEFAULT NULL COMMENT '状态（1正常，0已删除）',
        create_at: 'date', // \` datetime DEFAULT NULL COMMENT '创建时间',
        update_at: 'date', // \` datetime DEFAULT NULL COMMENT '最后一次更新时间',
        info: 'varchar', // \` varchar(256) DEFAULT NULL COMMENT '备注信息',
        order_by: 'varchar', // \` int(11) DEFAULT NULL,
        pc_picture_img: 'varchar',
        pc_i_img_src: 'varchar',
        pc_img_src: 'varchar',
        pc_role_text_img_src: 'varchar',
        pc_slogan_img_src: 'varchar',
        h5_img_src: 'varchar',
        h5_role_text_img_src: 'varchar',
        h5_slogan_img_src: 'varchar',
    },
    create_dbs_sql: `
        CREATE TABLE IF NOT EXISTS role_content (
        \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
        \`custom_id\` bigint(20) DEFAULT NULL COMMENT '编号',
        \`enable\` tinyint(4) DEFAULT NULL COMMENT '是否启用（1启用，0未启用）',
        \`status\` tinyint(4) DEFAULT NULL COMMENT '状态（1正常，0已删除）',
        \`create_at\` datetime DEFAULT NULL COMMENT '创建时间',
        \`update_at\` datetime DEFAULT NULL COMMENT '最后一次更新时间',
        \`info\` varchar(256) DEFAULT NULL COMMENT '备注信息',
        \`order_by\` int(11) DEFAULT NULL,
        \`pc_picture_img\` varchar(2048) DEFAULT NULL COMMENT 'pc-头像',
        \`pc_i_img_src\` varchar(2048) DEFAULT NULL COMMENT 'pc-小人图标',
        \`pc_img_src\` varchar(2048) DEFAULT NULL COMMENT 'pc-立绘',
        \`pc_role_text_img_src\` varchar(2048) DEFAULT NULL COMMENT 'pc-角色简介',
        \`pc_slogan_img_src\` varchar(2048) DEFAULT NULL COMMENT 'pc-slogan',
        \`h5_img_src\` varchar(2048) DEFAULT NULL COMMENT 'h5-立绘',
        \`h5_role_text_img_src\` varchar(2048) DEFAULT NULL COMMENT 'h5-角色简介',
        \`h5_slogan_img_src\` varchar(2048) DEFAULT NULL COMMENT 'h5-slogan',
        PRIMARY KEY (\`id\`),
        KEY \`idx_custom_id\` (\`custom_id\`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
    
    
    `,
}

module.exports = require("./init").init(config, __filename)