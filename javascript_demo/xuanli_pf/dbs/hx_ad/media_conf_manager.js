var config = {
    line: {
        "id"         : "id",
        "media_id"   : "varchar",
        "media_name" : "varchar",
        "created_at" : "date",
        "info"       : "varchar",
        "status"     : "varchar",
        "agent_name" : "varchar",
        "ad_type"    : "varchar",
        "ad_position": "varchar",
        "channel"    : "varchar",
    },
}


module.exports = require('./init').init(config, __filename)