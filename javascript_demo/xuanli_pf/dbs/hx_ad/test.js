//test


function test(){
    var a = require('./huawei_push_click_data')
    console.log(a.select_sql({where_data:{publisher_type:"33"}}))
    console.log('d')
    console.log(a.insert_sql({set_data:{publisher_type:"33"}}))
    console.log('d')
    console.log(a.inserts_sql({set_data:[{publisher_type:"33"},{publisher_type:"33"}]}))

}

test()