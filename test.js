import cp from 'child_process'

const compiler = cp.spawn('g++', ['helloworld.cpp', '-o', 'helloworld']);

compiler.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
  compiler.kill();
});

compiler.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
  compiler.kill();

const compiler = cp.spawn('g++', ['helloworld.cpp', '-o', 'helloworld']);

compiler.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
  compiler.kill();
});

compiler.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
  compiler.kill();
});

compiler.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
  compiler.kill();
});


  let compiler1 = cp.spawn(`D:/helloworld.exe`);

  compiler1.stdout.on('data', (data) => {
    console.log('data=',data);
    console.log(data.toString('utf8'))/*这里将BUFER转换为字符串输出*/ 
    compiler1.kill();
  });

  compiler1.stderr.on('data', (data) => {
    console.error('data=',data);
    compiler1.kill();
  });

  compiler1.on('close', (code) => {
    console.log(`child process1 exited with code ${code}`);
    compiler1.kill();
  });


});

compiler.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
  compiler.kill();
});


  let compiler1 = cp.spawn(`D:/helloworld.exe`);

  compiler1.stdout.on('data', (data) => {
    console.log('data=',data);
    console.log(data.toString('utf8'))/*这里将BUFER转换为字符串输出*/ 
    compiler1.kill();
  });

  compiler1.stderr.on('data', (data) => {
    console.error('data=',data);
    compiler1.kill();
  });

  compiler1.on('close', (code) => {
    console.log(`child process1 exited with code ${code}`);
    compiler1.kill();
  });

