"use strict";

const config = require("config");
const logger = require("winston");

function padLeft(value) {
    if (value < 10) {
        return "0" + value;
    }

    return value;
}

let loggingOptions = {
    level: config.logger.log_level,
    timestamp: function() {
        let date = new Date();
        let YMD = [
            date.getFullYear(),
            padLeft(date.getMonth() + 1),
            padLeft(date.getDate())
        ].join("-");
        let HMS = [
            padLeft(date.getHours()),
            padLeft(date.getMinutes()),
            padLeft(date.getSeconds())
        ].join(":");

        return "[" + YMD + " " + HMS + "]";
    },
    formatter: function(options) {
        return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? " " + JSON.stringify(options.meta) : '' );
    },
    filename: "server_error.log" // needed only for file logging
};

let fileOptions = JSON.parse(JSON.stringify(loggingOptions));
// fileOptions.level = "error";

logger.configure({
    transports: [
        new (logger.transports.File)(fileOptions),
        new (logger.transports.Console)(loggingOptions)
    ]
});

module.exports = logger;