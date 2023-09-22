var config = {
    line: {
        id: 'id',
        app_name: 'varchar',
        app_id: 'varchar',
        type: 'varchar',
        task_id: 'varchar',
        message_id: 'varchar',
        post_data: 'varchar',
        uid: 'varchar',
        err_msg: 'varchar',
        status: 'varchar',
        back_data: 'varchar',
        create_time: 'date',
    },
    create_dbs_sql: `
    CREATE TABLE IF NOT EXISTS \`feishu_send\` (
        \`id\` int(11) NOT NULL AUTO_INCREMENT,
        \`app_name\` varchar(255) DEFAULT NULL,
        \`app_id\` varchar(255) DEFAULT NULL,
        \`type\` varchar(255) DEFAULT NULL COMMENT '请求类型',
        \`task_id\` varchar(255) DEFAULT NULL,
        \`message_id\` varchar(255) DEFAULT NULL,
        \`post_data\` text,
        \`uid\` varchar(255) DEFAULT NULL,
        \`err_msg\` text DEFAULT NULL COMMENT '错误',
        \`status\` varchar(255) DEFAULT NULL,
        \`back_data\` text,
        \`create_time\` datetime DEFAULT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `
}


module.exports = require('./init').init(config, __filename)