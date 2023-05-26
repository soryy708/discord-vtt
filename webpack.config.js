const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
    module: {
        rules: [
            {
                test: /\.[tj]s?$/u,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'ts-loader',
                        options: { transpileOnly: true },
                    },
                ],
            },
        ],
    },
    resolve: {
        symlinks: false,
        extensions: ['.ts', '.js'],
    },
    watchOptions: {
        ignored: ['node_modules'],
    },
    target: 'node',
    entry: [path.join(__dirname, 'src', 'server', 'index.ts')],
    externals: [nodeExternals()],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

if (process.env.BUILD_ENV === 'production') {
    module.exports = {
        ...config,
        mode: 'production',
    };
} else {
    module.exports = {
        ...config,
        mode: 'development',
        devtool: 'source-map',
    };
}
