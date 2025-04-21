import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const sendFeedbackSchema = z.object({
  senderEmail: z.string().email("Invalid email format"),
  feedback: z.string().min(5, "Feedback must be at least 5 characters long"),
});

export type SendFeedbackInput = z.infer<typeof sendFeedbackSchema>;

export const { schemas: feedbackSchemas, $ref } = buildJsonSchemas(
  {
    sendFeedbackSchema,
  },
  { $id: "FeedbackSchema" }
);
