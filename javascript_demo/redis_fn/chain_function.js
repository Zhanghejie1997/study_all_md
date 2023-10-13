//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------

function new_$(option) {
    option = option || {}
    var obj = {
        _el: option._el,
    }
    obj.__proto__ = new_$.__proto__
    return obj
}

new_$.__proto__.return_data = function (_el) {
    if (this._el) {
        return this
    }
    return new_$({_el})
}
new_$.__proto__.get_id = function (el) {
    console.log('get_id', this)
    return this.return_data(el)
}
new_$.__proto__.set_id = function set_id(el) {
    console.log('set_id', this)
    return this.return_data(el)
}
new_$.__proto__.next_id = function next_id(el) {
    console.log('next_id', this)
    return this.return_data(el)
}
var _$ = new_$()
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------


console.log('_$.get_id().next_id().set_id()', _$)
console.log('_$.get_id().next_id().set_id()', _$.get_id('d').next_id('e').set_id('f'))