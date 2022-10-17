import { threadId, parentPort } from 'node:worker_threads';

parentPort.once('message', ({ from, to }) => {
  console.time(`benchmark-${threadId}`);
  let count = 0;

  for (let i = from; i < to; i++) {
    count++
  }
  
  console.timeEnd(`benchmark-${threadId}`);
  parentPort.postMessage(`I'm thread ${threadId} done with ${count} items`);
});