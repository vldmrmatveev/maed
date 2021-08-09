const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all",
		},
	};
	if (isProd) {
		config.minimizer = [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			}),
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [
						"default",
						{
							discardComments: { removeAll: true },
						},
					],
				},
			}),
		];
	}
	return config;
};

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: {
		main: "@/js/index.js",
		libs: "@babel/polyfill",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "[path][name][ext]",
	},
	resolve: {
		extensions: [".js", ".json", ".scss"],
		alias: {
			"@models": path.resolve(__dirname, "src/models"),
			"@": path.resolve(__dirname, "src"),
		},
	},
	optimization: optimization(),
	devtool: isDev ? "source-map" : false,
	devServer: {
		port: 4000,
		hot: true,
	},
	plugins: [
		new LiveReloadPlugin({
			appendScriptTag: true,
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./index.pug",
			filename: "index.html",
			inject: true,
			minify: false,
		}),
		new HtmlWebpackPlugin({
			template: "./nima.pug",
			filename: "nima.html",
			inject: true,
			minify: false,
		}),
		new HtmlWebpackPlugin({
			template: "./main.pug",
			filename: "main.html",
			inject: true,
			minify: false,
		}),
		new HtmlWebpackPlugin({
			template: "./360.pug",
			filename: "360.html",
			inject: true,
			minify: false,
		}),
		new HtmlWebpackPugPlugin(),
		new ESLintPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/favicon.ico"),
					to: path.resolve(__dirname, "dist"),
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				// use: isProd ? "pug-loader" : "pug-loader?pretty=true",
				use: "pug-loader?pretty=true",
			},
			{
				test: /\.scss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"autoprefixer",
										{
											// Options
										},
									],
								],
							},
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/i,
				type: "asset/resource",
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
};
