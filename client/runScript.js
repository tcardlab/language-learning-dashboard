// https://stackoverflow.com/a/57058495

const electron = require('electron');
const child_process = require('child_process');
const { dialog } = electron;

module.exports = {
   run_script(command, args) {
      var child = child_process.spawn(command, args, {
          encoding: 'utf8',
          shell: true
      });

      child.on('error', (error) => {
          dialog.showMessageBox({
              title: 'Title',
              type: 'warning',
              message: 'Error occured.\r\n' + error
          });
      });

      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (data) => {
          data=data.toString();   
          console.log('CHILD OUT:', data);      
      });

      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (data) => {
          console.log('CHILD ERR:', data);  
      });

      process.on('exit', () => {
        child.kill()
      });
  }
}