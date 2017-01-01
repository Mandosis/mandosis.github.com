const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const path = require('path');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

let commonConfig = {
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loaders: ['babel-loader?presets[]=es2015', 'ts-loader'], exclude: /node_modules/ },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.json$/, loader: 'raw-loader' },
            { test: /\.scss$/, exclude: /node_modules/, loaders: ['file-loader?name=main.bundle.css', 'extract-loader', 'css-loader?minimize', 'sass-loader'] },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [],
}

let defaultConfig = {
    context: __dirname,
    output: {
        publicPath: path.resolve(__dirname),
        filename: 'index.js'
    }
};

let finalConfig = {
    target: 'web',
    devtool: 'source-map',
    entry: {
        main: root('src/app/main'),
        // polyfills: root('src/app/polyfills')
    },
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map',
        path: root('dist')
    },
    plugins: [

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['polyfills'].reverse()
        // }),

        new UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false
            },
            comments: false,
            sourceMap: true
        }),

        new TypedocWebpackPlugin({
            module: 'commonjs',
            target: 'es6',
            includeDeclarations: true,
            ignoreCompilerErrors: true,

            // Output Options
            out: root('docs'),

            // TypeDoc Options
            name: 'Chris Rabuse Portfolio',
            version: true,
            // excludeExternals: true
        })
    ],
    node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false
    }
};

module.exports = [
    webpackMerge({}, defaultConfig, commonConfig, finalConfig)
]

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}