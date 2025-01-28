import Fastify from "fastify";

const app = Fastify();

app.get("/", async (request, reply) => {
  reply.send({ hello: "world" });
  return { hello: "world" };
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const start = async () => {
  try {
    await app.listen({ port: PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
