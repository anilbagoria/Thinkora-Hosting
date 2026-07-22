# 🎓 Thinkora – Full Stack MERN E-Learning Platform

> A modern and scalable **Full Stack E-Learning Platform** built using the **MERN Stack**. Thinkora enables students to enroll in courses, learn through structured content, and allows instructors to create and manage courses with secure authentication, online payments, and email notifications.

---

## 🚀 Live Demo

* 🌐 **Website:** https://thinkora-frontend.vercel.app
* 🔗 **Backend API:** [https://api.your-domain.com](https://thinkora-backend-en7h.onrender.com/api/v1)

> **Deployment**
>
> * Frontend: **Vercel**
> * Backend: **Render**
> * Database: **MongoDB Atlas**
> * Custom Domain: **Name.com**
> * Email Service: **Brevo SMTP**

---

# ✨ Features

### 👨‍🎓 Student Features

* User Registration & Login
* Email OTP Verification
* Secure JWT Authentication
* Browse Available Courses
* Purchase Courses
* Enroll Instantly After Successful Payment
* Watch Video Lectures
* Track Course Progress
* Edit Profile
* Change Password
* Forgot Password

---

### 👨‍🏫 Instructor Features

* Instructor Dashboard
* Create New Courses
* Update Course Information
* Upload Course Thumbnail
* Add Sections & Lectures
* Publish / Unpublish Courses
* View Course Statistics

---

### 🔐 Authentication & Security

* JWT Authentication
* Role-Based Authorization
* Password Hashing (bcrypt)
* Protected Routes
* Email OTP Verification
* Secure Password Reset

---

### 💳 Payment

* Razorpay Payment Gateway
* Secure Payment Verification
* Automatic Course Enrollment

---

### 📧 Email Services

* OTP Verification
* Password Reset
* Welcome Emails
* Notification Emails

Powered by **Brevo SMTP**.

---

# 🛠 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Redux Toolkit
* React Router DOM
* Axios
* React Hook Form
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Nodemailer
* Cloudinary
* Razorpay SDK

## Database

* MongoDB Atlas

## Deployment & Services

* Vercel
* Render
* Name.com
* Brevo SMTP
* Cloudinary

---

# 📁 Project Structure

```text
Thinkora
│
├── client
│   ├── public
│   ├── src
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/anilbagoria/Thinkora-Hosting.git
cd Thinkora-Hosting
```

### 2. Install Dependencies

**Frontend**

```bash
cd client
npm install
```

**Backend**

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

### Backend (.env)

```env
PORT=

MONGODB_URL=

JWT_SECRET=

JWT_EXPIRES_IN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RAZORPAY_KEY=
RAZORPAY_SECRET=

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=

FRONTEND_URL=
```

### Frontend (.env)

```env
VITE_BASE_URL=
VITE_RAZORPAY_KEY=
```

---

# ▶️ Running the Project

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

# 🌟 Key Highlights

* Full Stack MERN Architecture
* Responsive UI with Tailwind CSS
* RESTful APIs
* Secure JWT Authentication
* OTP-Based Email Verification
* Razorpay Payment Integration
* Cloudinary Media Management
* MongoDB Atlas Database
* Custom Domain Configuration using Name.com
* Email Delivery with Brevo SMTP
* Fully Deployed Production Application

---

# 📌 Future Improvements

* AI-Based Course Recommendations
* Live Classes
* Course Reviews & Ratings
* Certificates
* Wishlist
* Discussion Forum
* Admin Dashboard
* Multi-language Support

---

# 👨‍💻 Author

**Anil Bagoria**

* GitHub:[ https://github.com/anilbagoria](https://github.com/anilbagoria)
* LinkedIn: www.linkedin.com/in/anil-bagoria-088790294

---

# ⭐ Support

If you found this project helpful, please consider giving it a **Star** on GitHub.

---

# 📄 License

This project is licensed under the **MIT License**.
