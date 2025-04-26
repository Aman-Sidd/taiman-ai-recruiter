import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, subject, message, jobPosition, interviewLink } = await req.json();

    if (!email || !subject || !message || !jobPosition || !interviewLink) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service (e.g., Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Professional Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: `
Dear Candidate,

We are pleased to invite you to an interview for the position of "${jobPosition}" at our company. Below are the details of the interview:

Position: ${jobPosition}

Please use the following link to join the interview:
${interviewLink}

If you have any questions or need further assistance, feel free to reach out to us.

We look forward to speaking with you and wish you the best of luck!

Best regards,
Taiman
AI Recruiter
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: "Email sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}