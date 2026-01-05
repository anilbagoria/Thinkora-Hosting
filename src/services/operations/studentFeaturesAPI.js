import { toast } from "react-hot-toast"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
  GET_RAZORPAY_KEY_API, // ✅ ADD THIS
} = studentEndpoints

// Load Razorpay SDK
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// BUY COURSE
export async function BuyCourse(
  token,
  courses,
  user_details,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...")
  try {
    // 1️⃣ Load Razorpay script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if (!res) {
      toast.error("Razorpay SDK failed to load")
      return
    }

    // 2️⃣ GET RAZORPAY KEY FROM BACKEND ✅
    const keyResponse = await apiConnector(
      "GET",
      GET_RAZORPAY_KEY_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    const razorpayKey = keyResponse.data.key

    // 3️⃣ CREATE ORDER
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }

    const options = {
      key: razorpayKey, // ✅ FIXED
      currency: orderResponse.data.data.currency,
      amount: orderResponse.data.data.amount,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description: "Thank you for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        )
        verifyPayment({ ...response, courses }, token, navigate, dispatch)
      },
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

    paymentObject.on("payment.failed", () => {
      toast.error("Payment Failed")
    })
  } catch (error) {
    console.log("PAYMENT ERROR => ", error)
    toast.error("Could Not Make Payment")
  }
  toast.dismiss(toastId)
}

// VERIFY PAYMENT
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...")
  dispatch(setPaymentLoading(true))
  try {
    const response = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful")
    navigate("/dashboard/enrolled-courses")
    dispatch(resetCart())
  } catch (error) {
    toast.error("Could Not Verify Payment")
  }
  toast.dismiss(toastId)
  dispatch(setPaymentLoading(false))
}

// SEND SUCCESS EMAIL
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
  } catch (error) {
    console.log("EMAIL ERROR => ", error)
  }
}
