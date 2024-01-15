const webpack = require("webpack");
const config = require("./aggressive-merging/webpack.config");

const compiler = webpack(config);

compiler.run((err, stats) => {
	// console.log(stats);
});

