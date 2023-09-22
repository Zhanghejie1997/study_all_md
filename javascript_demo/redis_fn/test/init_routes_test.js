/*
 * Copyright (c) 2023.
 */
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
var fns = require('../init_routes')

function test() {
    fns.init_post({body: {id: 4}, account: '333'}, {send: (a,b,c,d) => console.log('send',a,b,c,d)},run_data)
    fns.init_post({body: {id: 4,err:'err'}, account: '333'}, {send: (a,b,c,d) => console.log('send',a,b,c,d)},run_data)
}
function run_data(req, res, callback){
    console.log('run_data',req, res)
    callback(req.body.err, req.body.id)
}

test()