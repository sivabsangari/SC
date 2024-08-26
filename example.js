

// Output the directory and file name of the script
console.log('Directory name:', __dirname);
console.log('File name:', __filename);

// Access command-line arguments
const args = process.argv.slice(2);
console.log('Command-line arguments:', args);

// Output environment variables (example: PATH)
console.log('PATH environment variable:', process.env.PATH);

// Write output to the console
process.stdout.write('Hello, Node.js!\n');

// Exit the process with a success code
process.exit(0);
