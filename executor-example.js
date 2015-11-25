// var FixedSizeExecutor = require('./executor');
var FixedSizeExecutor = require('fixed-size-executor');

// Create an executor, specify the maximum concurrency
executor = new FixedSizeExecutor(2);

// A simple "job" function which takes a little time to run
var t0 = new Date().getTime() - 10000;
var slowGreeter = function (nextJob, arg1, arg2) {
    console.log("", new Date().getTime()-t0, "Hello", arg1, "...");
    setTimeout(function () {
        console.log("", new Date().getTime()-t0, "... Hello", arg1, arg2);
        nextJob();
    }, 2000 * Math.random());
};

// Submit jobs to the executor (function to call, plus 0..n args to pass)
// Here we happen to use the same function every time
executor.submit(slowGreeter, "One", "1");
executor.submit(slowGreeter, "Two", "2");
executor.submit(slowGreeter, "Three", "3");
executor.submit(slowGreeter, "Four", "4");

setTimeout(function () {
        executor.submit(slowGreeter, "Five", "5");
}, 5000);
