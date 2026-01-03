import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // 1️⃣ Generate RAW token (sent in email)
    const rawToken = crypto.randomBytes(32).toString("hex");

    // 2️⃣ Hash token (stored in DB)
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7270feb6100f3b",
        pass: "d2f4952ed02cf7",
      },
    });

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${rawToken}`
        : `${process.env.DOMAIN}/resetpassword?token=${rawToken}`;

    const mailResponse = await transport.sendMail({
      from: "saksham@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify Your Email"
          : "Reset Your Password",
      html: `
        <p>
          Click 
          <a href="${link}">here</a>
          to ${
            emailType === "VERIFY"
              ? "verify your email"
              : "reset your password"
          }.
          <br/>
          Or paste this link in your browser:
          <br/>
          ${link}
        </p>
      `,
    });

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
