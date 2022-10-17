First of all, **ensure the system OS is run with Linux** or any other distro and after that, run the command line below:

```
node index.mjs
```

## Is node single thread?

I thought Node.js and JavaScript was a single threaded language. Node.js is not good for CPU intensive tasks but is lightweight because of its single threaded nature. Multithreading is good for CPU intensive tasks because you can delegate tasks to different threads, but it creates opening for race conditions which can get complicated.

Then comes worker threads, telling me node can now spawn threads named "worker threads" to pass off CPU intensive tasks so it doesn't block the JavaScript stack. Why do people call JavaScript single threaded like a permanent definition, if with the power of worker threads it actually can be multithreaded? Or is JavaScript indeed permanently single threaded, but with the power of worker threads, a process is able to have multiple threads of JavaScript, which still behave single thread?

Node.js uses two kinds of threads: a main thread handled by event loop and several auxiliary threads in the worker pool.