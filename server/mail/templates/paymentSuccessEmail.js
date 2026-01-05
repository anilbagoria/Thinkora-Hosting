exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Payment Confirmation</title>
  <style>
    body {
      background-color: #ffffff;
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.4;
      color: #333333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }

    .logo {
      max-width: 200px;
      margin-bottom: 20px;
    }

    .message {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .email-body {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .support {
      font-size: 14px;
      color: #999999;
      margin-top: 20px;
    }

    .highlight {
      font-weight: bold;
    }
  </style>
</head>

<body>
  <div class="container">
    <a href="https://studynotion-edtech-project.vercel.app">
      <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Thinkora Logo">
    </a>

    <div class="message">Course Payment Confirmation</div>

    <div class="email-body">
      <p>Dear ${name},</p>
      <p>We have successfully received your payment of 
        <span class="highlight">₹${amount}</span>.
      </p>
      <p><b>Payment ID:</b> ${paymentId}</p>
      <p><b>Order ID:</b> ${orderId}</p>
    </div>

    <div class="support">
      If you have any questions, contact us at 
      <a href="mailto:info@anilbagoria79@gmail.com">
        info@anilbagoria79@gmail.com
      </a>
    </div>
  </div>
</body>
</html>`;
};
