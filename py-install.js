const util = require('util');
const {exec:execOG, execFile: execFileOG} = require('child_process');

const exec = util.promisify(execOG);
const execFile = util.promisify(execFileOG);
async function runFile(command, args, options = {}) {
  try {
    const { stdout } = await execFile(command, args, options);
    return stdout;
  } catch (error) {
    throw error;
  }
}

async function runCommands() {
  try {
    // Command to create a Python virtual environment
    await exec('python -m venv ./venv');

    // Command to install Python packages from requirements.txt
    await runFile('venv/Scripts/pip3.exe', ['install', '-r', 'server/requirements.txt']);

    console.log('Python packages installed successfully.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

runCommands();