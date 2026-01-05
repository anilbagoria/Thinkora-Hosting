import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"

// Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import "../../App.css"

// Icons
import { FaStar } from "react-icons/fa"

// Swiper modules
import { Autoplay, FreeMode } from "swiper/modules"

// API
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data.data)
        }
      } catch (error) {
        console.log("Review API error:", error)
      }
    })()
  }, [])

  return (
    <div className="w-full py-16 text-white">
      <div className="mx-auto max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[FreeMode, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="flex h-full flex-col gap-4 rounded-xl bg-richblack-800 p-5 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
                
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      review?.user?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="user"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-richblack-5">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-xs text-richblack-400">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm leading-relaxed text-richblack-200">
                  {review?.review?.split(" ").length > truncateWords
                    ? review.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ") + "..."
                    : review.review}
                </p>

                {/* Rating */}
                <div className="mt-auto flex items-center gap-2">
                  <span className="text-sm font-semibold text-yellow-100">
                    {review?.rating?.toFixed(1)}
                  </span>
                  <ReactStars
                    count={5}
                    value={review?.rating}
                    size={18}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
