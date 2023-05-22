var exec = require('child_process').exec;
const path = require('path');

const runPythonScript = () => {
  const pythonFilePath = path.join(process.cwd(), 'AlgorithmScript/Markowitz.py');
  const command = `python ${pythonFilePath}`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error Python :${error}`);
        reject(error);
      } else {
        console.log(`Python result :${stdout}`);
        resolve(stdout);
      }
    });
  });
};

module.exports = runPythonScript;
