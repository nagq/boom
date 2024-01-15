var path = require("path");
var { AggressiveMergingPlugin } = require("webpack").optimize;

module.exports = {
	// mode: "development" || "production",
	entry: {
		pageA: path.join(__dirname, "./pageA"),
		pageB: path.join(__dirname, "./pageB"),
		pageC: path.join(__dirname, "./pageC"),
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].bundle.js",
		chunkFilename: "[id].chunk.js"
	},
	plugins: [
		new AggressiveMergingPlugin({
			minSizeReduce: 1.5
		})
	],
	optimization: {
		chunkIds: "deterministic"
	},
	infrastructureLogging: {
		debug: true,
		level: 'debug',
	}
};
