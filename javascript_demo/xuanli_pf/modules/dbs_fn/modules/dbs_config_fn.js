exports.get_table_and_name = function(filename) {
    if (!filename) {
        return {}
    }
    var arr = filename.split("/")
    var dbs_name = arr[arr.length - 2]
    var table_name = arr[arr.length - 1].split(".")[0]
    return { dbs_name, table_name }
}