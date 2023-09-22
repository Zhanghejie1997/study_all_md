var config = {
    line: {
        id  :'id', 
        app_name  :'varchar', 
        app_id  :'varchar', 
        type  :'varchar', 
        callback_data  :'varchar', 
        uid  :'varchar', 
        create_time  :'date', 
        action  :'varchar', 
        task_id  :'varchar', 
    },
    create_dbs_sql: `
    CREATE TABLE IF NOT EXISTS \`feishu_callback\` (
        \`id\` int(11) NOT NULL AUTO_INCREMENT,
        \`app_name\` varchar(255) DEFAULT NULL,
        \`app_id\` varchar(255) DEFAULT NULL,
        \`type\` varchar(255) DEFAULT NULL COMMENT '返回类型',
        \`callback_data\` text,
        \`uid\` varchar(255) DEFAULT NULL,
        \`create_time\` datetime DEFAULT NULL,
        \`action\` text DEFAULT NULL COMMENT '点击数据',
        \`task_id\` varchar(255) DEFAULT NULL COMMENT '点击数据',
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
      `
}


module.exports = require('./init').init(config, __filename)