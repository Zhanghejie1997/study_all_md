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
    waterfall: (tasks, cb) => {
        var index = 0, fn = function() {
            if (arguments[0] || ++index >= tasks.length) {
                return cb.apply(null, arguments)
            }
            var args = Array.prototype.slice.call(arguments, 1)
            args.push(fn)
            tasks[index].apply(null, args)
        }

        tasks[index] ? tasks[index](fn) : cb()
    }
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------

global.ms = {log, async,}