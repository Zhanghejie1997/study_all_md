/*
 * Copyright (c) 2023.
 */

//----------------------------------------------------------------------------------------

var log = {
    info : console.info,
    error: console.error,
    log  : console.log,
}

//----------------------------------------------------------------------------------------
var async = {
    waterfall: (tasks, callback) => {
        var task_index = 0;
        function next() {
            var args = [].slice.call(arguments)
            if (task_index == tasks.length || args[0]) {
                return callback.apply(this, args)
            }

            args = args.slice(1), args.push(next)
            try {
                tasks[task_index++].apply(this, args)
            } catch (err) {
                return callback(err)
            }
        }

        next()
    }
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------

global.ms = {log, async,}