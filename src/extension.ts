'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

import * as azdata from 'azdata';
import * as xlsx from 'xlsx';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('excel-import-extension.importExcel', async () => {
        // Get the Excel file path
        const fileUri = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            filters: { 'Excel Files': ['xlsx', 'xls'] }
        });

        if (fileUri && fileUri[0]) {
            const filePath = fileUri[0].fsPath;
            
            // Read the Excel file
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);

            // Get the connection
            const connection = await azdata.connection.getCurrentConnection();
            if (connection) {
                // Create table and insert data
                await createTableAndInsertData(connection, jsonData);
                vscode.window.showInformationMessage('Excel data imported successfully!');
            } else {
                vscode.window.showErrorMessage('No active SQL connection.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

async function createTableAndInsertData(connection: azdata.connection.ConnectionProfile, data: any[]) {
    if (data.length === 0) return;

    const tableName = await vscode.window.showInputBox({ prompt: 'Enter table name' });
    if (!tableName) return;

    // Generate create table SQL
    const columns = Object.keys(data[0]);
    const createTableSql = `CREATE TABLE ${tableName} (${columns.map(col => `[${col}] NVARCHAR(MAX)`).join(', ')})`;

    // Generate insert SQL
    const insertSql = `INSERT INTO ${tableName} (${columns.map(col => `[${col}]`).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;

    // Execute SQL
    // const pool = await azdata.connection.getConnection(connection.id);
    // const pool = await azdata.connection.getCurrentConnection();//(connection.id);
    // await pool.connect();
    // await pool.query(createTableSql);
    
    // for (const row of data) {
    //     await pool.query(insertSql, columns.map(col => row[col]));
    // }

    // Execute SQL
    const connectionUri = await azdata.connection.getUriForConnection(connection.connectionId);
    const queryProvider = azdata.dataprotocol.getProvider<azdata.QueryProvider>(connection.providerId, azdata.DataProviderType.QueryProvider);
    await queryProvider.runQueryAndReturn(connectionUri, createTableSql);
    
    for (const row of data) {
        await queryProvider.runQueryAndReturn(connectionUri, insertSql);
    }
}

export function deactivate() {}
