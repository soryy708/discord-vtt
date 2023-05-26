const compiler = require('./util/compiler');
const errUtil = require('./util/error');

compiler.run((err, stats) => {
    errUtil(err, stats);
    console.log(stats.toString({ chunks: false, colors: true }));
});
