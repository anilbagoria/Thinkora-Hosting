import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
   

  const navigate = useNavigate()

  const dob = user?.additionalDetails?.dateOfBirth
    ? formattedDate(user.additionalDetails.dateOfBirth)
    : "Add Date Of Birth"
  const about = user?.additionalDetails?.about ?? "Write Something About Yourself"
  const gender = user?.additionalDetails?.gender ?? "Add Gender"
  const contactNumber =
    user?.additionalDetails?.contactNumber ?? "Add Contact Number"

  if (!user) {
    return (
      <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 text-richblack-200">
        <p className="text-lg font-semibold">Profile data is still loading.</p>
        <p className="mt-2 text-sm text-richblack-400">
          If this message stays forever, please refresh the page or log out and log back in.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl w-full font-semibold text-richblack-5">My Profile</h1>
          <p className="mt-2 text-sm text-richblack-400">
            Manage your account information and profile details.
          </p>
        </div>
        <IconBtn
          text="Edit Profile"
          onclick={() => navigate("/dashboard/settings")}
          customClasses="w-full md:w-auto"
        >
          <RiEditBoxLine />
        </IconBtn>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[1.25rem] border border-richblack-700 bg-richblack-800 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={user.image}
                alt={`profile-${user.firstName}`}
                className="h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full object-cover"
              />
              <div>
                <p className="text-xl font-semibold text-richblack-5">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-richblack-400">{user.email}</p>
              </div>
            </div>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-richblack-700 bg-richblack-900 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-richblack-500">
                Account
              </p>
              <p className="mt-2 text-sm text-richblack-200">{user.accountType}</p>
            </div>
            <div className="rounded-xl border border-richblack-700 bg-richblack-900 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-richblack-500">
                Member since
              </p>
              <p className="mt-2 text-sm text-richblack-200">
                {dob !== "Add Date Of Birth" ? dob : "Not set"}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.25rem] border border-richblack-700 bg-richblack-800 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-richblack-5">About</p>
              <p className="mt-2 text-sm text-richblack-400">{about}</p>
            </div>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[1.25rem] border border-richblack-700 bg-richblack-800 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>

          <div className="mt-8 grid gap-6">
            <div className="grid gap-2">
              <p className="text-sm text-richblack-400">First Name</p>
              <p className="text-base font-medium text-richblack-5">{user.firstName}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-richblack-400">Last Name</p>
              <p className="text-base font-medium text-richblack-5">{user.lastName}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-richblack-400">Email</p>
              <p className="text-base font-medium text-richblack-5">{user.email}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-richblack-400">Phone Number</p>
              <p className="text-base font-medium text-richblack-5">{contactNumber}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-richblack-400">Gender</p>
              <p className="text-base font-medium text-richblack-5">{gender}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm text-richblack-400">Date of Birth</p>
              <p className="text-base font-medium text-richblack-5">{dob}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}
