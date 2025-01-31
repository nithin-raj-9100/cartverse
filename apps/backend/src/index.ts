import { createApp } from "./app";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const start = async () => {
  try {
    const app = await createApp();
    await app.listen({ port: PORT });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
