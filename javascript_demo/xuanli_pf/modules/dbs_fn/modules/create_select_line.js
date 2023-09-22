var config = {
    "date": (line) => `date_format(\`${line}\`,"%Y-%m-%d %H:%i:%S") as \`${line}\``,
    "datetime": (line) => `date_format(\`${line}\`,"%Y-%m-%d %H:%i:%S") as \`${line}\``,
    "date-day": (line) => `date_format(\`${line}\`,"%Y-%m-%d") as \`${line}\``,
    'default': (line) => `\`${line}\``
}

var return_str = (type, line) => type && (config[type] || config['default'])(line)

module.exports = function(select_fileds, config_line) {
    return select_fileds.map(key => return_str(config_line[key], key)).filter(i => i).join(",")
}