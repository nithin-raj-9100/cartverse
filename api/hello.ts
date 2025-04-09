import type { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    message: "Hello from CartVerse API!",
    timestamp: new Date().toISOString(),
  });
};
