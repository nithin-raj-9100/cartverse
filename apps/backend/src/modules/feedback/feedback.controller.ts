import { FastifyRequest, FastifyReply } from "fastify";
import { sendFeedbackEmail } from "./feedback.service";
import { SendFeedbackInput } from "./feedback.schema";

export async function sendFeedbackHandler(
  request: FastifyRequest<{
    Body: SendFeedbackInput;
  }>,
  reply: FastifyReply
) {
  const { senderEmail, feedback } = request.body;

  try {
    const result = await sendFeedbackEmail({ senderEmail, feedback });
    return reply.code(200).send({ success: true, data: result });
  } catch (error: unknown) {
    console.error(error, "Error sending feedback");

    let message =
      "An error occurred while sending feedback. Please try again later.";
    if (error instanceof Error) {
      message = error.message;
    }
    if (message === "Feedback service is not configured.") {
      return reply.code(503).send({
        success: false,
        message: "Feedback service is temporarily unavailable.",
      });
    }

    return reply.code(500).send({
      success: false,
      message,
    });
  }
}
