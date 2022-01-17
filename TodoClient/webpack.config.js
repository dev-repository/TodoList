// webpack을 사용하기 위해 사용정의하는 파일
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode : "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-transform-runtime"],
              },
            },
          },
        ],
      },
      //개발 서버 (더 추가할수있다.)
      devServer: {
        port: 3000,
      },
      //webpack을 사용하다보면 여러가지 플로그인을 읽을수있다/
      plugins: [
        new HtmlWebpackPlugin({
          // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
          template: "index.html",
        }),
      ],
    
    
}