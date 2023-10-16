var config = {
    line          : {
        "id"              : "id",
        "create_date"     : "date",
        "content_id"      : "varchar",
        "adgroup_id"      : "varchar",
        "campaign_id"     : "varchar",
        "oaid"            : "varchar",
        "tracking_enabled": "varchar",
        "ip"              : "varchar",
        "user_agent"      : "varchar",
        "event_type"      : "varchar",
        "trace_time"      : "varchar",
        "callback"        : "varchar",
        "corp_id"         : "varchar",
        "app_id"          : "varchar",
        "campaign_name"   : "varchar",
        "adgroup_name"    : "varchar",
        "content_name"    : "varchar",
        "deep_link"       : "varchar",
        "os_version"      : "varchar",
        "emui_version"    : "varchar",
        "transunique_id"  : "varchar",
        "id_type"         : "varchar",
        "device_id"       : "varchar",
        "publisher_type"  : "varchar",
        "publisher_app_id": "varchar",
        "log_id"          : "varchar",
    },
    create_dbs_sql: `
        CREATE TABLE IF NOT EXISTS \`huawei_push_click_data\` (
          \`id\` int(11) NOT NULL AUTO_INCREMENT,
          \`create_date\` datetime DEFAULT NULL,
          \`content_id\` int(11) DEFAULT NULL,
          \`adgroup_id\` varchar(511) DEFAULT NULL,
          \`campaign_id\` varchar(511) DEFAULT NULL,
          \`oaid\` varchar(511) DEFAULT NULL,
          \`tracking_enabled\` varchar(511) DEFAULT NULL,
          \`ip\` varchar(511) DEFAULT NULL,
          \`user_agent\` varchar(511) DEFAULT NULL,
          \`event_type\` varchar(511) DEFAULT NULL,
          \`trace_time\` varchar(511) DEFAULT NULL,
          \`callback\` varchar(511) DEFAULT NULL,
          \`corp_id\` varchar(511) DEFAULT NULL,
          \`app_id\` varchar(511) DEFAULT NULL,
          \`campaign_name\` varchar(511) DEFAULT NULL,
          \`adgroup_name\` varchar(511) DEFAULT NULL,
          \`content_name\` varchar(511) DEFAULT NULL,
          \`deep_link\` varchar(511) DEFAULT NULL,
          \`os_version\` varchar(511) DEFAULT NULL,
          \`emui_version\` varchar(511) DEFAULT NULL,
          \`transunique_id\` varchar(511) DEFAULT NULL,
          \`id_type\` varchar(511) DEFAULT NULL,
          \`device_id\` varchar(511) DEFAULT NULL,
          \`publisher_type\` varchar(511) DEFAULT NULL,
          \`publisher_app_id\` varchar(511) DEFAULT NULL,
          \`log_id\` varchar(511) DEFAULT NULL,
          PRIMARY KEY (\`id\`),
          KEY \`idx_create_date\` (\`create_date\`),
          KEY \`idx_oaid\` (\`oaid\`),
          KEY \`idx_adgroup_id\` (\`adgroup_id\`),
          KEY \`idx_campaign_id\` (\`campaign_id\`)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
    `,
}create_dbs_sql: `
        CREATE TABLE IF NOT EXISTS \`huawei_push_click_data\` (
          \`id\` int(11) NOT NULL AUTO_INCREMENT,
          \`create_date\` datetime DEFAULT NULL,
          \`content_id\` int(11) DEFAULT NULL,
          \`adgroup_id\` varchar(511) DEFAULT NULL,
          \`campaign_id\` varchar(511) DEFAULT NULL,
          \`oaid\` varchar(511) DEFAULT NULL,
          \`tracking_enabled\` varchar(511) DEFAULT NULL,
          \`ip\` varchar(511) DEFAULT NULL,
          \`user_agent\` varchar(511) DEFAULT NULL,
          \`event_type\` varchar(511) DEFAULT NULL,
          \`trace_time\` varchar(511) DEFAULT NULL,
          \`callback\` varchar(511) DEFAULT NULL,
          \`corp_id\` varchar(511) DEFAULT NULL,
          \`app_id\` varchar(511) DEFAULT NULL,
          \`campaign_name\` varchar(511) DEFAULT NULL,
          \`adgroup_name\` varchar(511) DEFAULT NULL,
          \`content_name\` varchar(511) DEFAULT NULL,
          \`deep_link\` varchar(511) DEFAULT NULL,
          \`os_version\` varchar(511) DEFAULT NULL,
          \`emui_version\` varchar(511) DEFAULT NULL,
          \`transunique_id\` varchar(511) DEFAULT NULL,
          \`id_type\` varchar(511) DEFAULT NULL,
          \`device_id\` varchar(511) DEFAULT NULL,
          \`publisher_type\` varchar(511) DEFAULT NULL,
          \`publisher_app_id\` varchar(511) DEFAULT NULL,
          \`log_id\` varchar(511) DEFAULT NULL,
          PRIMARY KEY (\`id\`),
          KEY \`idx_create_date\` (\`create_date\`),
          KEY \`idx_oaid\` (\`oaid\`),
          KEY \`idx_adgroup_id\` (\`adgroup_id\`),
          KEY \`idx_campaign_id\` (\`campaign_id\`)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
    `,
}

module.exports = require('./init').init(config, __filename)