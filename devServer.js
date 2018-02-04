const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require("./webpack.config.js");

config.entry.app.unshift("webpack/hot/dev-server");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:4040/");

config.plugins = config.plugins ? config.plugins : [];
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    contentBase: 'src/client/public/dist'
});

server.listen(4040);
