// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs'

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
		vscode.commands.registerCommand('vscode-go-by-example.helloWorld', () => {
			// Create and show panel
			const panel = vscode.window.createWebviewPanel(
				'gobyexample',
				'Go By Example: test',
				vscode.ViewColumn.One,
				{
					// Only allow the webview to access resources in our extension's media directory
					localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
				}
			);

			// Get path to resource on disk
			const onDiskPath = vscode.Uri.file(
				path.join(context.extensionPath, 'media', 'test.html')
			);

			// // And get the special URI to use with the webview
			// const src = panel.webview.asWebviewUri(onDiskPath);

			// panel.webview.
			panel.webview.html = fs.readFileSync(onDiskPath.fsPath, 'utf8');
		})
	);
}


// this method is called when your extension is deactivated
export function deactivate() { }
