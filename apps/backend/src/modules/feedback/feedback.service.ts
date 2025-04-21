import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "feedback@cartverse.live";
const YOUR_EMAIL = process.env.YOUR_EMAIL;

if (!RESEND_API_KEY) {
  console.warn(
    "RESEND_API_KEY environment variable not set. Feedback functionality will be disabled."
  );
}
if (!FROM_EMAIL) {
  console.warn(
    "RESEND_FROM_EMAIL environment variable not set. Using default."
  );
}
if (!YOUR_EMAIL) {
  console.warn("YOUR_EMAIL environment variable not set. Using default.");
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function sendFeedbackEmail({
  senderEmail,
  feedback,
}: {
  senderEmail: string;
  feedback: string;
}) {
  if (!resend) {
    console.error("Resend API key is missing. Cannot send feedback email.");
    throw new Error("Feedback service is not configured.");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Cartverse Feedback <${FROM_EMAIL}>`,
      to: [YOUR_EMAIL],
      subject: "New Project Feedback Received!",
      replyTo: senderEmail,
      html: `
        <h1>New Feedback Received</h1>
        <p><strong>From:</strong> ${senderEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${feedback.replace(/\n/g, "<br>")}</p> 
      `,
    });

    if (error) {
      console.error({ error }, "Resend API error sending feedback email");
      throw new Error(`Failed to send feedback: ${error.message}`);
    }

    console.log({ emailId: data?.id }, "Feedback email sent successfully");
    return { success: true, emailId: data?.id };
  } catch (err: any) {
    console.error(err, "Error in sendFeedbackEmail service");
    throw err;
  }
}
