/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
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

            args = args.slice(1)
            args.push(next)
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

global.ms = {log, async, }