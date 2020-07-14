let baseValue = 0;

module.exports = {
    set: function (argument) {
        return baseValue = argument;
    },
    add: function (argument) {
        return baseValue += argument;
    },
    sub: function (argument) {
        return baseValue -= argument;
    },
    mult: function (argument) {
        return baseValue *= argument;
    },
    div: function (argument) {
        return baseValue /= argument;
    }
}