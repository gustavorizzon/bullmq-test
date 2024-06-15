import { Queue } from "bullmq";
import Fastify from "fastify";

const myQueue = new Queue("myQueue", {
  connection: {
    host: "redis",
    port: 6379,
  },
});

const fastify = Fastify({
  logger: true,
});

fastify.get("/:something", async function handler(request, reply) {
  console.log(
    "[API] received request with:",
    request.params.something,
    "|",
    "forwarding to queue..."
  );

  await myQueue.add("someJob", { receivedOnUrl: request.params.something });

  return reply.send("enqueued");
});

try {
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
