var config = {
    line: {
        "id"              : "id",
        "chn"             : "varchar",
        "release_chn_name": "varchar",
        "sub_chn_id"      : "varchar",
        "sub_chn_name"    : "varchar",
        "first_level"     : "varchar",
        "second_level"    : "varchar",
        "pkg_id"          : "varchar",
        "pkg_name"        : "varchar",
        "info"            : "varchar",
        "link"            : "varchar",
        "status"          : "varchar",
        "agent_title"     : "varchar",
        "created_at"      : "date",
    },
}


module.exports = require('./init').init(config, __filename)