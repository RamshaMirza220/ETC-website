import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 320;
const MAX_PHONE_LENGTH = 40;
const MAX_MESSAGE_LENGTH = 5000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
}

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function removeControlCharacters(value: string): string {
  return value.replace(/[\r\n\t]/g, " ").replace(/\s+/g, " ").trim();
}

router.post("/contact", async (req, res) => {
  const body = (req.body ?? {}) as ContactPayload;
  const fullName = cleanText(body.fullName);
  const email = cleanText(body.email).toLowerCase();
  const phone = cleanText(body.phone);
  const message = cleanText(body.message);

  const fieldErrors: Record<string, string> = {};
  if (!fullName) fieldErrors.fullName = "Full name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!emailPattern.test(email)) fieldErrors.email = "A valid email is required.";
  if (!phone) fieldErrors.phone = "Phone number is required.";
  if (!message) fieldErrors.message = "Message is required.";

  if (fullName.length > MAX_NAME_LENGTH) fieldErrors.fullName = "Full name is too long.";
  if (email.length > MAX_EMAIL_LENGTH) fieldErrors.email = "Email is too long.";
  if (phone.length > MAX_PHONE_LENGTH) fieldErrors.phone = "Phone number is too long.";
  if (message.length > MAX_MESSAGE_LENGTH) fieldErrors.message = "Message is too long.";

  if (Object.keys(fieldErrors).length > 0) {
    res.status(400).json({
      error: "Please check the highlighted fields.",
      fields: fieldErrors,
    });
    return;
  }

  const apiKey = process.env["RESEND_API_KEY"]?.trim();
  const receiverEmail = process.env["CONTACT_RECEIVER_EMAIL"]?.trim();
  const fromEmail = process.env["CONTACT_FROM_EMAIL"]?.trim();

  if (!apiKey || !receiverEmail || !fromEmail) {
    logger.error("Contact email service is missing required environment variables");
    res.status(503).json({
      error: "The contact form is temporarily unavailable.",
    });
    return;
  }

  const safeName = removeControlCharacters(fullName);
  const subject = `New contact form message from ${safeName}`;
  const text = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [receiverEmail],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!resendResponse.ok) {
      const providerResponse = await resendResponse.text();
      logger.error(
        { status: resendResponse.status, providerResponse: providerResponse.slice(0, 500) },
        "Resend rejected contact email",
      );
      res.status(502).json({
        error: "The contact form is temporarily unavailable.",
      });
      return;
    }

    res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    logger.error({ err: error }, "Could not send contact email");
    res.status(502).json({
      error: "The contact form is temporarily unavailable.",
    });
  }
});

export default router;