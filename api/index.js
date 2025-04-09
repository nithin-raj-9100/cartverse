let app;

async function preloadESModules() {
  try {
    const encodingPromise = import("@oslojs/encoding");
    const cryptoPromise = import("@oslojs/crypto/sha2");

    const [encoding, crypto] = await Promise.all([
      encodingPromise,
      cryptoPromise,
    ]);

    console.log("Successfully preloaded ESM modules");
    console.log("Encoding module functions:", Object.keys(encoding));
    console.log("Crypto module functions:", Object.keys(crypto));

    return { encoding, crypto };
  } catch (error) {
    console.error("Error preloading ESM modules:", error);
    return null;
  }
}

module.exports = async (req, res) => {
  try {
    if (!app) {
      await preloadESModules();

      const appPath = "../apps/backend/dist/app.js";
      const appModule = await import(appPath);

      app = await appModule.createApp();
      await app.ready();
      console.log("Fastify app initialized for Vercel serverless function");
    }

    app.server.emit("request", req, res);
  } catch (error) {
    console.error("Vercel API error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
      })
    );
  }
};
