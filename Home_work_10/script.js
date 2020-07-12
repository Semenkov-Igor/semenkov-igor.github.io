function createCalculator(count) {  
    return {        
        sum: function (argument) {
            return count += argument;
        },
        sub: function (argument) {
            return count -= argument;
        },
        mult: function (argument) {
            return count *= argument;
        },
        div: function (argument) {
            return count /= argument;
        },
        set: function (argument) {
            return count = argument;
        },
    };
}
