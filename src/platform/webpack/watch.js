const compiler = require('./util/compiler');
const errUtil = require('./util/error');

compiler.watch(
    {
        aggregateTimeout: 300,
        ignored: /node_modules/u,
        poll: undefined,
    },
    (err, stats) => {
        errUtil(err, stats);
        console.log(stats.toString({ chunks: false, colors: true }));
    },
);
