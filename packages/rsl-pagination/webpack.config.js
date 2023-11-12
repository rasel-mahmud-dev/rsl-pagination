const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: "production",
  entry: './src/index.tsx', // Adjust the entry point based on your file structure
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2', // Set the library target to UMD
    clean: true,
  },
  externals: {
    react: 'react', // Specify the external React library
  },
  module: {
    rules: [
      // {
      //   test: /\.(ts|tsx|js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-react'],
      //     },
      //   },},
      {
        test: /\.(js|tsx|ts|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
     },
     {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      use: {
        loader: 'url-loader',
      },
},
     {
      test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
      use: {
        loader: 'url-loader',
      },
},
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'style.css',
    chunkFilename: '[id].css',
  })],
};
