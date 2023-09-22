var config = {
    line          : {
        id            : 'id',
        pay_id        : 'varchar',
        pay_name      : 'varchar',
        created_at    : 'date',
        info          : 'varchar',
        status        : 'varchar',
        is_used       : 'varchar',
        is_allnet     : 'varchar',
        sp_type       : 'varchar',
        priority      : 'varchar',
        present       : 'varchar',
        day_quota     : 'varchar',
        month_quota   : 'varchar',
        enable_version: 'varchar',
        pay_mode      : 'varchar',
    },
    create_dbs_sql: `
    create table if not exists \`pay_business_manager\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`pay_id\` int(11) NOT NULL,
      \`pay_name\` varchar(128) NOT NULL,
      \`created_at\` datetime NOT NULL,
      \`info\` varchar(512) NOT NULL,
      \`status\` int(11) NOT NULL,
      \`is_used\` tinyint(4) DEFAULT NULL,
      \`is_allnet\` tinyint(4) NOT NULL,
      \`sp_type\` tinyint(4) DEFAULT NULL,
      \`priority\` tinyint(4) DEFAULT NULL,
      \`present\` int(11) DEFAULT NULL,
      \`day_quota\` int(11) DEFAULT NULL,
      \`month_quota\` int(11) DEFAULT NULL,
      \`enable_version\` tinyint(4) DEFAULT NULL,
      \`pay_mode\` tinyint(4) NOT NULL DEFAULT '0' COMMENT '联运模式 0联运 1非联运',
      PRIMARY KEY (\`id\`),
      KEY \`idx_pay_id\` (\`pay_id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

}

module.exports = require("./init").init(config, __filename)