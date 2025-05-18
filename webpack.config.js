/**
 * Webpack main configuration file
 */
const path = require('path'); 
const webpack = require('webpack');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const environment = {
  paths: {
    /* Path to source files directory */
    source: path.resolve(__dirname, './src/'),

    /* Path to built files directory */
    output: path.resolve(__dirname, './dist/'),
  },
  server: {
    host: 'localhost',
    port: 8000,
  },
  limits: {
    /* Image files size in bytes. Below this value the image file will be served as DataURL (inline base64). */
    images: 8192,

    /* Font files size in bytes. Below this value the font file will be served as DataURL (inline base64). */
    fonts: 8192,
  },
};
  
module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'index.js'),
  },
  output: {
    filename: '[name].js',
    path: environment.paths.output,
  },
  devServer: {
    static: './dist',
  },
  stats: {
    warnings:false
  },
  mode: 'production', 
  devtool: false,
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'assets/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'assets/[name].[hash:6][ext]',
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  /* Performance treshold configuration values */
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(environment.paths.source, 'index.html'),
      filename: 'index.html',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  ],
  resolve: {
    extensions: [ '.ts', '.js' ],
    fallback: {
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer")
    }
  },
  target: 'web',
};
