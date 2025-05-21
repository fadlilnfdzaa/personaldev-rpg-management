// build.js
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Node version:', process.version);
console.log('Current directory:', __dirname);

// Run vite build
const vitePath = path.join(__dirname, 'node_modules', '.bin', 'vite');
console.log('Vite path:', vitePath);

const buildProcess = spawn('node', [vitePath, 'build'], {
  stdio: 'inherit',
  shell: true
});

buildProcess.on('close', (code) => {
  console.log(`Vite build process exited with code ${code}`);
  process.exit(code);
});
