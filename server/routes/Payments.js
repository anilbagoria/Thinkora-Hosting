// Import the required modules
const express = require("express")
const router = express.Router()

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  getRazorpayKey, // ✅ ADD THIS
} = require("../controllers/Payments")

const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

// ✅ ADD THIS ROUTE (VERY IMPORTANT)
router.get("/getkey", auth, getRazorpayKey)

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
)

module.exports = router
