import { Worker } from "bullmq";

new Worker(
  "myQueue",
  async (job) => {
    console.log("[WORKER-1] something happend on the worker1, job:", job.name);

    console.log("[WORKER-1] job data", job.data);
  },
  {
    connection: {
      host: "redis",
      port: 6379,
    },
  }
);

new Worker(
  "myQueue",
  async (job) => {
    console.log("[WORKER-2] something happend on the worker1, job:", job.name);

    console.log("[WORKER-2] job data", job.data);
  },
  {
    connection: {
      host: "redis",
      port: 6379,
    },
  }
);
