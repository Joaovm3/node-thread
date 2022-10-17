// UV_THREADPOOL_SIZE = 100 node thread.mjs
import { execSync } from 'node:child_process';
import { Worker } from 'node:worker_threads';

const getCurrentThreadCount = () => { 
  // count of threads in the current process
  return parseInt(execSync(`ps -M ${process.pid} | wc -l`).toString());
}

const createThread = (data) => {
  const worker = new Worker('./thread.mjs');
  const p = new Promise((resolve, reject) => {
    worker.once('message', (msg) => {
      return resolve(msg);
    });
    worker.once('error', reject);
  })
  worker.postMessage(data);
  return p;
}

const nodeJSDefaultThreadNumber = getCurrentThreadCount() - 1;

console.log(
  `Im running`,
  process.pid,
  `Default threads: ${nodeJSDefaultThreadNumber}`
)

let nodejsThreadCount = 0;
const intervalId = setInterval(() => {
  //console.log(`running at every sec: ${new Date().toISOString()}`);
  const currentThreads = getCurrentThreadCount() - nodeJSDefaultThreadNumber;
  if (currentThreads == nodejsThreadCount) return;

  nodejsThreadCount = currentThreads;
  console.log('threads', nodejsThreadCount);
})

// for (let i = 0; i < 1e20; i++);

await Promise.all([
  createThread({ from: 0, to: 1e9 }),
  createThread({ from: 0, to: 1e9 }),
  createThread({ from: 0, to: 1e8 }),
  createThread({ from: 0, to: 1e10 }),
  createThread({ from: 0, to: 1e3 }),
]).then((res) => { console.log(res) });

clearInterval(intervalId);