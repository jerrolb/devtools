import { exec } from 'child_process';

function executeWithCb(command, callback){
  exec(command, function(error, stdout, stderr) {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`exec error: ${stderr}`);
      return;
    }

    if (typeof callback === 'function') {
      callback(stdout);
    } else {
      console.log(`stdout: ${stdout}`);
    }
  });
}

export { executeWithCb };
