# Excel Import Extension for Azure Data Studio

## Overview

This Azure Data Studio extension allows users to easily import Excel files directly into SQL Server tables. It provides a simple, user-friendly interface for selecting an Excel file, specifying a table name, and automatically creating the table and importing the data.

## Features

- Import Excel (.xlsx, .xls) files into SQL Server
- Automatic table creation based on Excel structure
- Simple command palette interface
- Works with current SQL Server connection in Azure Data Studio

## Installation

1. Download the latest `.vsix` file from the releases page.
2. Open Azure Data Studio.
3. Go to the Extensions view (Ctrl+Shift+X).
4. Click on the "..." at the top of the Extensions view.
5. Choose "Install from VSIX...".
6. Select the downloaded `.vsix` file.

## Usage

1. Connect to your SQL Server instance in Azure Data Studio.
2. Open the Command Palette (Ctrl+Shift+P).
3. Type "Import Excel to SQL Server" and select the command.
4. Choose your Excel file when prompted.
5. Enter a name for the new table.
6. Wait for the import process to complete.

## Development Setup

To set up the development environment:

1. Install Node.js and npm.
2. Install Visual Studio Code.
3. Install the Azure Data Studio Extension Generator:
   ```
   npm install -g yo generator-azuredatastudio
   ```
4. Clone this repository:
   ```
   git clone https://github.com/BadMonkeySoftware/excel-import-extension.git
   cd excel-import-extension
   ```
5. Install dependencies:
   ```
   npm install
   ```
6. Open the project in Visual Studio Code:
   ```
   code .
   ```

## Building the Extension

To build the extension:

1. Compile the TypeScript code:
   ```
   npm run compile
   ```
2. Package the extension:
   ```
   npm install -g vsce
   vsce package
   ```

This will generate a `.vsix` file that can be installed in Azure Data Studio.

## Contributing

Contributions to this project are welcome! Here are some ways you can contribute:

1. Report bugs and suggest features by opening issues.
2. Submit pull requests with bug fixes or new features.
3. Improve documentation.
4. Share your experience and suggestions for improvement.

When contributing code, please:

- Follow the existing code style and conventions.
- Write clear commit messages.
- Add or update tests as necessary.
- Update documentation to reflect your changes.

## Improvement Ideas

Here's a list of potential improvements for future development:

1. **Enhanced Excel Parsing:**
   - Add support for multiple sheets in a single Excel file.
   - Implement column data type detection for more appropriate SQL table schemas.
   - Allow users to select specific ranges or columns to import.

2. **Improved User Interface:**
   - Create a custom UI for mapping Excel columns to SQL table columns.
   - Add a progress bar for large imports.
   - Implement a preview feature to show sample data before import.

3. **Advanced SQL Features:**
   - Allow users to specify SQL data types for each column.
   - Support for updating existing tables instead of only creating new ones.
   - Add options for handling duplicate data (ignore, update, or fail).

4. **Performance Optimizations:**
   - Implement batch inserts for faster data import.
   - Add support for bulk insert operations.

5. **Error Handling and Logging:**
   - Improve error messages and implement comprehensive error logging.
   - Add a rollback feature for failed imports.

6. **Configuration Options:**
   - Allow users to set default behaviors through a configuration file.
   - Implement connection string management for non-standard connections.

7. **Security Enhancements:**
   - Implement data sanitization to prevent SQL injection.
   - Add support for encrypted Excel files.

8. **Extended Database Support:**
   - Add support for other database systems beyond SQL Server.

9. **Integration and Automation:**
   - Implement a scheduling feature for regular imports.
   - Add support for importing multiple files in batch.

10. **Testing and Quality Assurance:**
    - Increase unit test coverage.
    - Implement integration tests with various Excel file formats and SQL Server versions.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Thanks to the creators and maintainers of the `xlsx` library.
- Special thanks to the Azure Data Studio team for their extension development framework.

## Contact

For any questions or suggestions, please open an issue in the GitHub repository or contact the maintainer at [jeremy.adams@badmonkeysoftware.com].
