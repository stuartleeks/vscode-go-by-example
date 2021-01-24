// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// // Use the console to output diagnostic information (console.log) and errors (console.error)
	// // This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "vscode-go-by-example" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('vscode-go-by-example.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from vscode-go-by-example!');
	// });

	// context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-go-by-example.helloWorld', async () => {

			const mediaDir = vscode.Uri.file(
				path.join(context.extensionPath, 'media')
			);
			const paths = fs.readdirSync(mediaDir.fsPath);
			const items = paths.filter(p => p.indexOf('.') < 0);

			const item = await vscode.window.showQuickPick(items);
			if (item === undefined) {
				return;
			}

			// Create and show panel
			const panel = vscode.window.createWebviewPanel(
				'gobyexample',
				'Go By Example: ' + item,
				vscode.ViewColumn.One,
				{
					// Only allow the webview to access resources in our extension's media directory
					// localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
					localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
				}
			);

			const htmlPath = vscode.Uri.file(path.join(context.extensionPath, 'media', item));

			const cssPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'site.css');
			const clipboardPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'clipboard.png');
			const playPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'play.png');
			const jsPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'site.js');

			const cssUri = panel.webview.asWebviewUri(cssPath);
			const clipboardUri = panel.webview.asWebviewUri(clipboardPath);
			const playUri = panel.webview.asWebviewUri(playPath);
			const jsUri = panel.webview.asWebviewUri(jsPath);

			const content = fs.readFileSync(htmlPath.fsPath, 'utf8')
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
