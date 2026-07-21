const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email from Thinkora",
			emailTemplate(otp)
		);
		console.log("✅ Email sent successfully:", mailResponse.response);
		return { success: true, response: mailResponse };
	} catch (error) {
		console.error("❌ Error occurred while sending email:", error.message);
		// Don't throw - let the post-save hook handle it gracefully
		return { success: false, error: error.message };
	}
}

// ✅ FIXED: Changed to post-save hook to avoid blocking the save operation
// Email is sent AFTER the document is saved to database (non-blocking)
OTPSchema.post("save", async function (doc) {
	console.log("📧 New OTP document saved to database, attempting to send email...");

	// Send email asynchronously without blocking
	try {
		// Improved timeout for email sending in production environments
		const emailPromise = sendVerificationEmail(doc.email, doc.otp);
		const timeoutPromise = new Promise((_, reject) =>
			setTimeout(() => reject(new Error("Email sending timeout")), 30000)
		);

		const result = await Promise.race([emailPromise, timeoutPromise]);

		if (!result.success) {
			console.error(
				"⚠️ Email failed to send (non-blocking):",
				result.error
			);
			// Send alert to monitoring system if needed
		}
	} catch (error) {
		// Log error but don't fail the save operation
		console.error("❌ Error in OTP post-save hook (non-blocking):", error.message);
		// The OTP document is already saved, so sign-up can still proceed
		// User will be prompted to request another OTP if they don't receive the email
	}
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
