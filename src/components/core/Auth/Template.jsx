import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center px-4 py-8 sm:px-6">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-full max-w-maxContent flex-col justify-between gap-y-10 py-6 lg:flex-row lg:gap-x-12">
          <div className="mx-auto w-full max-w-[520px] lg:mx-0">
            <h1 className="text-3xl font-semibold leading-tight text-richblack-5 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-richblack-100 sm:text-lg">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-full max-w-[520px] lg:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
              className="w-full rounded-3xl object-cover"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-0 z-10 w-full max-w-[520px] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
