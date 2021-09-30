// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-go-by-example.openExample', async () => {

			const utf8Decorder = new TextDecoder("utf-8");
			const indexBytes = await vscode.workspace.fs.readFile(
				vscode.Uri.joinPath(context.extensionUri, 'media', 'index.html')
			);
			const indexContent = utf8Decorder.decode(indexBytes);
			const itemRegex = new RegExp('<li><a href="([^"]*)">([^<]*)<', "g");

			const matches = indexContent.matchAll(itemRegex);
			let items = [];
			for (const match of matches) {
				items.push({
					label: match[2],
					filename: match[1]
				});
			}

			const item = await vscode.window.showQuickPick(items);
			if (item === undefined) {
				return;
			}

			// Create and show panel
			const panel = vscode.window.createWebviewPanel(
				'gobyexample',
				'Go By Example: ' + item.label,
				vscode.ViewColumn.One,
				{
					// Only allow the webview to access resources in our extension's media directory
					localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
				}
			);

			const htmlPath = vscode.Uri.joinPath(context.extensionUri, 'media', item.filename);


			const cssPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'site.css');
			const clipboardPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'clipboard.png');
			const playPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'play.png');
			const jsPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'site.js');

			const cssUri = panel.webview.asWebviewUri(cssPath);
			const clipboardUri = panel.webview.asWebviewUri(clipboardPath);
			const playUri = panel.webview.asWebviewUri(playPath);
			const jsUri = panel.webview.asWebviewUri(jsPath);

			const bytes = await vscode.workspace.fs.readFile(htmlPath);
			const content = utf8Decorder.decode(bytes)
				// fix-up local content
				.replace('"site.js`"', jsUri.toString())
				.replace('href="site.css"', 'href="' + cssUri.toString() + '"')
				.replace('src="site.js"', 'src="' + jsUri.toString() + '"')
				.replace('src="clipboard.png"', 'src="' + clipboardUri.toString() + '"')
				.replace('src="play.png"', 'src="' + playUri.toString() + '"')

				// fix-up header link to go to https://gobyexample.com
				.replace('href="./"', 'href="https://gobyexample.com"')
				;

			panel.webview.html = content;
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
