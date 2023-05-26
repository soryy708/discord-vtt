module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: 'commonjs',
            },
        ],
    ],
    plugins: ['@babel/transform-runtime'],
    ignore: ['node_modules'],
};
