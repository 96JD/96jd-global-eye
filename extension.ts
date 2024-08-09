const _ = require("lodash");
const axios = require("axios");
const https = require("https");
const vscode = require("vscode");

async function activate(context) {
	https.globalAgent.options.rejectUnauthorized = false;
	const res = await axios.get(
		"https://jacob-dolorzo-global-eye-server.onrender.com/api/v1/news/fetch-all-news(sources=bbc-news)"
	);
	const articles = _.map(res.data.articles, (article) => {
		return {
			label: article.title,
			detail: article.description,
			link: article.url
		};
	});

	const disposable = vscode.commands.registerCommand("96jd-global-eye.searchNA", async function () {
		const article = await vscode.window.showQuickPick(articles, {
			matchOnDetail: true
		});

		if (article == null) return;

		vscode.env.openExternal(article.link);
	});

	context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {
	return;
}

module.exports = {
	activate,
	deactivate
};
