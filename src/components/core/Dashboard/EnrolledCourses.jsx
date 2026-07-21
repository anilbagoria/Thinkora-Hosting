import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    if (!token) return

    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses
        console.log("EnrolledCourses: API returned", res)

        // Ensure we have an array
        const safeRes = Array.isArray(res) ? res : []

        // Filtering the published course out
        const filterPublishCourse = safeRes.filter((ele) => ele.status !== "Draft")

        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.", error)
        setEnrolledCourses([])
      }
    })()
  }, [token])

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5 space-y-4">
          {/* Headings */}
          <div className="hidden rounded-t-lg bg-richblack-500 lg:flex">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => {
            const id = course?._id ?? i
            const description = course?.courseDescription ?? ""
            const shortDesc =
              description.length > 50 ? `${description.slice(0, 50)}...` : description
            const sectionId = course?.courseContent?.[0]?._id ?? ""
            const subSectionId =
              course?.courseContent?.[0]?.subSection?.[0]?._id ?? ""

            return (
              <div
                className={`min-w-0 flex flex-col gap-4 border border-richblack-700 ${
                  i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                } lg:flex-row lg:items-center`}
                key={id}
              >
                <div
                  className="flex w-full cursor-pointer items-center gap-4 px-5 py-3 lg:w-[45%]"
                  onClick={() => {
                    if (sectionId && subSectionId) {
                      navigate(
                        `/view-course/${course?._id}/section/${sectionId}/sub-section/${subSectionId}`
                      )
                    }
                  }}
                >
                  <img
                    src={course?.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex max-w-full flex-col gap-2">
                    <p className="font-semibold">{course?.courseName}</p>
                    <p className="text-xs text-richblack-300">{shortDesc}</p>
                  </div>
                </div>
                <div className="min-w-0 grid w-full gap-2 px-5 py-3 lg:w-1/4">
                  <p className="text-sm font-semibold text-richblack-300 lg:hidden">
                    Duration
                  </p>
                  <p>{course?.totalDuration ?? "Not available"}</p>
                </div>
                <div className="min-w-0 grid w-full gap-2 px-5 py-3 lg:w-1/5">
                  <p className="text-sm font-semibold text-richblack-300 lg:hidden">
                    Progress
                  </p>
                  <p>Progress: {course?.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course?.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
