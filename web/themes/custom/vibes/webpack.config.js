const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {
    const devMode = argv.mode === 'development';

    return {
        watch: devMode,
        entry: ['./src/js/app.js', './src/scss/app.scss'],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].min.js',
        },

        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].min.css',
                chunkFilename: '[id].min.css',
            }),
        ],
        module: {
            rules: [
                // JavaScript
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                // Images
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                // Fonts and SVGs
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline',
                },
                // CSS, PostCSS, and Sass
                // {
                //     test: /\.(scss|css)$/,
                //     use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                // },
                {
                    test: /\.css$/,
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
                },
                {
                    test: /\.(sc|sa)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',

                    ],
                },
            ],
        },
    };
}