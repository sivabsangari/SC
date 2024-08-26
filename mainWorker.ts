import { Worker } from 'worker_threads';

function runWorkerTask(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./fibonacciWorker.js'); // Create a worker thread

    // Send data to the worker thread
    worker.postMessage(workerData);

    // Listen for messages from the worker thread
    worker.on('message', resolve);

    // Handle errors
    worker.on('error', reject);

    // Handle worker exit
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

async function main() {
  try {
    const result = await runWorkerTask(40); // Run the worker task
    console.log(`Fibonacci result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
