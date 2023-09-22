var config = {
    line: {
        id: 'id',
        app_name: 'varchar',
        app_id: 'varchar',
        app_secret: 'varchar',
        create_time: 'date',
        end_time: 'date',
        expire: 'varchar',
        token: 'varchar',
    },
    create_dbs_sql: `
    CREATE TABLE IF NOT EXISTS \`feishu_token\` (
        \`id\` int(11) NOT NULL AUTO_INCREMENT,
        \`app_name\` varchar(255) DEFAULT NULL COMMENT '自定义名称',
        \`app_id\` varchar(511) DEFAULT NULL COMMENT '飞书的app的id',
        \`app_secret\` varchar(511) DEFAULT NULL COMMENT 'app的校验码',
        \`create_time\` datetime DEFAULT NULL COMMENT '请求时间',
        \`end_time\` datetime DEFAULT NULL COMMENT '有效结束时间',
        \`expire\` varchar(255) DEFAULT NULL COMMENT '有效时间单位秒',
        \`token\` varchar(255) DEFAULT NULL COMMENT 'token 临时身份，后续别的请求使用',
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `
}


module.exports = require('./init').init(config, __filename)